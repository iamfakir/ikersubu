const fs = require('fs');
const path = require('path');

const logos = [
  'def-jam.svg',
  'think-music.svg',
  'universal-records.svg',
  'azadi-records.svg',
  'gully-gang.svg'
];

const logoDir = path.join(__dirname, '../public/logos');

// Create a simple SVG placeholder
const createPlaceholderSVG = (name) => `
<svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="100" fill="#1E243A" />
  <text x="50%" y="50%" font-family="Arial" font-size="12" fill="#00F0FF" text-anchor="middle" dominant-baseline="middle">
    ${name.replace(/-/g, ' ').toUpperCase()}
  </text>
</svg>
`;

// Create directory if it doesn't exist
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// Create placeholder SVGs
logos.forEach(logoName => {
  const name = logoName.replace('.svg', '');
  const svgContent = createPlaceholderSVG(name);
  const filePath = path.join(logoDir, logoName);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, svgContent.trim());
    console.log(`Created placeholder: ${filePath}`);
  } else {
    console.log(`Skipping, already exists: ${filePath}`);
  }
});

console.log('Placeholder logos created successfully!');
