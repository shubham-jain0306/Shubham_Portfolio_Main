const fs = require('fs');
const path = require('path');

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}

// Social media assets
copyFile('C:/Users/vinay/Downloads/portfolio/social media/Shubham Jain.png', 'public/assets/social-media/shubham-jain-carousel-overview.png');
copyFile('C:/Users/vinay/Downloads/portfolio/social media/Shubham-Jain_01.jpg', 'public/assets/social-media/carousel-slide-01.jpg');
copyFile('C:/Users/vinay/Downloads/portfolio/social media/Shubham-Jain_02.jpg', 'public/assets/social-media/carousel-slide-02.jpg');
copyFile('C:/Users/vinay/Downloads/portfolio/social media/Shubham-Jain_03.jpg', 'public/assets/social-media/carousel-slide-03.jpg');

// Digital communication assets
copyFile('C:/Users/vinay/Downloads/portfolio/Shubham Jain Digital Screen.jpg', 'public/assets/digital-communication/digital-screen-01.jpg');
copyFile('C:/Users/vinay/Downloads/portfolio/1x/Shubham Jain E1.jpg', 'public/assets/digital-communication/emailer-01.jpg');
copyFile('C:/Users/vinay/Downloads/portfolio/1x/Shubham Jain E2.jpg', 'public/assets/digital-communication/emailer-02.jpg');
copyFile('C:/Users/vinay/Downloads/portfolio/Shubham Jain Emailer.pdf', 'public/assets/digital-communication/Shubham Jain Emailer.pdf');

// Original PDFs for Print & Presentation
copyFile('C:/Users/vinay/Downloads/portfolio/Deloitte Assignment 1.1.pdf', 'public/assets/print-presentation/docs/Deloitte Assignment 1.1.pdf');
copyFile('C:/Users/vinay/Downloads/portfolio/EY Assessment File.pdf', 'public/assets/print-presentation/docs/EY Assessment File.pdf');
copyFile('C:/Users/vinay/Downloads/portfolio/Brochure.pdf', 'public/assets/print-presentation/docs/Brochure.pdf');

console.log('Asset copy complete.');
