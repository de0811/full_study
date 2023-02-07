// Utill
function isEmpty(str) {
  return str == "" || str == undefined || str == null || str == "null";
}
function isNotEmpty(str) {
  return !isEmpty(str);
}

class Slide {
  constructor() {
    this.init();
  }
  slide_cards = document.querySelectorAll(".slide-card");
  card_names = [];
  slides_btn_right = document.querySelector(".slides-btn-right");
  slides_btn_under = document.querySelector(".slides-btn-under");
  slide_arrow_btn_left = document.querySelector(".slide-arrow-btn.left");
  slide_arrow_btn_right = document.querySelector(".slide-arrow-btn.right");

  init() {
    this.card_names = this.#findCardNames(this.slide_cards);
    let slidesBtnRightTxt = this.#createSlidesBtnRightTxt(this.card_names);
    this.slides_btn_right.innerHTML = slidesBtnRightTxt;
    let slidesBtnUnderTxt = this.#createSlidesBtnUnderTxt(this.card_names);
    this.slides_btn_under.innerHTML = slidesBtnUnderTxt;

    this.#addSlidesBtnRightEventListener();
    this.#addSlidesBtnUnderEventListner();
    this.#addSlidesBtnArrowEventListner();
    this.curCardName = this.card_names[this.card_names.length - 1];
  }
  timeId = undefined;
  run() {
    this.resetCardChange();
  }

  #findCardNames(slide_cards) {
    let card_names = [];
    for (let idx = 0; idx < slide_cards.length; ++idx) {
      card_names.push(slide_cards[idx].getAttribute("data-card-name"));
    }
    return card_names;
  }

  //create Right Btn
  #createSlidesBtnRightTxt(card_names) {
    let result = ``;
    for (let i = 0; i < card_names.length; ++i) {
      result +=
        `<button class="slides-btn-right-item" data-card-name="` +
        card_names[i] +
        `">` +
        card_names[i] +
        `</button>`;
    }
    return result;
  }
  #addSlidesBtnRightEventListener() {
    this.slides_btn_right.addEventListener("click", (e) => {
      let selectCardName = "";
      for (
        let target = e.target;
        !target.classList.contains("slides-btn-right");
        target = target.parentElement
      ) {
        if (isNotEmpty(target.getAttribute("data-card-name"))) {
          selectCardName = target.getAttribute("data-card-name");
          break;
        }
      }
      if (isNotEmpty(selectCardName)) {
        this.resetCardChange();
        this.changeSlide(selectCardName);
      }
    });
  }

  //create Under Btn
  #createSlidesBtnUnderTxt(card_names) {
    //create slides btn under
    let result = ``;
    for (let i = 0; i < card_names.length; ++i) {
      result +=
        `<button class="slides-btn-under-item" data-card-name="` +
        card_names[i] +
        `"></button>`;
    }
    return result;
  }
  #addSlidesBtnUnderEventListner() {
    //add Click Event
    this.slides_btn_under.addEventListener("click", (e) => {
      let selectCardName = "";
      for (
        let target = e.target;
        !target.classList.contains("slides-btn-under");
        target = target.parentElement
      ) {
        if (isNotEmpty(target.getAttribute("data-card-name"))) {
          selectCardName = target.getAttribute("data-card-name");
          break;
        }
      }
      if (isNotEmpty(selectCardName)) {
        this.resetCardChange();
        this.changeSlide(selectCardName);
      }
    });
  }
  // < > btn
  #addSlidesBtnArrowEventListner() {
    //add Click Event
    let slide_arrow_btn_left = document.querySelector(".slide-arrow-btn.left");
    slide_arrow_btn_left.addEventListener("click", (e) => {
      this.resetCardChange();
      this.changeSlide(defaultBeforeCardName(this.curCardName));
    });
    let slide_arrow_btn_right = document.querySelector(
      ".slide-arrow-btn.right"
    );
    slide_arrow_btn_right.addEventListener("click", (e) => {
      this.resetCardChange();
      this.changeSlide(this.defaultNextCardName(this.curCardName));
    });
  }

  defaultBeforeCardName(curCardName) {
    curCardName = curCardName.toUpperCase();
    let beforeCardName = "";

    for (let i = 0; i < this.card_names.length; ++i) {
      if (this.card_names[i].toUpperCase() === curCardName) {
        if (i === 0) {
          beforeCardName = this.card_names[this.card_names.lenth - 1];
        } else {
          beforeCardName = this.card_names[i - 1];
        }
        break;
      }
    }
    return beforeCardName;
  }
  defaultNextCardName(curCardName) {
    if (isEmpty(curCardName)) {
      return null;
    }
    curCardName = curCardName.toUpperCase();
    let nextCardName = "";

    for (let i = 0; i < this.card_names.length; ++i) {
      if (this.card_names[i].toUpperCase() === curCardName) {
        if (i === this.card_names.length - 1) {
          nextCardName = this.card_names[0];
        } else {
          nextCardName = this.card_names[i + 1];
        }
        break;
      }
    }
    return nextCardName;
  }

  //find card name element
  findCardNameRightBtnElement(name) {
    let slides_btn_right_items = document.querySelectorAll(
      ".slides-btn-right-item"
    );
    for (let i = 0; i < slides_btn_right_items.length; ++i) {
      if (
        slides_btn_right_items[i]
          .getAttribute("data-card-name")
          .toUpperCase() === name.toUpperCase()
      ) {
        return slides_btn_right_items[i];
      }
    }
    return undefined;
  }
  //find card name element
  findCardNameUnderBtnElement(name) {
    let slides_btn_right_items = document.querySelectorAll(
      ".slides-btn-under-item"
    );
    for (let i = 0; i < slides_btn_right_items.length; ++i) {
      if (
        slides_btn_right_items[i]
          .getAttribute("data-card-name")
          .toUpperCase() === name.toUpperCase()
      ) {
        return slides_btn_right_items[i];
      }
    }
    return undefined;
  }
  //find card name element
  findCardNameCardElement(name) {
    let slide_cards = document.querySelectorAll(".slide-card");
    for (let i = 0; i < slide_cards.length; ++i) {
      if (
        slide_cards[i].getAttribute("data-card-name").toUpperCase() ===
        name.toUpperCase()
      ) {
        return slide_cards[i];
      }
    }
    return undefined;
  }

  changeSlide(selectCardName) {
    if (isNotEmpty(this.curCardName)) {
      let curCardEle = this.findCardNameCardElement(this.curCardName);
      let curRightBtnEle = this.findCardNameRightBtnElement(this.curCardName);
      let curUnderBtnEle = this.findCardNameUnderBtnElement(this.curCardName);
      curCardEle.classList.remove("active");
      curRightBtnEle.classList.remove("active");
      curUnderBtnEle.classList.remove("active");
    }

    if (isNotEmpty(selectCardName)) {
      let selectCardEle = this.findCardNameCardElement(selectCardName);
      let selectRightBtnEle = this.findCardNameRightBtnElement(selectCardName);
      let selectUnderBtnEle = this.findCardNameUnderBtnElement(selectCardName);
      selectCardEle.classList.add("active");
      selectRightBtnEle.classList.add("active");
      selectUnderBtnEle.classList.add("active");
    }
    this.curCardName = selectCardName;
  }

  timeOutCardChange() {
    console.log(this)
    let nextCardName = this.defaultNextCardName(this.curCardName);
    this.timeId = setTimeout(this.timeOutCardChange.bind(this), 3000);
    this.changeSlide(nextCardName);
  }
  resetCardChange() {
    if (isNotEmpty(this.timeId)) {
      clearTimeout(this.timeId);
    }
    this.timeOutCardChange();
  }
}

