const fs = require('fs');
const path = require('path');

// Define directories to search for files
const srcDir = path.join(__dirname, '../src');

// File extensions to process
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];

// Original and new image paths
const originalPathPattern = /\/assets\/images\/works\/([\w-]+)\.jpg/g;
const newPathPattern = '/assets/images/works/optimized/$1.webp';

// Function to recursively get all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fileList = getAllFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (fileExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Function to update image paths in a file
function updateImagePaths(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace image paths
    content = content.replace(originalPathPattern, newPathPattern);
    
    // If content changed, write it back to the file
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated image paths in ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
async function updateAllImagePaths() {
  try {
    console.log('Searching for files to update...');
    const files = getAllFiles(srcDir);
    console.log(`Found ${files.length} files to check`);
    
    let updatedCount = 0;
    
    // Process each file
    for (const file of files) {
      const updated = updateImagePaths(file);
      if (updated) updatedCount++;
    }
    
    console.log(`\nImage path update complete!`);
    console.log(`Updated ${updatedCount} files`);
  } catch (error) {
    console.error('Error updating image paths:', error);
  }
}

updateAllImagePaths();