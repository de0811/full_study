import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions ={
  providers: [
    GithubProvider({
      // github.com/settings/developers
      // github에서 발급 받은 ID와 Secret을 입력
      // clientId: process.env.GITHUB_ID!,
      clientId: '7097317d1a8919023826',
      // clientSecret: process.env.GITHUB_SECRET!,
      clientSecret: '499f9eb5ff9c30c705ff63509259dea190d19282',
    }),
  ],
  // JWT 생성시 쓰는 암호화 키
  secret: process.env.SECRET!,
  callbacks: {
    // async signIn(user, account, profile) {
      // console.log("signIn", user, account, profile);
      // return true;
    // }
    // async jwt({token}) {
      // console.log("JWT : ", token);
      // return token;
    // }
  }
};

export default NextAuth(authOptions);