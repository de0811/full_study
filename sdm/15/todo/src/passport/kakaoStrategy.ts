import passport from "passport";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { DB } from "../schemas";

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID as string,
        callbackURL: "/auth/kakao/callback",
      },
      // 카카오 로그인 성공 시 호출
      // accessToken: 카카오에서 발급하는 토큰
      // refreshToken: 카카오에서 발급하는 리프레시 토큰
      // profile에 카카오에서 보내주는 사용자 정보가 들어있다.
      //  profile: {  //카카오에서 간혹 바꿔서 보내기 때문에 console로 확인해봐야함
      //   id: 123456789,
      //   username: '홍길동',
      //   displayName: '홍길동',
      //   provider: 'kakao',
      //  }
      //   _raw: '{"id":123456789,"connected_at":"2021-01-01T00:00:00Z","properties":{"nickname":"홍길동"},"kakao_account":{"profile_needs_agreement":false,"profile":{"nickname":"홍길동"},"has_email":true,"email_needs_agreement":false,"is_email_valid":true,"is_email_verified":true,"email":"
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await DB.User.findOne({
            snsId: profile.id,
            provider: "kakao",
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await DB.User.create({
              email: profile._json?.kakao_account?.email,
              snsId: profile.id,
              name: profile.displayName,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
}
