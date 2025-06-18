const fs = require('fs');
const path = require('path');

// Path to the layout.tsx file
const layoutPath = path.join(__dirname, '../src/app/layout.tsx');

// Critical images to preload (adjust these based on your site's critical images)
const criticalImages = [
  // Hero images, logos, or other important images that appear above the fold
  '/assets/images/works/optimized/1.webp',
  '/assets/images/works/optimized/2.webp',
  '/assets/images/works/optimized/3.webp'
];

// Function to add preload directives to layout.tsx
function addPreloadDirectives() {
  try {
    // Read the layout file
    let content = fs.readFileSync(layoutPath, 'utf8');
    
    // Check if preload directives already exist
    if (content.includes('as="image" type="image/webp"')) {
      console.log('Preload directives already exist in layout.tsx');
      return;
    }
    
    // Generate preload link tags
    const preloadTags = criticalImages.map(image => 
      `    <link rel="preload" href="${image}" as="image" type="image/webp" />`
    ).join('\n');
    
    // Find the position to insert the preload tags (after the opening head tag)
    const headTagPos = content.indexOf('<head>');
    if (headTagPos === -1) {
      console.error('Could not find <head> tag in layout.tsx');
      return;
    }
    
    // Insert the preload tags
    const insertPos = headTagPos + '<head>'.length;
    const newContent = [
      content.slice(0, insertPos),
      '\n  {/* Preload critical images */}\n',
      preloadTags,
      content.slice(insertPos)
    ].join('');
    
    // Write the updated content back to the file
    fs.writeFileSync(layoutPath, newContent, 'utf8');
    console.log('✅ Added preload directives for critical images to layout.tsx');
  } catch (error) {
    console.error('Error adding preload directives:', error);
  }
}

addPreloadDirectives();