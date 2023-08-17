const fs = require('fs');

const fileName = 'personlInformationIntermediate.json';
const fileNameWithoutExtension = fileName.split('.')[0];

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // Update wordNumber starting from 1
    jsonData.forEach((entry, index) => {
      entry.wordNumber = index + 1;
    });

    const updatedJson = JSON.stringify(jsonData, null, 2);

    fs.writeFile(
      `${fileNameWithoutExtension}-updated.json`,
      updatedJson,
      'utf8',
      (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('File updated successfully.');
      },
    );
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
