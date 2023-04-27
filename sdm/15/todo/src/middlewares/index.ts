

import express, { Express, NextFunction, Request, Response } from "express";

// 로그인 했는지 확인하는 미들웨어
exports.isLogin = (req:Request, res:Response, next:NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/login");
    }
}

// 로그인 안했는지 확인하는 미들웨어
exports.isNotLogin = (req:Request, res:Response, next:NextFunction) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/");
    }
}