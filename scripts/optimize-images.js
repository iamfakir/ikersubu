const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define source and destination directories
const sourceDir = path.join(__dirname, '../public/assets/images/works');
const destDir = path.join(__dirname, '../public/assets/images/works/optimized');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Process all jpg files in the source directory
async function optimizeImages() {
  try {
    // Get all jpg files
    const files = fs.readdirSync(sourceDir).filter(file => 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    );
    
    console.log(`Found ${files.length} images to optimize`);
    
    // Process each file
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const filename = path.parse(file).name;
      const destPath = path.join(destDir, `${filename}.webp`);
      
      // Skip if the optimized file already exists
      if (fs.existsSync(destPath)) {
        console.log(`Skipping ${file} - already optimized`);
        continue;
      }
      
      console.log(`Optimizing ${file}...`);
      
      // Get original file size
      const originalSize = fs.statSync(sourcePath).size;
      
      // Process the image - convert to WebP with 80% quality
      await sharp(sourcePath)
        .webp({ quality: 80 })
        .toFile(destPath);
      
      // Get new file size
      const newSize = fs.statSync(destPath).size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(2);
      
      console.log(`✅ ${file} optimized: ${(originalSize / 1024).toFixed(2)}KB → ${(newSize / 1024).toFixed(2)}KB (${savings}% savings)`);
    }
    
    console.log('Image optimization complete!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();