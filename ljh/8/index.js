// 슬라이드 쇼 관리 변수
var slideIndex = 0;
var slides = document.querySelectorAll("#slideshow div");
var navButtons = document.querySelectorAll("#slideshow .nav-button");
var navAutoButton = document.querySelector("#slideshow .nav-automatic");
var prevButton = document.querySelector("#slideshow .prevbtn");
var nextButton = document.querySelector("#slideshow .nextbtn");
var slideInterval;

// let child = document.getElementById("slideshow").childNodes
// for(var i = 0; i < child.length; i++) {
//   if(child[i].nodeName.toLowerCase() == "nav") {
//     for (var i = 0; i < slides.length; i++) {
//       child[i].appendChild = "<button class='nav-button' data-slide="+(i+1)+">"+(i+1)+"</button>";
//     }
//   }
// }

for (var i = 0; i < slides.length; i++) {
  if (slides[i].getAttribute("class") == "active") {
    slideIndex = i;
    if (slideIndex - 1 < 0) {
      slides[slides.length - 1].classList.add("prev");
      slides[slideIndex].classList.add("active");
      slides[slideIndex + 1].classList.add("next");
    } else if (slideIndex + 1 == slides.length) {
      slides[slideIndex - 1].classList.add("prev");
      slides[slideIndex].classList.add("active");
      slides[0].classList.add("next");
    } else {
      slides[slideIndex - 1].classList.add("prev");
      slides[slideIndex].classList.add("active");
      slides[slideIndex + 1].classList.add("next");
    }
    // 현재 네비게이션 버튼 활성화
    navButtons[slideIndex].classList.add("active");
    break;
  }
}

// 슬라이드 쇼 시작 함수
function startSlideShow() {
  slideInterval = setInterval(function () {
    moveToSlide(slideIndex + 1);
  }, 2000);
}

// 슬라이드 멈춤 함수
function stopSlideShow() {
  clearInterval(slideInterval);
}

// 슬라이드 이동 함수
function moveToSlide(n) {
  // 모든 슬라이드 숨기기
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove("prev");
    slides[i].classList.remove("active");
    slides[i].classList.remove("next");
  }
  // 모든 네비게이션 버튼 비활성화
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove("active");
  }
  // 슬라이드 인덱스 변경
  slideIndex = (n + slides.length) % slides.length;

  // 현재 슬라이드 활성화
  if (slideIndex - 1 < 0) {
    slides[slides.length - 1].classList.add("prev");
    slides[slideIndex].classList.add("active");
    slides[slideIndex + 1].classList.add("next");
  } else if (slideIndex + 1 == slides.length) {
    slides[slideIndex - 1].classList.add("prev");
    slides[slideIndex].classList.add("active");
    slides[0].classList.add("next");
  } else {
    slides[slideIndex - 1].classList.add("prev");
    slides[slideIndex].classList.add("active");
    slides[slideIndex + 1].classList.add("next");
  }
  // 현재 네비게이션 버튼 활성화
  navButtons[slideIndex].classList.add("active");
}

// 이전 슬라이드 이동 함수
function movePrev() {
  moveToSlide(slideIndex - 1);
}

// 다음 슬라이드 이동 함수
function moveNext() {
  moveToSlide(slideIndex + 1);
}

// 초기화
startSlideShow();

// 이벤트 핸들러 등록
prevButton.addEventListener("click", function () {
  stopSlideShow();
  movePrev();
  slideInterval = 0;
});
nextButton.addEventListener("click", function () {
  stopSlideShow();
  moveNext();
  slideInterval = 0;
});
for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener("click", function () {
    stopSlideShow();
    moveToSlide(parseInt(this.dataset.slide - 1));
    slideInterval = 0;
  });
}
for (var i = 0; i < slides.length; i++) {
  slides[i].addEventListener("click", function () {
    if (slideInterval != 0) {
      stopSlideShow();
      slideInterval = 0;
      navAutoButton.classList.remove("play");
      navAutoButton.classList.add("stop");
    } else {
      startSlideShow();
      navAutoButton.classList.remove("stop");
      navAutoButton.classList.add("play");
    }
  });
}
navAutoButton.addEventListener("click", function () {
  if (slideInterval != 0) {
    stopSlideShow();
    slideInterval = 0;
    navAutoButton.classList.remove("play");
    navAutoButton.classList.add("stop");
  } else {
    startSlideShow();
    navAutoButton.classList.remove("stop");
    navAutoButton.classList.add("play");
  }
});
