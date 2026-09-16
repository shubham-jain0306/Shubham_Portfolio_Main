const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const PDF_DOCS = [
  {
    key: 'deloitte',
    name: 'Deloitte Assignment 1.1',
    pdfPath: 'C:/Users/vinay/Downloads/portfolio/Deloitte Assignment 1.1.pdf',
    outputDir: path.resolve('public/assets/print-presentation/deloitte'),
  },
  {
    key: 'ey',
    name: 'EY Assessment File',
    pdfPath: 'C:/Users/vinay/Downloads/portfolio/EY Assessment File.pdf',
    outputDir: path.resolve('public/assets/print-presentation/ey'),
  },
  {
    key: 'brochure',
    name: 'Brochure',
    pdfPath: 'C:/Users/vinay/Downloads/portfolio/Brochure.pdf',
    outputDir: path.resolve('public/assets/print-presentation/brochure'),
  },
  {
    key: 'emailer',
    name: 'Shubham Jain Emailer',
    pdfPath: 'C:/Users/vinay/Downloads/portfolio/Shubham Jain Emailer.pdf',
    outputDir: path.resolve('public/assets/digital-communication/emailer-pdf'),
  }
];

async function extractPages() {
  console.log('Launching browser to render PDF pages via PDF.js...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        </script>
      </head>
      <body style="margin:0; background:transparent;">
        <canvas id="the-canvas" style="display:block;"></canvas>
      </body>
    </html>
  `);

  for (const docInfo of PDF_DOCS) {
    if (!fs.existsSync(docInfo.outputDir)) {
      fs.mkdirSync(docInfo.outputDir, { recursive: true });
    }

    console.log(`\nProcessing ${docInfo.name}...`);
    const fileBuffer = fs.readFileSync(docInfo.pdfPath);
    const base64Data = fileBuffer.toString('base64');

    const numPages = await page.evaluate(async (b64) => {
      const raw = atob(b64);
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
      window.currentDoc = await pdfjsLib.getDocument({ data: uint8 }).promise;
      return window.currentDoc.numPages;
    }, base64Data);

    console.log(`${docInfo.name} has ${numPages} pages.`);

    for (let p = 1; p <= numPages; p++) {
      // Render page on canvas at 2x scale for retina crispness
      const pageMeta = await page.evaluate(async (pageNum) => {
        const pObj = await window.currentDoc.getPage(pageNum);
        const scale = 2.0; // 2x scale for sharp text/graphics
        const viewport = pObj.getViewport({ scale });
        const canvas = document.getElementById('the-canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await pObj.render({
          canvasContext: context,
          viewport: viewport
        }).promise;

        return {
          width: viewport.width,
          height: viewport.height,
          originalWidth: viewport.width / scale,
          originalHeight: viewport.height / scale,
          aspectRatio: (viewport.width / viewport.height).toFixed(4)
        };
      }, p);

      const canvasHandle = await page.$('#the-canvas');
      const outFilePath = path.join(docInfo.outputDir, `page_${String(p).padStart(2, '0')}.png`);
      await canvasHandle.screenshot({ path: outFilePath });
      console.log(`Saved Page ${p}/${numPages}: ${outFilePath} (${pageMeta.width}x${pageMeta.height}, aspect: ${pageMeta.aspectRatio})`);
    }
  }

  await browser.close();
  console.log('\nAll PDF pages successfully extracted!');
}

extractPages().catch(err => {
  console.error('Error rendering PDFs:', err);
  process.exit(1);
});
