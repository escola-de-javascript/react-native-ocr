import * as tesseract from 'node-tesseract-ocr';
import fs from 'fs';

const config = {
  lang: 'por',
  oem: 1,
  psm: 3
}

export async function extractText(filePath) {
  return new Promise((resolve, reject) => {
    tesseract
      .recognize(filePath, config)
      .then(text => {
        clearImage(filePath);
        resolve(text);
      })
      .catch(error => {
        clearImage(filePath);
        reject(error);
      })
  });
}

function clearImage(filePath) {
  fs.unlinkSync(filePath);
}