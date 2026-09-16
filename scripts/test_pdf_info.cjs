const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function testPdfRendering() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();

  // Load a simple HTML that includes pdfjs from unpkg or cdnjs
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        </script>
      </head>
      <body>
        <div id="output">Ready</div>
      </body>
    </html>
  `);

  const pdfFiles = [
    { name: 'Deloitte', path: 'C:/Users/vinay/Downloads/portfolio/Deloitte Assignment 1.1.pdf' },
    { name: 'EY', path: 'C:/Users/vinay/Downloads/portfolio/EY Assessment File.pdf' },
    { name: 'Brochure', path: 'C:/Users/vinay/Downloads/portfolio/Brochure.pdf' },
    { name: 'Emailer', path: 'C:/Users/vinay/Downloads/portfolio/Shubham Jain Emailer.pdf' },
  ];

  for (const item of pdfFiles) {
    const data = fs.readFileSync(item.path);
    const base64 = data.toString('base64');
    const result = await page.evaluate(async (b64) => {
      const raw = atob(b64);
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
      const doc = await pdfjsLib.getDocument({ data: uint8 }).promise;
      const pages = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const p = await doc.getPage(i);
        const vp = p.getViewport({ scale: 1.0 });
        pages.push({ pageNum: i, width: vp.width, height: vp.height, aspect: (vp.width / vp.height).toFixed(3) });
      }
      return { numPages: doc.numPages, pages };
    }, base64);

    console.log(`=== ${item.name} (${item.path}) ===`);
    console.log(`Pages: ${result.numPages}`);
    result.pages.forEach(p => console.log(`  Page ${p.pageNum}: ${p.width}x${p.height} (aspect: ${p.aspect})`));
  }

  await browser.close();
}

testPdfRendering().catch(err => console.error(err));
