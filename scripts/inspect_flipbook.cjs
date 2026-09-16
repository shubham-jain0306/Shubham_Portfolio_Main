const fs = require('fs');

const content = fs.readFileSync('C:/Users/vinay/Downloads/portfolio/mood_magic_manifesto_flipbook (1).html', 'utf-8');

// Extract style
const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  console.log("=== CSS STYLES (Length: " + styleMatch[1].length + ") ===");
  console.log(styleMatch[1].substring(0, 2000));
}

// Extract HTML structure between <body> and <script>
const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<script>/);
if (bodyMatch) {
  console.log("=== HTML BODY ===");
  console.log(bodyMatch[1]);
}

// Extract JS script (without the huge base64 data)
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  let js = scriptMatch[1];
  // Replace base64 data array
  js = js.replace(/data:image\/[a-zA-Z]+;base64,[^"']+/g, '"[BASE64_DATA]"');
  console.log("=== JAVASCRIPT ===");
  console.log(js.substring(0, 3000));
}
