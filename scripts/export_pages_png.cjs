const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const OUTPUT_DIR = path.resolve('D:/Shubham_Portfolio_Pages_PNG');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PAGES = [
  { name: '01_Home_Page.png', path: '/' },
  { name: '02_Projects_Index.png', path: '/projects' },
  { name: '03_Project_Psylief.png', path: '/work/bizzbuzz' },
  { name: '04_Project_Hackingly.png', path: '/work/aquaflow' },
  { name: '05_Project_UI_Design.png', path: '/work/snackify' },
  { name: '06_Project_Showtz_Label.png', path: '/work/zengo' },
  { name: '07_Project_Creative_Communication.png', path: '/work/roverride' },
  { name: '08_About_Shubham.png', path: '/about' },
  { name: '09_Blog_Notes_Index.png', path: '/blog' },
  { name: '10_Blog_Podcast_Setup.png', path: '/blog/podcast-setup-branding-your-voice' },
  { name: '11_Blog_Packaging_Sales_Pitch.png', path: '/blog/packaging-the-silent-sales-pitch' },
  { name: '12_Blog_Low_Poly_Design.png', path: '/blog/low-poly-efficient-design' },
  { name: '13_Blog_AI_Tools_Workflow.png', path: '/blog/integrating-ai-tools-into-your-design-workflow' },
  { name: '14_Blog_Print_Tangible_Finish.png', path: '/blog/print-mastering-the-tangible-finish' },
  { name: '15_Contact_Page.png', path: '/contact' },
  { name: '16_404_Not_Found.png', path: '/404' },
  { name: '17_Admin_Theme_Changer.png', path: '/admin/theme' },
];

async function captureAll() {
  console.log(`Starting export of ${PAGES.length} pages to PNG...`);
  console.log(`Destination: ${OUTPUT_DIR}\n`);

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  for (let i = 0; i < PAGES.length; i++) {
    const item = PAGES[i];
    const url = `http://localhost:8080${item.path}`;
    const targetFile = path.join(OUTPUT_DIR, item.name);

    console.log(`[${i + 1}/${PAGES.length}] Capturing: ${item.path} -> ${item.name}`);

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

      // Remove the boot-curtain preloader immediately so content is visible
      await page.evaluate(() => {
        const curtain = document.getElementById('boot-curtain');
        if (curtain) curtain.remove();
        if (window.__bootCurtainDone) window.__bootCurtainDone();
      });

      // Trigger lazy loads by smoothly scrolling down and back up
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 500;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 25);
        });
      });

      // Wait for images to load with fallback
      await page.evaluate(async () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        const pending = imgs
          .filter((img) => !img.complete)
          .map(
            (img) =>
              new Promise((res) => {
                img.onload = img.onerror = res;
                setTimeout(res, 2000);
              })
          );
        await Promise.all(pending);
      });

      // Settle layout
      await page.waitForTimeout(600);

      await page.screenshot({
        path: targetFile,
        fullPage: true,
      });

      const stats = fs.statSync(targetFile);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`  ✓ Saved: ${item.name} (${sizeMB} MB)`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${item.path}:`, err.message);
    }
  }

  await browser.close();
  console.log('\nAll pages exported successfully!');
}

captureAll().catch((err) => {
  console.error('Fatal error during export:', err);
  process.exit(1);
});
