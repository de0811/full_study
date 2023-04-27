import passport from "passport";
const local = require("./localStrategy");

module.exports = () => {
  /*
인증된 사용자 객체를 세션에 아이디로 저장
유일한 식별자 값을 추출해서 세션 데이터에 저장
보통 ID 값만 저장
*/
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  /*
세션에 저장된 데이터를 사용해 사용자 객체를 복원할때 호출
세션에 저장된 ID를 통해 DB에서 사용자 정보를 조회
조회된 정보를 req.user에 저장하기 위해 done(null, user) 호출
*/
  passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
  });
  
  local();
};
