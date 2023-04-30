import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
const DB = require("../schemas").DB;

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 이메일 확인
          console.log("이메일 확인");
          const user = await DB.User.findOne({ email });
          if (!user) {
            return done(null, false, {
              message: "존재하지 않는 이메일 입니다.",
            });
          }

          //password 확인
          console.log("비밀번호 확인", password, user.password);
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다.",
            });
          }

          // 로그인 성공
          console.log("로그인 성공");
          return done(null, user);
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
