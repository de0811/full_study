function myName(name: string) {
  console.log(name);
  let aa: boolean;
  let a1 : number;
  let a2 : string;
  let a3 : object;
  let a4 : any; //이 타입을 쓸거면 차라리 union 타입을 쓰는걸 추천
  a4 = 0;
  a4 = 'aaa';
  let a5 : void;
  let a6 : null;
  let a7 : undefined;
  let a8 : unknown;
  let a9 : never; //절대 반환하지 않는 함수에 사용(무한 반복되는 함수나 오류를 발생시키기 위해 존재하는 함수)

  // array, tuple 사용 방법은 조금 특별
  // array
  let a11 : number[] = [1,2,3,4,5];
  a11.push(22); //javascript의 Array.prototype.push() 동일 결과
  let a12 : (string | number | boolean | null)[] = ['별의 별걸 다 쓰네', 10, false, null];
  // 제네릭 배열  Array<Type>
  let a13 : Array<String> = ['제네릭 배열', '이걸 왜 쓴담'];
  let a14 : Array<string | number> = ["흐으음", 10];
  let a15 : typeof a14 = ["흠냥", 11];  //타입을 참조할때는 타입 쿼리를 이용, 참조할 변수의 타입을 얻어와 타입을 지정 <- 대체 이게 무슨 말이야
  let a16 : Array<() => string> = [() => '문자반환함수', () => '그냥 함수 주소값 넣는거지'];
  //tuple
  let a17 : [string, number] = ['key를 말하니?', 10]; //array union 처럼 생겼는데 이건 , <- 이걸로 구분하니까 잘 봐주자
  // let a18 : [string, number] = ['Typescript 2.6 이하 버전에선 정의된것보다 갯수가 많으면 이걸 배열로 봤다', 10, 100]; //이건 이제 에러지
  
  // Any와 유사함
  const a19 : object = {}; //실수로 이렇게 쓸수도 있겠지만 이건 any 타입보다 좁은 범위의 타입 이런건 쓰지말자
  let a20 : {}; //이건 정말 any 타입인데 const로는 이제 못쓰네?

  
  // union 타입
  let a10 : number | string;  //union 타입
  a10 = 10;
  a10 = 'ha...';
  
  //custom Type
  type Kilogram = number; //type 을 써서 새로운 커스텀 타입을 만들 수 있음  C의 define을 보고 만든거 같은데 단점도 알고 만든건가
  type Student = {
    name: string;
    weight: Kilogram; //이렇게 타입의 타입으로 넣을 수 있다
  }
  let student : Student = {
    name: 'aaaa',
    weight: 52
  }
  console.log(student);

  type Teacher = {
    name : string;  //필수로 정의해야하는 속성
    kind? : string; //정의 해도 되고 안해도 되는 속성
  }
  let teacher : Teacher = {
    name: 'ccc'
    // ,
    // kind: 'fuck'
  }
  
  // 인스턴트 타입
  let citizen : { //선언
    name: string,
    grade : number
  }
  citizen = { //정의
    name : '시민',
    grade : 2
  }
  // 인스턴트 타입 생성과 정의
  const citizen01 = {
    name : '시민1',
    grade : 1
  }
  // 이후 값 지정
  const cat : {type: string, age?: number} = {
    type : 'hoochu'
  };
  cat.age = 11;
  
  // 인덱스 시그니처 <- 이런걸 쓸 이유가 있나 ?
  const dog : { [idex : string] : number } = {};
  dog.id = 2020222;
  // dog.id = '이건 안돼';
  dog.fuck = 123;
  
  // 열거형
  enum Slass {  //이름은 첫글자를 대문자로 하는걸 추천
    Rock,       //이것도 첫글자는 대문자로 하는걸 추천
    Scissors,   //아무 값도 안주면 알아서 적절한 숫자를 할당해줌
    Paper
  }
  enum Count {  //숫자 열거형 (값을 지정하지 않으면 상위 값에 +1 해서 값을 할당)
    Zero = 0,
    One,  //1
    Two,  //2
    Three = 100 + 2,
    Four, //103
    Five = 202,
    six   //203
  }
  enum STR_COUNT {  //문자 열거형 (값은 지정해주자)
    Zero = 'ZERO',
    One = 'ONE'
  }
  enum I_S_COUNT {  //이종 열거형
    ZERO = 'ZERO',
    ONE = 1,
    TWO //2
  }
  const enum CCC {  //컴파일 단계에서 치환하는 방법 (js 파일에서는 존재하지 않음)
    Zero = 0,
    One,
    TWO = 'ttwo'
  }
  /*
    * enum과 다르게 key-value의 관계가 양방향이 되지 않음
    * inlined 되기 때문에 코드가 가벼워지고 Tree-shaking 가능
    * inlined 되기 때문에 사실상 readonly와 같이 동작(수정 불가)
  */
  
  const CEnum = {   //const enum의 단점을 제거하기 위해 as const로 상수로 만들어버리는 방법 (아니 이럴거면 그냥 enum 쓰는게 맞지 않니?)
    RED : 1,
    BULE : 2
  } as const;
  type ForReplaceEnum = typeof CEnum[keyof typeof CEnum];
  let a25 : ForReplaceEnum = 1;
  // let a25 = CEnum.RED;
  console.log(a25);
  
  type Ta21 = 1 | 2 | 3;  //숫자 리터럴 유니온
  let a21 : Ta21 = 3;   // 정의 되지 않은 값 4 같은걸 넣을 시 에러
  type Ta22 = '이 문자들만' | '쓸 수 있지'; //문자 리터럴 유니온
  let a22 : Ta22 = '쓸 수 있지';
  type Ta23 = {first : 1} | {second : 2}; //객체 리터럴 유니온
  let a23 : Ta23 = {first : 1};
  interface Ta24_1 {a : number};  //인터페이스 리터널 유니온
  interface Ta24_2 {b : number};
  type Ta24 = Ta24_1 | Ta24_2;
  let a24 : Ta24 = {a:10};

  type Ta26<T> = {    //제네릭 타입
    name: T;
  }
  let a26 : Ta26<string> = {name: '제네릭 타입'};
  console.log(a26);
  
  type Ta27 = {     //객체 타입
    name: string,
    age: number
  }
  function fa27 (a27 : Ta27) {  //객체 타입을 파라메타로 받을때
    console.log(a27.name);
  }
  let a27_1 : Ta27 = {name : '이름이요', age : 26};
  fa27(a27_1);
  
  //함수 타입
  type ifa28 = (x: number, y: number) => number; //return 이 없을 경우 void 로 지정
  let fa28 : ifa28 = (x, y) => {
    return x + y;
  }
  console.log('type 함수타입 ', fa28(1, 2) );
  
  /*
  interface
  특징 : type 과 기능은 동일
  차이점 : extends 를 받을 수 있음
  */
  // interface 함수 타입
 //return 이 없을 경우 void 로 지정
  interface ifa29 { (x: number, y: number) : number };
  let fa29 : ifa29 = (x, y) => {
    return x + y;
  }
  console.log('interface 함수타입 ', fa29(1, 2) );

  //인터페이스를 인자로 사용할때 프로퍼티의 타입의 이름과 조건을 만족한다면 같은 인터페이스가 아니라도 인자로 받을 수 있음
  interface ia30 {  
    name: string;
    age?: number; // ?로 할 경우 해당 프로퍼티는 정의하지 않아도 됨
  }
  function fa30(pa30: ia30) {
    console.log(pa30);
  }
  let a30 = {
    name: '인터페이스의 유사한 유형을 나타냄',
    age: 10,
    gender : 'man'
  }
  fa30(a30);
  
  interface ia31 {
    readonly name: string;
  }
  let a31: ia31 = {
    name: 'readonly로 선언한 것은 바뀔 수 없음'
  }
  // a31.name = 'readonly라 바뀌지 않고 에러';
  
  let a32: ReadonlyArray<string> = ['읽기 전용 배열', '건들면 에러남'];
  // a32.splice(0,1);
  
  //interface를 활용한 class 정의 방법
  interface ia33 {
    name?: string;
    age: number;
    setAge(age: number): void;
    print(): void;
  }
  // 선언적 확장
  interface ia33 {  // 인터페이스는 이렇게 확장도 가능 (type과 가장 큰 차이점)
    apple?: string;
    // name: number; // !이렇게 재정의는 할 수 없음
  }
  class ca33 implements ia33 {
    name: string = '클래스 정의중';
    age = 10;
    constructor() {}
    setAge(age: number) {
      this.age = age;
    }
    print() {
      console.log(this.name, this.age);
    }
  }
  const a33 = new ca33();
  
  class ca34 implements ia33 {
    // sas: number;
    // constructor(public age: number) {}
    constructor(public name: string, public age: number, public sas: number) {} //변수 생성 방법
    setAge(age: number): void {
        this.age = age;
    }
    print(): void {
        console.log(this);
    }
  }
  // let a34 = new ca34("hi", 10);
  let a34 = new ca34('interface -> + class', 10, 2);
  a34.print();
  
  interface ia35 extends ia33 { //interface 간의 상속
    art: string;
  }
  class ca35 implements ia35 {
    constructor(public name: string, public age: number, public sas: number, public art: string) {} //변수 생성 방법
    setAge(age: number): void {
        this.age = age;
    }
    print(): void {
        console.log(this);
    }
  }
  let a35 = new ca35('interface -> + interface 상속', 12, 123, '흐으음');
  a35.print();
  
  type ta36 = {
    name: string;
    age: number;
  }
  interface ia36 extends ta36 { //type을 상속받는게 가능  유니온 연산자를 사용한 타입은 extends, implements 사용 불가
    gender: string;
  }
  
  /*
    * type === c struct 와 동일
    * interface === java interface 와 유사
    * class === 구린데 뭐가 없네
    * 공식 문서에는 유니온, 튜플을 사용하는 경우 이외에는 type 의 사용보다는 interface의 사용을 권장함
  */
  
  type ta37_1 = {
    name: string;
  }
  type ta37_2 = ta37_1 & {
    age: number;
  }
  let a37 : ta37_2 = {
    name: 'type + type 타입의 확장, 새로운 타입을 정의 할 수 있음',
    age: 20,
  }
  
  interface ia38 {
    name: string;
  }
  type ta38 = ia38 & {
    age: number;
  }
  let a38: ta38 = {
    name: 'interface + type 도 가능하다',
    age: 38
  }
  
  //interface union
  interface ia39_1 {
    name: string;
    age: number;
  }
  interface ia39_2 {
    name: string;
    gender: string;
  }
  function fa39(a39: ia39_1 | ia39_2) {
    console.log(a39.name);  //쓸 수 있는게 공통적으로 name이라서 이것 하나 밖에 사용할 수 없음
  }
  
  //interface 함수 선언
  interface ia42_1 {
    ma42_1() : string;
  }
  interface ia42_2 {
    ma42_2() : number;
  }




  /***********************************************************************************/
  
  // 원시 타입 식별
  function fa40(input1: number | string, input2: number | string) {
    if( typeof input1 === 'number' ){
      console.log('input1 : number Type');
    } else if( typeof input1 === 'string' ) {
      console.log('input1 : string Type');
    }else {
      console.log('input1 : other Type');
    }
    if( typeof input2 === 'number' ) {
      console.log('input2 : string Type');
    } else if( typeof input2 === 'string' ) {
      console.log('input2 : string Type');
    } else {
      console.log('input2 : other Type');
    }
  }
  fa40(40, 'fuck');
  console.log(typeof 44, typeof 'string', typeof null, typeof undefined);
  
  //클래스 객체 식별
  class ca41_1 {}
  class ca41_2 {}
  function fa41(a41: ca41_1 | ca41_2 | Number | String) {
    if( a41 instanceof ca41_1 ) console.log('ca41_1')
    if( a41 instanceof ca41_2 ) console.log('ca41_2')
    if( a41 instanceof Number ) console.log('Number')
    if( a41 instanceof String ) console.log('String')
  }
  fa41(new ca41_1())
  fa41(new ca41_2())
  fa41(1)
  fa41('fucking')

  interface ia43_1 {
    ma43_1() : string;
  }
  interface ia43_2 {
    ma43_2() : number;
  }
  function fa43(a43: ia43_1 | ia43_2) : void {   // 속성으로 있는지 없는지 확인하고 casting(assertion) 진행
    if( 'ma43_1' in a43 ){  //해당 이름의 프로퍼티가 있는지 확인
      (a43 as ia43_1).ma43_1();  //casting(assertion) 방법
    } else {
      (a43 as ia43_2).ma43_2();  //casting(assertion) 방법
    }
  }
  
  function fa44(a44: string | null) : number {  // null check :  string 문자열의 값이 존재하지 않을 경우 null
    if( a44 != null ) {
      return 1;
    } else {
      return 0;
    }
  }
  
  // Type Casting, Type Assertion
  //Typescript의 경우 type castion은 특별한 검사나 데이터 재구성을 하지 않기 때문에 Type Assertion 이라고 표현
  // Type Assertion은 <> 표기법과 as 연산자를 이용한 두 가지 방법이 있다
  let a45 : any;
  a45 = 1;
  let a45_1: string = <string>a45;  //! 이게 되면 안될텐데????
  console.log('a45_1 typeof : ', typeof a45_1 );
  console.log('a45_1 : ', a45_1);

  let a46 : any;
  a46 = 1;
  let a46_1: string = a46 as string;  //! 이게 되면 안될텐데??? 어쨋든 <> 방식보단 as 방식을 쓰는것을 권장
  console.log('a46_1 typeof : ', typeof a46_1 );
  console.log('a46_1 : ', a46_1);

  const a47 = 'hello world';
  // console.log( (a47 as number[]).push(123) );  //이렇게 안되는게 맞는건데...

  
}

myName("fuck");

// tsc app.ts -> app.js file create

function sayName(value: string) : string {
  if(typeof value === 'string') {
    return value;
  }else{
    return value; //이게 들어갈리가 없기 때문에 마우스를 올려보면 naver 반환을 나타냄
  }
}


function isEmpty(val: any) : boolean {
  if( val === null || val === undefined ){
    return true;
  }
  if( typeof val === 'string' ){
    if( val === '' ) return true;
  }
  if( val instanceof Array ) {
    if( val.length === 0 ) return true;
  }
  return false;
}