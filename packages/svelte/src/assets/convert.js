import path from 'node:path';
import fs from 'node:fs';


function convertFileNames(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      convertFileNames(filePath);
    } else if (file.endsWith('.svg')) {
      const newFileName = file.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('').replace(/\.svg/, '') + '.svelte';
      const newFilePath = path.join(dirPath, newFileName);
      fs.renameSync(filePath, newFilePath);
    }
  });
}

convertFileNames('./icons');

