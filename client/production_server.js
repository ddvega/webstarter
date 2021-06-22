import express from 'express';
import path from 'path';
import url from 'url';
import fs from 'fs';
import https from 'https';

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({ key: key, cert: cert }, app);
const PORT = 3000;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Webstarter is running on ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Webstarter is running on ${PORT}`);
// });
