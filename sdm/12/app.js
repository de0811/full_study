function myName(name) {
    console.log(name);
    var aa;
    var a1;
    var a2;
    var a3;
    var a4; //이 타입을 쓸거면 차라리 union 타입을 쓰는걸 추천
    a4 = 0;
    a4 = 'aaa';
    var a5;
    var a6;
    var a7;
    var a8;
    var a9; //절대 반환하지 않는 함수에 사용(무한 반복되는 함수나 오류를 발생시키기 위해 존재하는 함수)
    // array, tuple 사용 방법은 조금 특별
    // array
    var a11 = [1, 2, 3, 4, 5];
    a11.push(22); //javascript의 Array.prototype.push() 동일 결과
    var a12 = ['별의 별걸 다 쓰네', 10, false, null];
    // 제네릭 배열  Array<Type>
    var a13 = ['제네릭 배열', '이걸 왜 쓴담'];
    var a14 = ["흐으음", 10];
    var a15 = ["흠냥", 11]; //타입을 참조할때는 타입 쿼리를 이용, 참조할 변수의 타입을 얻어와 타입을 지정 <- 대체 이게 무슨 말이야
    var a16 = [function () { return '문자반환함수'; }, function () { return '그냥 함수 주소값 넣는거지'; }];
    //tuple
    var a17 = ['key를 말하니?', 10]; //array union 처럼 생겼는데 이건 , <- 이걸로 구분하니까 잘 봐주자
    // let a18 : [string, number] = ['Typescript 2.6 이하 버전에선 정의된것보다 갯수가 많으면 이걸 배열로 봤다', 10, 100]; //이건 이제 에러지
    // Any와 유사함
    var a19 = {}; //실수로 이렇게 쓸수도 있겠지만 이건 any 타입보다 좁은 범위의 타입 이런건 쓰지말자
    var a20; //이건 정말 any 타입인데 const로는 이제 못쓰네?
    // union 타입
    var a10; //union 타입
    a10 = 10;
    a10 = 'ha...';
    var student = {
        name: 'aaaa',
        weight: 52
    };
    console.log(student);
    var teacher = {
        name: 'ccc'
        // ,
        // kind: 'fuck'
    };
    // 인스턴트 타입
    var citizen;
    citizen = {
        name: '시민',
        grade: 2
    };
    // 인스턴트 타입 생성과 정의
    var citizen01 = {
        name: '시민1',
        grade: 1
    };
    // 이후 값 지정
    var cat = {
        type: 'hoochu'
    };
    cat.age = 11;
    // 인덱스 시그니처 <- 이런걸 쓸 이유가 있나 ?
    var dog = {};
    dog.id = 2020222;
    // dog.id = '이건 안돼';
    dog.fuck = 123;
    // 열거형
    var Slass;
    (function (Slass) {
        Slass[Slass["Rock"] = 0] = "Rock";
        Slass[Slass["Scissors"] = 1] = "Scissors";
        Slass[Slass["Paper"] = 2] = "Paper";
    })(Slass || (Slass = {}));
    var Count;
    (function (Count) {
        Count[Count["Zero"] = 0] = "Zero";
        Count[Count["One"] = 1] = "One";
        Count[Count["Two"] = 2] = "Two";
        Count[Count["Three"] = 102] = "Three";
        Count[Count["Four"] = 103] = "Four";
        Count[Count["Five"] = 202] = "Five";
        Count[Count["six"] = 203] = "six"; //203
    })(Count || (Count = {}));
    var STR_COUNT;
    (function (STR_COUNT) {
        STR_COUNT["Zero"] = "ZERO";
        STR_COUNT["One"] = "ONE";
    })(STR_COUNT || (STR_COUNT = {}));
    var I_S_COUNT;
    (function (I_S_COUNT) {
        I_S_COUNT["ZERO"] = "ZERO";
        I_S_COUNT[I_S_COUNT["ONE"] = 1] = "ONE";
        I_S_COUNT[I_S_COUNT["TWO"] = 2] = "TWO"; //2
    })(I_S_COUNT || (I_S_COUNT = {}));
    /*
      * enum과 다르게 key-value의 관계가 양방향이 되지 않음
      * inlined 되기 때문에 코드가 가벼워지고 Tree-shaking 가능
      * inlined 되기 때문에 사실상 readonly와 같이 동작(수정 불가)
    */
    var CEnum = {
        RED: 1,
        BULE: 2
    };
    var a25 = 1;
    // let a25 = CEnum.RED;
    console.log(a25);
    var a21 = 3; // 정의 되지 않은 값 4 같은걸 넣을 시 에러
    var a22 = '쓸 수 있지';
    var a23 = { first: 1 };
    ; //인터페이스 리터널 유니온
    ;
    var a24 = { a: 10 };
    var a26 = { name: '제네릭 타입' };
    console.log(a26);
    function fa27(a27) {
        console.log(a27.name);
    }
    var a27_1 = { name: '이름이요', age: 26 };
    fa27(a27_1);
    var fa28 = function (x, y) {
        return x + y;
    };
    console.log('type 함수타입 ', fa28(1, 2));
    ;
    var fa29 = function (x, y) {
        return x + y;
    };
    console.log('interface 함수타입 ', fa29(1, 2));
    function fa30(pa30) {
        console.log(pa30);
    }
    var a30 = {
        name: '인터페이스의 유사한 유형을 나타냄',
        age: 10,
        gender: 'man'
    };
    fa30(a30);
    var a31 = {
        name: 'readonly로 선언한 것은 바뀔 수 없음'
    };
    // a31.name = 'readonly라 바뀌지 않고 에러';
    var a32 = ['읽기 전용 배열', '건들면 에러남'];
    var ca33 = /** @class */ (function () {
        function ca33() {
            this.name = '클래스 정의중';
            this.age = 10;
        }
        ca33.prototype.setAge = function (age) {
            this.age = age;
        };
        ca33.prototype.print = function () {
            console.log(this.name, this.age);
        };
        return ca33;
    }());
    var a33 = new ca33();
    var ca34 = /** @class */ (function () {
        // sas: number;
        // constructor(public age: number) {}
        function ca34(name, age, sas) {
            this.name = name;
            this.age = age;
            this.sas = sas;
        } //변수 생성 방법
        ca34.prototype.setAge = function (age) {
            this.age = age;
        };
        ca34.prototype.print = function () {
            console.log(this);
        };
        return ca34;
    }());
    // let a34 = new ca34("hi", 10);
    var a34 = new ca34('interface -> + class', 10, 2);
    a34.print();
    var ca35 = /** @class */ (function () {
        function ca35(name, age, sas, art) {
            this.name = name;
            this.age = age;
            this.sas = sas;
            this.art = art;
        } //변수 생성 방법
        ca35.prototype.setAge = function (age) {
            this.age = age;
        };
        ca35.prototype.print = function () {
            console.log(this);
        };
        return ca35;
    }());
    var a35 = new ca35('interface -> + interface 상속', 12, 123, '흐으음');
    a35.print();
    var a37 = {
        name: 'type + type 타입의 확장, 새로운 타입을 정의 할 수 있음',
        age: 20
    };
    var a38 = {
        name: 'interface + type 도 가능하다',
        age: 38
    };
    function fa39(a39) {
        console.log(a39.name); //쓸 수 있는게 공통적으로 name이라서 이것 하나 밖에 사용할 수 없음
    }
    /***********************************************************************************/
    // 원시 타입 식별
    function fa40(input1, input2) {
        if (typeof input1 === 'number') {
            console.log('input1 : number Type');
        }
        else if (typeof input1 === 'string') {
            console.log('input1 : string Type');
        }
        else {
            console.log('input1 : other Type');
        }
        if (typeof input2 === 'number') {
            console.log('input2 : string Type');
        }
        else if (typeof input2 === 'string') {
            console.log('input2 : string Type');
        }
        else {
            console.log('input2 : other Type');
        }
    }
    fa40(40, 'fuck');
    console.log(typeof 44, typeof 'string', typeof null, typeof undefined);
    //클래스 객체 식별
    var ca41_1 = /** @class */ (function () {
        function ca41_1() {
        }
        return ca41_1;
    }());
    var ca41_2 = /** @class */ (function () {
        function ca41_2() {
        }
        return ca41_2;
    }());
    function fa41(a41) {
        if (a41 instanceof ca41_1)
            console.log('ca41_1');
        if (a41 instanceof ca41_2)
            console.log('ca41_2');
        if (a41 instanceof Number)
            console.log('Number');
        if (a41 instanceof String)
            console.log('String');
    }
    fa41(new ca41_1());
    fa41(new ca41_2());
    fa41(1);
    fa41('fucking');
    function fa43(a43) {
        if ('ma43_1' in a43) { //해당 이름의 프로퍼티가 있는지 확인
            a43.ma43_1(); //casting(assertion) 방법
        }
        else {
            a43.ma43_2(); //casting(assertion) 방법
        }
    }
    function fa44(a44) {
        if (a44 != null) {
            return 1;
        }
        else {
            return 0;
        }
    }
    // Type Casting, Type Assertion
    //Typescript의 경우 type castion은 특별한 검사나 데이터 재구성을 하지 않기 때문에 Type Assertion 이라고 표현
    // Type Assertion은 <> 표기법과 as 연산자를 이용한 두 가지 방법이 있다
    var a45;
    a45 = 1;
    var a45_1 = a45; //! 이게 되면 안될텐데????
    console.log('a45_1 typeof : ', typeof a45_1);
    console.log('a45_1 : ', a45_1);
    var a46;
    a46 = 1;
    var a46_1 = a46; //! 이게 되면 안될텐데??? 어쨋든 <> 방식보단 as 방식을 쓰는것을 권장
    console.log('a46_1 typeof : ', typeof a46_1);
    console.log('a46_1 : ', a46_1);
    var a47 = 'hello world';
    console.log(a47.push(123));
}
myName("fuck");
// tsc app.ts -> app.js file create
function sayName(value) {
    if (typeof value === 'string') {
        return value;
    }
    else {
        return value; //이게 들어갈리가 없기 때문에 마우스를 올려보면 naver 반환을 나타냄
    }
}
