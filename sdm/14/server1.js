const http = require('http');

/*
http.createServer((req, res) => {
  res.writeHead(200, {'content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>fuck</h1>');
  res.write('<p>hello</p>');
  res.end('<p>hu....</p>')
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중')
})
*/
//위에 소스랑 동일한 방법
/*
const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>fuck</h1>');
  res.write('<p>hello</p>');
  res.end('<p>hu....</p>')
}).listen(8080);
server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중');
})
server.on('error', (error) => {
  console.log(error);
});
*/
  
  //html 을 전달하는 방법
const fs = require('fs').promises;
  
const server = http.createServer(async (req, res) => {
  try {
   res.writeHead(200, {'content-Type': 'text/html; charset=utf-8'});
  const data = await fs.readFile('./test.html');
  res.end(data);
  } catch (error) {
    console.error(error);
   res.writeHead(200, {'content-Type': 'text/plain; charset=utf-8'});
    res.end(error.message);
  }
  }).listen(8080);
server.on('listening', () => {
  console.log('8080번 포트에서 서버 대기중');
})
server.on('error', (error) => {
  console.log(error);
});

