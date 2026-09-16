const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

function toBase64Src(filePath, mimeType) {
  const buf = fs.readFileSync(filePath);
  return `data:${mimeType};base64,${buf.toString('base64')}`;
}

async function generateCardCovers() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const brochureCover = toBase64Src('public/assets/print-presentation/brochure/page_01.png', 'image/png');
  const eySpread = toBase64Src('public/assets/print-presentation/ey/page_02.png', 'image/png');
  const deloitteCover = toBase64Src('public/assets/print-presentation/deloitte/page_01.png', 'image/png');

  // 1. Print & Presentation Card Cover
  const printPresentationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1920px;
            height: 1080px;
            background: #0d1017;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: relative;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
            background-size: 48px 48px;
          }
          .scene {
            position: relative;
            width: 1720px;
            height: 920px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          /* Left item: Brochure */
          .doc-brochure {
            position: absolute;
            left: 100px;
            bottom: 70px;
            width: 480px;
            height: 678px;
            box-shadow: -24px 35px 70px rgba(0,0,0,0.7);
            border-radius: 8px;
            overflow: hidden;
            transform: rotate(-3.5deg);
            z-index: 2;
            border: 1px solid rgba(255,255,255,0.12);
          }
          /* Center item: EY Spread (wide editorial spread) */
          .doc-ey {
            position: absolute;
            left: 380px;
            top: 70px;
            width: 920px;
            height: 650px;
            box-shadow: 0 40px 90px rgba(0,0,0,0.8);
            border-radius: 8px;
            overflow: hidden;
            z-index: 1;
            border: 1px solid rgba(255,255,255,0.14);
          }
          /* Right item: Deloitte Cover */
          .doc-deloitte {
            position: absolute;
            right: 110px;
            bottom: 50px;
            width: 500px;
            height: 647px;
            box-shadow: 25px 35px 80px rgba(0,0,0,0.85);
            border-radius: 8px;
            overflow: hidden;
            transform: rotate(3deg);
            z-index: 3;
            border: 1px solid rgba(255,255,255,0.15);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="scene">
          <div class="doc-brochure">
            <img src="${brochureCover}" />
          </div>
          <div class="doc-ey">
            <img src="${eySpread}" />
          </div>
          <div class="doc-deloitte">
            <img src="${deloitteCover}" />
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(printPresentationHtml);
  await page.waitForTimeout(600);
  const printCoverPath = path.resolve('public/assets/print-presentation/card-cover.png');
  await page.screenshot({ path: printCoverPath });
  console.log('Saved Print & Presentation card cover to:', printCoverPath);

  // 2. Digital Communication Card Cover
  const screenImg = toBase64Src('public/assets/digital-communication/digital-screen-01.jpg', 'image/jpeg');
  const emailerImg = toBase64Src('public/assets/digital-communication/emailer-01.jpg', 'image/jpeg');

  const digitalCommHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1920px;
            height: 1080px;
            background: #080c14;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: relative;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(0, 102, 204, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 102, 204, 0.06) 1px, transparent 1px);
            background-size: 50px 50px;
          }
          .scene {
            position: relative;
            width: 1750px;
            height: 940px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          /* Digital Screen (16:9) */
          .screen-container {
            position: absolute;
            left: 50px;
            top: 110px;
            width: 1120px;
            height: 630px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 35px 85px rgba(0,0,0,0.85);
            border: 1px solid rgba(255,255,255,0.12);
            z-index: 1;
          }
          /* Emailer 1 */
          .emailer-container {
            position: absolute;
            right: 80px;
            top: 55px;
            width: 480px;
            height: 840px;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: -30px 40px 90px rgba(0,0,0,0.9);
            border: 1px solid rgba(255,255,255,0.15);
            z-index: 2;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="scene">
          <div class="screen-container">
            <img src="${screenImg}" />
          </div>
          <div class="emailer-container">
            <img src="${emailerImg}" />
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(digitalCommHtml);
  await page.waitForTimeout(600);
  const digitalCoverPath = path.resolve('public/assets/digital-communication/card-cover.png');
  await page.screenshot({ path: digitalCoverPath });
  console.log('Saved Digital Communication card cover to:', digitalCoverPath);

  // 3. Meta Ad Card Cover
  const metaAdImg = toBase64Src('public/assets/social-media/meta-ad.png', 'image/png');

  const metaAdHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1920px;
            height: 1080px;
            background: #070b14;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: relative;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(24, 119, 242, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(24, 119, 242, 0.05) 1px, transparent 1px);
            background-size: 48px 48px;
          }
          .card-container {
            position: relative;
            width: 820px;
            height: 820px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.15);
            z-index: 2;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="card-container">
          <img src="${metaAdImg}" />
        </div>
      </body>
    </html>
  `;

  await page.setContent(metaAdHtml);
  await page.waitForTimeout(600);
  const metaCoverPath = path.resolve('public/assets/social-media/meta-ad-cover.png');
  await page.screenshot({ path: metaCoverPath });
  console.log('Saved Meta Ad card cover to:', metaCoverPath);

  await browser.close();
}

generateCardCovers().catch(err => {
  console.error(err);
  process.exit(1);
});