// (() => {
// let slide_cards = document.querySelectorAll(".slide-card");
// let card_names = [];
// for (let idx = 0; idx < slide_cards.length; ++idx) {
//   card_names.push(slide_cards[idx].getAttribute("data-card-name"));
// }

// let slides_btn_right = document.querySelector(".slides-btn-right");
// //create slides btn right
// createSlidesBtnRightTxt = (card_names) => {
//   let result = ``;
//   for (let i = 0; i < card_names.length; ++i) {
//     result +=
//       `<button class="slides-btn-right-item" data-card-name="` +
//       card_names[i] +
//       `">` +
//       card_names[i] +
//       `</button>`;
//   }
//   return result;
// };
// let slidesBtnRightTxt = createSlidesBtnRightTxt(card_names);
// slides_btn_right.innerHTML = slidesBtnRightTxt;
// //add Click Event
// let curCardName = "";
// slides_btn_right.addEventListener("click", (e) => {
//   let selectCardName = "";
//   for (
//     let target = e.target;
//     !target.classList.contains("slides-btn-right");
//     target = target.parentElement
//   ) {
//     if (isNotEmpty(target.getAttribute("data-card-name"))) {
//       selectCardName = target.getAttribute("data-card-name");
//       break;
//     }
//   }
//   if (isNotEmpty(selectCardName)) {
//     resetCardChange();
//     changeSlide(selectCardName);
//   }
// });

// function defaultBeforeCardName(curCardName) {
//   curCardName = curCardName.toUpperCase();
//   let beforeCardName = "";

//   for (let i = 0; i < card_names.length; ++i) {
//     if (card_names[i].toUpperCase() === curCardName) {
//       if (i === 0) {
//         beforeCardName = card_names[card_names.lenth - 1];
//       } else {
//         beforeCardName = card_names[i - 1];
//       }
//       break;
//     }
//   }
//   return beforeCardName;
// }
// function defaultNextCardName(curCardName) {
//   if( isEmpty(curCardName) ){
//     return null;
//   }
//   curCardName = curCardName.toUpperCase();
//   let nextCardName = "";

