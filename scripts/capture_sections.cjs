const { chromium } = require('@playwright/test');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function captureSections() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-capture-'));
  const context = await chromium.launchPersistentContext(tmpDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    viewport: { width: 1440, height: 950 },
  });

  const page = context.pages()[0];
  const outDir = 'C:/Users/vinay/.gemini/antigravity-ide/brain/8e0ba783-dd52-4bd5-894c-452b3a5cfeb5/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const dismissCurtain = async () => {
    await page.evaluate(() => {
      const el = document.getElementById('boot-curtain');
      if (el) el.remove();
      sessionStorage.setItem('preloader-shown:v3:root', '1');
      sessionStorage.setItem('preloader-shown:v3:work', '1');
    });
  };

  // 1. Social Media — Carousels Section
  console.log('1. Capturing Social Media Carousels...');
  await page.goto('http://localhost:8080/work/roverride', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 1850));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '01_social_carousels.png') });
  console.log('Saved 01_social_carousels.png');

  // 2. Social Media — Curated Campaign Creatives
  console.log('2. Capturing Social Media Curated Creatives...');
  await page.evaluate(() => window.scrollBy(0, 750));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, '02_social_curated_posts.png') });
  console.log('Saved 02_social_curated_posts.png');

  // 3. Meta Ads — Standalone Project
  console.log('3. Capturing Meta Ads Project...');
  await page.goto('http://localhost:8080/work/meta-ads', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, '03_meta_ads_page.png') });
  console.log('Saved 03_meta_ads_page.png');

  // 4. Print & Presentation — Cover Only Document Grid
  console.log('4. Capturing Print & Presentation Covers...');
  await page.goto('http://localhost:8080/work/print-presentation', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '04_print_covers_grid.png') });
  console.log('Saved 04_print_covers_grid.png');

  // 5. Flipbook Interactive Modal
  console.log('5. Capturing Mood Magic Manifesto Flipbook...');
  const docCards = await page.$$('.group.cursor-pointer');
  if (docCards.length >= 4) {
    await docCards[3].click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '05_flipbook_modal.png') });
    console.log('Saved 05_flipbook_modal.png');
  }

  // 6. Digital Communication — 4 Unique Emailers Grid
  console.log('6. Capturing Digital Communication Emailers...');
  await page.goto('http://localhost:8080/work/digital-communication', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, '06_digital_emailers_grid.png') });
  console.log('Saved 06_digital_emailers_grid.png');

  // 7. Emailer Lightbox Modal
  console.log('7. Capturing Emailer Lightbox...');
  const emailerCards = await page.$$('.group.cursor-pointer');
  if (emailerCards.length > 0) {
    await emailerCards[0].click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, '07_emailer_lightbox.png') });
    console.log('Saved 07_emailer_lightbox.png');
  }

  await context.close();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('ALL SECTION SCREENSHOTS COMPLETE!');
}

captureSections().catch(console.error);
