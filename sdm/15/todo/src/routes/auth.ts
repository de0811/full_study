/*
  로그인 및 회원가입 로그아웃 등을 처리하는 라우터
*/

import express, { Express, NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
const DB = require("../schemas").DB;
const {isLogin, isNotLogin} = require("../middlewares");


const router = Router();

//로그인
router.post(
  "/v2/login",
  passport.authenticate("local", { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    //jwt 토큰 생성
    const token = jwt.sign(
      {email: req.body.email,},         //토큰의 내용(payload)
      process.env.JWT_SECRET as string, //JWT_SECRET가 없으면 에러 발생
      {expiresIn: "1m"}                 //1분 뒤에 만료되는 토큰
    );
    //토큰을 쿠키에 저장
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 1, //1분
    });
    
    //로그인 성공
    res.json({message: "ok"});
  });

  //로그아웃
  router.get("/v2/logout", (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access_token");
    res.json({message: "ok"});
  }
);
  

//회원가입
router.post(
  "/v2/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password, name } = req.body;
      //이메일 중복 확인
      const checkUser = DB.User.findOne({ email });
      if( checkUser ) {
        return res.status(409).json({ message: "이미 존재하는 이메일 입니다." });
      }
      //패스워드 해싱
      password = await bcrypt.hash(password, 10);
      const user = await DB.User.create(req.body);
      res.redirect(201, `/v2/users/${user.id}`);
    } catch (e) {
      let error = Object.assign({}, e, { status: 404 });
      console.error(error);
      next(error);
    }
  }
);


module.exports = router;