//   for (let i = 0; i < card_names.length; ++i) {
//     if (card_names[i].toUpperCase() === curCardName) {
//       if (i === card_names.length - 1) {
//         nextCardName = card_names[0];
//       } else {
//         nextCardName = card_names[i + 1];
//       }
//       break;
//     }
//   }
//   return nextCardName;
// }

// function changeSlide(selectCardName) {
//   if( isNotEmpty(curCardName) ) {
//     let curCardEle = findCardNameCardElement(curCardName);
//     let curRightBtnEle = findCardNameRightBtnElement(curCardName);
//     let curUnderBtnEle = findCardNameUnderBtnElement(curCardName);
//     curCardEle.classList.remove("active");
//     curRightBtnEle.classList.remove("active");
//     curUnderBtnEle.classList.remove("active");
//   }

//   if( isNotEmpty(selectCardName) ) {
//     let selectCardEle = findCardNameCardElement(selectCardName);
//     let selectRightBtnEle = findCardNameRightBtnElement(selectCardName);
//     let selectUnderBtnEle = findCardNameUnderBtnElement(selectCardName);
//     selectCardEle.classList.add("active");
//     selectRightBtnEle.classList.add("active");
//     selectUnderBtnEle.classList.add("active");
//   }
//   curCardName = selectCardName;
// }

// let slides_btn_under = document.querySelector(".slides-btn-under");
// //create slides btn under
// createSlidesBtnUnderTxt = (card_names) => {
//   let result = ``;
//   for (let i = 0; i < card_names.length; ++i) {
//     result +=
//       `<button class="slides-btn-under-item" data-card-name="` +
//       card_names[i] +
//       `"></button>`;
//   }
//   return result;
// };
// let slidesBtnUnderTxt = createSlidesBtnUnderTxt(card_names);
// slides_btn_under.innerHTML = slidesBtnUnderTxt;

// //add Click Event
// slides_btn_under.addEventListener("click", (e) => {
//   let selectCardName = "";
//   for (
//     let target = e.target;
//     !target.classList.contains("slides-btn-under");
//     target = target.parentElement
//   ) {
//     if (isNotEmpty(target.getAttribute("data-card-name"))) {
//       selectCardName = target.getAttribute("data-card-name");
//       break;
//     }
//   }
//   if (isNotEmpty(selectCardName)) {
//     resetCardChange();
//     changeSlide(selectCardName);
//   }
// });

// //add Click Event
// let slide_arrow_btn_left = document.querySelector('.slide-arrow-btn.left');
// slide_arrow_btn_left.addEventListener("click", (e) => {
//   resetCardChange();
//   changeSlide(defaultBeforeCardName(curCardName));
// })
// let slide_arrow_btn_right = document.querySelector('.slide-arrow-btn.right');
// slide_arrow_btn_right.addEventListener("click", (e) => {
//   resetCardChange();
//   changeSlide(defaultNextCardName(curCardName));
// })

// //find card name element
// function findCardNameRightBtnElement(name) {
//   let slides_btn_right_items = document.querySelectorAll(
//     ".slides-btn-right-item"
//   );
//   for (let i = 0; i < slides_btn_right_items.length; ++i) {
//     if (
//       slides_btn_right_items[i].getAttribute("data-card-name").toUpperCase() ===
//       name.toUpperCase()
//     ) {
//       return slides_btn_right_items[i];
//     }
//   }
//   return undefined;
// }
// //find card name element
// function findCardNameUnderBtnElement(name) {
//   let slides_btn_right_items = document.querySelectorAll(
//     ".slides-btn-under-item"
//   );
//   for (let i = 0; i < slides_btn_right_items.length; ++i) {
//     if (
//       slides_btn_right_items[i].getAttribute("data-card-name").toUpperCase() ===
//       name.toUpperCase()
//     ) {
//       return slides_btn_right_items[i];
//     }
//   }
//   return undefined;
// }
// //find card name element
// function findCardNameCardElement(name) {
//   let slide_cards = document.querySelectorAll(".slide-card");
//   for (let i = 0; i < slide_cards.length; ++i) {
//     if (
//       slide_cards[i].getAttribute("data-card-name").toUpperCase() ===
//       name.toUpperCase()
//     ) {
//       return slide_cards[i];
//     }
//   }
//   return undefined;
// }

// // init
// curCardName = card_names[card_names.length - 1];
// //run
// let timeId;
// function timeOutCardChange() {
//   nextCardName = defaultNextCardName(curCardName);
//   timeId = setTimeout(timeOutCardChange, 3000);
//   changeSlide(nextCardName);
// }
// function resetCardChange() {
//   if( isNotEmpty(timeId) ) {
//     clearTimeout(timeId);
//   }
//   timeOutCardChange();
// }
// resetCardChange();
// })();
