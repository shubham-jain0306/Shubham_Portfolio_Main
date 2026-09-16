const { chromium } = require('@playwright/test');
const fs = require('fs');

async function checkPdfText() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
        <script>pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>
      </head>
      <body></body>
    </html>
  `);

  const pdfFiles = [
    { name: 'Deloitte', path: 'C:/Users/vinay/Downloads/portfolio/Deloitte Assignment 1.1.pdf' },
    { name: 'EY', path: 'C:/Users/vinay/Downloads/portfolio/EY Assessment File.pdf' },
    { name: 'Brochure', path: 'C:/Users/vinay/Downloads/portfolio/Brochure.pdf' },
    { name: 'Emailer', path: 'C:/Users/vinay/Downloads/portfolio/Shubham Jain Emailer.pdf' },
  ];

  for (const doc of pdfFiles) {
    const b64 = fs.readFileSync(doc.path).toString('base64');
    const texts = await page.evaluate(async (dataB64) => {
      const raw = atob(dataB64);
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
      const results = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const p = await pdf.getPage(i);
        const tc = await p.getTextContent();
        const str = tc.items.map(it => it.str).join(' ');
        results.push({ page: i, text: str.replace(/\s+/g, ' ').trim().substring(0, 300) });
      }
      return results;
    }, b64);
    console.log(`\n=== ${doc.name} ===`);
    texts.forEach(t => console.log(`  Page ${t.page}: ${t.text}`));
  }
  await browser.close();
}
checkPdfText().catch(console.error);
