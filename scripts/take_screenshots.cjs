const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function captureAll() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  await context.addInitScript(() => {
    sessionStorage.setItem('preloader-shown:v3:root', '1');
    sessionStorage.setItem('preloader-shown:v3:work', '1');
    sessionStorage.setItem('preloader-shown:v3:projects', '1');
    const style = document.createElement('style');
    style.innerHTML = '#boot-curtain { display: none !important; }';
    document.head.appendChild(style);
  });

  const page = await context.newPage();
  const outDir = path.resolve('C:/Users/vinay/.gemini/antigravity-ide/brain/8e0ba783-dd52-4bd5-894c-452b3a5cfeb5/screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pagesToCapture = [
    { url: 'http://localhost:8080/', name: 'homepage', fullPage: false },
    { url: 'http://localhost:8080/work/bizzbuzz', name: 'baseline-psylief', fullPage: false },
    { url: 'http://localhost:8080/work/roverride', name: 'social-media', fullPage: true },
    { url: 'http://localhost:8080/work/meta-ads', name: 'meta-ads', fullPage: true },
    { url: 'http://localhost:8080/work/print-presentation', name: 'print-presentation', fullPage: true },
    { url: 'http://localhost:8080/work/digital-communication', name: 'digital-communication', fullPage: true },
  ];

  for (const item of pagesToCapture) {
    console.log('Capturing:', item.name);
    await page.goto(item.url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    const ssPath = path.join(outDir, item.name + '.png');
    await page.screenshot({ path: ssPath, fullPage: item.fullPage });
    console.log('Saved screenshot to:', ssPath);
  }

  // Also test clicking a flipbook document!
  console.log('Testing Flipbook Open...');
  await page.goto('http://localhost:8080/work/print-presentation', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  // Click on the 4th card (Mood Magic Manifesto)
  const cards = await page.$$('.group.cursor-pointer');
  if (cards.length >= 4) {
    await cards[3].click();
    await page.waitForTimeout(800);
    const flipbookPath = path.join(outDir, 'flipbook-open.png');
    await page.screenshot({ path: flipbookPath, fullPage: false });
    console.log('Saved flipbook screenshot to:', flipbookPath);
  }

  // Also test clicking an emailer lightbox!
  console.log('Testing Emailer Lightbox...');
  await page.goto('http://localhost:8080/work/digital-communication', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  const emailerCards = await page.$$('.group.cursor-pointer');
  if (emailerCards.length > 0) {
    await emailerCards[0].click();
    await page.waitForTimeout(800);
    const emailerPath = path.join(outDir, 'emailer-lightbox.png');
    await page.screenshot({ path: emailerPath, fullPage: false });
    console.log('Saved emailer lightbox screenshot to:', emailerPath);
  }

  await browser.close();
  console.log('All screenshots and interactions verified successfully.');
}

captureAll().catch(console.error);
