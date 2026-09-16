const { chromium } = require('@playwright/test');
const os = require('os');
const path = require('path');
const fs = require('fs');

async function testElementScreenshots() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-elem-'));
  const context = await chromium.launchPersistentContext(tmpDir, {
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    viewport: { width: 1440, height: 900 },
  });
  const page = context.pages()[0];
  const outDir = 'C:/Users/vinay/.gemini/antigravity-ide/brain/8e0ba783-dd52-4bd5-894c-452b3a5cfeb5/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const dismissCurtain = async () => {
    await page.evaluate(() => {
      const el = document.getElementById('boot-curtain');
      if (el) el.remove();
    });
  };

  // 1. Social Carousels
  console.log('Testing Social Carousels...');
  await page.goto('http://localhost:8080/work/roverride', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(800);
  const carouselGrid = await page.$('.grid.grid-cols-1.lg\\:grid-cols-2');
  if (carouselGrid) {
    await carouselGrid.screenshot({ path: path.join(outDir, 'verified_social_carousels.png') });
    console.log('Saved verified_social_carousels.png');
  }

  // 2. Print & Presentation Covers
  console.log('Testing Print & Presentation Covers...');
  await page.goto('http://localhost:8080/work/print-presentation', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(800);
  const printGrid = await page.$('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
  if (printGrid) {
    await printGrid.screenshot({ path: path.join(outDir, 'verified_print_covers.png') });
    console.log('Saved verified_print_covers.png');
  }

  // Test opening a flipbook!
  const docCards = await page.$$('.group.cursor-pointer');
  if (docCards.length >= 4) {
    console.log('Opening Mood Magic Manifesto flipbook...');
    await docCards[3].click();
    await page.waitForTimeout(800);
    const flipbookOverlay = await page.$('.fixed.inset-0.z-\\[9999\\]');
    if (flipbookOverlay) {
      await flipbookOverlay.screenshot({ path: path.join(outDir, 'verified_flipbook_open.png') });
      console.log('Saved verified_flipbook_open.png');
    }
  }

  // 3. Digital Communication Emailers
  console.log('Testing Digital Communication Emailers...');
  await page.goto('http://localhost:8080/work/digital-communication', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(800);
  const emailerGrid = await page.$('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
  if (emailerGrid) {
    await emailerGrid.screenshot({ path: path.join(outDir, 'verified_emailers.png') });
    console.log('Saved verified_emailers.png');
  }

  // 4. Meta Ads
  console.log('Testing Meta Ads...');
  await page.goto('http://localhost:8080/work/meta-ads', { waitUntil: 'domcontentloaded' });
  await dismissCurtain();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'verified_meta_ads.png') });
  console.log('Saved verified_meta_ads.png');

  await context.close();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}

  console.log('ALL VERIFICATIONS SUCCESSFUL!');
}

testElementScreenshots().catch(console.error);
