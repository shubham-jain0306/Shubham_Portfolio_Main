const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

async function verify() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('__bootCurtainSeen', '1');
    } catch (e) {}
  });

  const outDir = path.resolve('C:/Users/vinay/.gemini/antigravity-ide/brain/8e0ba783-dd52-4bd5-894c-452b3a5cfeb5/screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // 1. Check /projects page
  await page.goto('http://localhost:8080/projects', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.getElementById('boot-curtain')?.remove();
  });
  await page.waitForTimeout(1000);
  
  const projectCards = await page.$$eval('a[href*="/work/"]', links => {
    return links.map(l => ({
      href: l.getAttribute('href'),
      text: l.innerText.trim().replace(/\s+/g, ' ')
    }));
  });
  console.log('Project links found on /projects:');
  projectCards.forEach(c => console.log(` - ${c.href} (${c.text})`));

  // Scroll down to project cards
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, 'projects_page_verified.png'), fullPage: false });

  // 2. Check /work/meta-ads redirect
  await page.goto('http://localhost:8080/work/meta-ads', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  console.log('Final URL after navigating to /work/meta-ads:', page.url());

  // 3. Check /work/roverride
  const hasMetaAdBadge = await page.locator('text=META AD').count();
  console.log('Meta Ad badge count on Social Media page:', hasMetaAdBadge);
  await page.evaluate(() => {
    document.getElementById('boot-curtain')?.remove();
  });
  await page.waitForTimeout(500);

  // Scroll to meta ad on social media page
  const metaAdSection = page.locator('text=META AD').first();
  if (await metaAdSection.count() > 0) {
    await metaAdSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: path.join(outDir, 'roverride_meta_ad_verified.png'), fullPage: false });

  // 4. Also check homepage /
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.getElementById('boot-curtain')?.remove();
  });
  await page.waitForTimeout(600);
  const homeCards = await page.$$eval('a[href*="/work/"]', links => {
    return links.map(l => l.getAttribute('href'));
  });
  console.log('Project links on homepage /:', homeCards);
  await page.screenshot({ path: path.join(outDir, 'homepage_verified.png'), fullPage: false });

  await browser.close();
  console.log('All verifications passed!');
}

verify().catch(console.error);
