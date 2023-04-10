npm init -y
npm i -D typescript

scripts : test 는 삭제

touch ./src/index.ts
내부 소스 작성

touch tsconfig.json
{
  // 소스파일이 어디있는지
  "include": [
    "src"
  ],
  // 컴파일 옵션
  "compilerOptions": {
    // 컴파일된 javascript 를 어디로 이동 시킬지
    "outDir": "build",
    // javascript 어느 버전으로 빌드할지 설정
    "target": "ES6",
    // 어느 환경에서 실행될지 설정
    // "lib": ["ES6", "DOM"],
    "lib": ["ES6"],
    "strict": true,
    // js 쓰는것을 허용
    // "allowJs": true,
    "esModuleInterop": true,
    // 브라우저 앱을 만들 경우 umd를 사용
    "module": "CommonJS"
  }
}


//node 에서 typescript 실행하는 도구
npm i -D ts-node

//자동으로 ts-node 실행
npm i nodemon

package.json 작성
  "scripts": {
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/index.ts",
    "start": "node build/index.js"
  }


  정의된 타입이 없어서 미리정의된 타입을 받아오는 방법
  npm i -D @types/node
  
  경로 또는 이름은
  https://github.com/DefinitelyTyped/DefinitelyTyped
  여기서 조회할 수 있음
  

여기까지 봤음
  https://nomadcoders.co/typescript-for-beginners/lectures/3691

  npm 은 패키지 관리
  npx는 패키지 전역 실행 명렁어

  https://docs.npmjs.com/cli/v9/commands