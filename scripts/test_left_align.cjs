const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function testLeftAlign() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const outDir = path.resolve('C:/Users/vinay/.gemini/antigravity-ide/brain/8e0ba783-dd52-4bd5-894c-452b3a5cfeb5/screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await page.goto('http://localhost:8080/work/print-presentation', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.getElementById('boot-curtain')?.remove();
  });
  await page.waitForTimeout(600);

  const screenshotPath = path.join(outDir, 'print_presentation_left_aligned.png');
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Saved print presentation screenshot to:', screenshotPath);

  await browser.close();
}

testLeftAlign().catch(console.error);
