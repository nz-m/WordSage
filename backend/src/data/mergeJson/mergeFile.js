const fs = require('fs');
const path = require('path');

const inputFolderPath = './';
const outputFilePath = './merged_output.json';

const mergedArray = [];

// Read JSON files from the input folder
fs.readdir(inputFolderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  files.forEach((file) => {
    if (path.extname(file) === '.json') {
      const filePath = path.join(inputFolderPath, file);

      try {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        mergedArray.push(...jsonData);
      } catch (parseError) {
        console.error(`Error parsing JSON from file ${file}:`, parseError);
      }
    }
  });

  // Write merged data to the output file
  fs.writeFile(
    outputFilePath,
    JSON.stringify(mergedArray, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.error('Error writing output file:', err);
        return;
      }
      console.log('Files merged and saved to', outputFilePath);
    },
  );
});
