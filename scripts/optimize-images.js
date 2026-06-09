const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDirs = [
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../public/treatments')
];

async function optimizeImages() {
  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.match(/\.(png|jpe?g)$/i)) {
        const inputPath = path.join(dir, file);
        const parsedPath = path.parse(file);
        
        // Remove duplicate extensions like .jpg.png if any
        let baseName = parsedPath.name;
        if (baseName.endsWith('.jpg')) baseName = baseName.replace('.jpg', '');
        if (baseName.endsWith('.png')) baseName = baseName.replace('.png', '');
        
        const outputPath = path.join(dir, `${baseName}.webp`);

        console.log(`Optimizing: ${file} -> ${baseName}.webp`);
        await sharp(inputPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
          
        // Optional: remove old file to save space
        // fs.unlinkSync(inputPath);
      }
    }
  }
}

optimizeImages().catch(console.error);
