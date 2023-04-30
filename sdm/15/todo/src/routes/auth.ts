/*
  로그인 및 회원가입 로그아웃 등을 처리하는 라우터
*/

import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const DB = require("../schemas").DB;
const { isLogin, isNotLogin } = require("../middlewares");

const router = Router();

//local 로그인
router.post(
  "/v2/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    //jwt 토큰 생성
    let token = jwt.sign(
      { email: req.body.email }, //토큰의 내용(payload)
      process.env.JWT_SECRET as string, //JWT_SECRET가 없으면 에러 발생
      { expiresIn: "1m" } //1분 뒤에 만료되는 토큰
    );
    // token = token.replace("Bearer ", "");
    token = token + "Bearer";
    //토큰을 쿠키에 저장
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 1, //1분
    });

    //로그인 성공
    res.json({ message: "ok" });
  }
);

//kakao 로그인
router.get("/v2/kakao", passport.authenticate("kakao"));

//kakao 로그인 콜백
router.get(
  "/v2/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/v2/login" }),
  async (req: Request, res: Response, next: NextFunction) => {
    //jwt 토큰 생성
    let token = jwt.sign(
      { email: req.body.email }, //토큰의 내용(payload)
      process.env.JWT_SECRET as string, //JWT_SECRET가 없으면 에러 발생
      { expiresIn: "1m" } //1분 뒤에 만료되는 토큰
    );
    // token = token.replace("Bearer ", "");
    token = token + "Bearer";
    //토큰을 쿠키에 저장
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 1, //1분
    });
  }
);

//토큰 검증
router.get("/v2/check", (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.access_token;
    token = token.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "로그인 되어 있지 않습니다." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    res.json({ message: "ok", email: decoded });
  } catch (e) {
    if( e instanceof jwt.TokenExpiredError) {
      return res.status(419).json({ message: "토큰이 만료되었습니다." });
    }
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
});

//로그아웃
router.get("/v2/logout", (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie("access_token");
  res.json({ message: "ok" });
});

//회원가입
router.post(
  "/v2/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("회원가입", req.body);
      let { email, password, name } = req.body;

      console.log(email, password, name);
      //이메일 중복 확인
      console.log("이메일 중복 확인");
      const checkUser = await DB.User.findOne({ email });
      console.log(checkUser);
      if (checkUser) {
        return res
          .status(409)
          .json({ message: "이미 존재하는 이메일 입니다." });
      }
      //패스워드 해싱
      password = await bcrypt.hash(password, 10);
      const user = await DB.User.create({ email, password, name });
      res.redirect(201, `/v2/users/${user.id}`);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
