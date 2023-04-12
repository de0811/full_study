import express, { Express, NextFunction, Request, Response } from "express";
import * as path from "path";
// import * as morgan from 'morgan';
// 요청과 응답을 기록하는 모듈
const morgan = require('morgan');
// cookie를 object 형식으로 바꿔줌
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app: Express = express();
const PORT: number = 8080;

// 실무에서는 'dev'가 아닌 'combined'를 사용
app.use(morgan('dev'));

// cookie를 object 형태로 쓸 수 있게 해줌
app.use(cookieParser('여기에 password 입력 가능'));
  // req.signedCookies 이거랑 password 랑 같이 사용 가능

  // req.body.던져진Body내용 이렇게 바로 사용가능하도록 해주는 것
  app.use('/', express.static(path.join(__dirname, 'public'))); //express.static('요청 경로', '실제 경로')
  app.use(express.json());                          //JSON parsing
  app.use(express.urlencoded({extended: true}));    //form parsing  extended: true 라면 qs 사용, false 라면 querystring 사용
  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'session cookie password',
    cookie: {
      httpOnly: true,
    },
    // name: 'connect.sid', //default 로 connect.sid로 저장됨
  }));
  app.use(multer().array());

app.use((req:Request, res:Response, next:NextFunction) => {
  console.log('공통으로 읽어지는 구간 middleware');
  next(); //이게 있어야 다음 요청들을 처리 가능
})

//모든 서버 실행하는걸 라우터라고 함
app.get("/", (req: Request, res: Response) => {
  // 쿠키를 등록하는 방법
  res.cookie('name', encodeURIComponent('이름을 에베베'), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  })
  //등록된 쿠키를 삭제하는 방법
  res.clearCookie('name');
  res.sendFile(path.join(__dirname, "./user.html"));
});

app.get('/category/:name', (req:Request, res:Response) => {
  res.send(`hello ${req.params.name}`);
})

app.use((req:Request, res:Response, next:NextFunction) => {
  //여기까지 왔다면 위에 라우터에 걸린게 없기 때문에 404 에러라고 확신하기에 여기서 404 커스텀 가능
  res.status(404).send('404 error');
})

app.use((error:any, req:Request, res:Response, next:NextFunction) => {
  //에러 처리는 무조건 Error, req, res, next를 포함해야 처리가능
  //500 error 처리
})

app.listen(PORT, () => {
  console.log("express Server Start !!!");
});
