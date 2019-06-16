import express from 'express'
import bodyParser from 'body-parser';
import upload from './config/storage';
import { extractText } from './lib/imageHandler';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/upload', upload.single('image'), async (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Envie o arquivo a ser tratado');
    error.httpStatusCode = 400;
    return res.json(error);
  }
  await extractText(file.path).then(text => {
    const result = { data: text, ...file };
    res.json(result);
  }).catch(error => {
    res.json(error);
  });
})

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});