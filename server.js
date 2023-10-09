const http = require('http');

const port = process.env.PORT || 8080
const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello Camptocamp!');
}
const server = http.createServer(requestListener);

var Minio = require('minio')
var minioClient = new Minio.Client({
  endPoint: process.env.ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.ACCESS_KEY,
  secretKey: process.env.SECRET_KEY
});
var file = 'package.json'

minioClient.fPutObject(process.env.BUCKET_NAME, 'hello-object', file, function (err, etag) {
  if (err) return console.log(err)
  console.log('File uploaded successfully.')
});

server.listen(port);
