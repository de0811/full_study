class TopBtn {
  constructor(param) {
    this.init(param);
  }
  init(param) {
    if (isNotEmpty(param) && "topBtnSelectNm" in param) {
      this.topBtnSelectNm = param.topBtnSelectNm;
    }

    let topBtn = document.querySelector(this.topBtnSelectNm);
    if (isNotEmpty(topBtn)) {
      // ! 시작 할땐 무조건 display:none; 으로 설정해야 잠깐이라도 뜨는 모습이 없음
      // ! 또한 효과를 만들기 위해선 block 으로 변경 필요
      topBtn.style.display = "block";
      this.autoVisible();
      window.addEventListener("scroll", () => {
        this.autoVisible();
      });

      topBtn.addEventListener("click", () => {
        document.documentElement.style.scrollBehavior = "smooth";
        window.scrollTo(0, 0);
      });
    }
  }
  topBtnSelectNm = ".c-top-btn";
  autoVisible() {
    let topBtn = document.querySelector(this.topBtnSelectNm);
    if (isNotEmpty(topBtn)) {
      if (window.scrollY !== 0) {
        topBtn.style.visibility = "visible";
        topBtn.style.opacity = 1;
      } else {
        topBtn.style.opacity = 0;
        topBtn.style.visibility = "hidden";
      }
    }
  }
}
