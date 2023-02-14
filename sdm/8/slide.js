// Utill
function isEmpty(str) {
  return str == "" || str == undefined || str == null || str == "null";
}
function isNotEmpty(str) {
  return !isEmpty(str);
}

/**
 * TODO : img 버튼으로 만들지는... 아니 이런것도 해야하냐?
 * TODO :각종 list들 모두 자동으로 추가 되도록 수정
 */

class Slide {
  constructor(param) {
    this.init(param);
  }
  slide_cards = undefined;
  card_names = [];
  slides_btn_top = undefined;
  slides_btn_right = undefined;
  slides_btn_under = undefined;
  slide_arrow_btn_left = undefined;
  slide_arrow_btn_right = undefined;
  // slide를 감싸는 부모
  parent = "";
  timeId = undefined;
  // 현재 카드 이름
  curCardName = "";

  slideCN = ".c-slide";
  cardCN = this.slideCN + "__l-card";
  slidesBtnTopListCN = this.slideCN + "__btn-list--top";
  slidesBtnTopCN = this.slideCN + "__btn--top";
  slidesBtnRightListCN = this.slideCN + "__btn-list--right";
  slidesBtnRightCN = this.slideCN + "__btn--right";
  slidesBtnUnderListCN = this.slideCN + "__btn-list--under";
  slidesBtnUnderCN = this.slideCN + "__btn--under";
  slideArrowBtnCN = this.slideCN + "__arrow-btn";
  left = ".left";
  right = ".right";
  // slideArrowBtnLeftCN = ".c-slide__arrow-btn.left";
  slideArrowBtnLeftCN = this.slideArrowBtnCN + this.left;
  // slideArrowBtnRightCN = ".c-slide__arrow-btn.right";
  slideArrowBtnRightCN = this.slideArrowBtnCN + this.right;

  init(param) {
    if (isNotEmpty(param) && "parent" in param) {
      this.parent = param.parent + " ";
    }
    
    // TODO :각종 list들 모두 자동으로 추가 되도록 수정
    // let slidesBtnRightListElement = document.createElement('div');


    this.slide_cards = document.querySelectorAll(this.parent + this.cardCN);
    this.slides_btn_top = document.querySelector(this.parent + this.slidesBtnTopListCN);
    this.slides_btn_right = document.querySelector(this.parent + this.slidesBtnRightListCN);
    this.slides_btn_under = document.querySelector(this.parent + this.slidesBtnUnderListCN);

    this.card_names = this.#findCardNames(this.slide_cards);
    if (isNotEmpty(this.slides_btn_top)) {
      // let slidesBtnTopTxt = this.#createSlidesBtnTopTxt(this.card_names);
      let slidesBtnTopTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnTopCN, false);
      this.slides_btn_top.innerHTML = slidesBtnTopTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_top,
        this.slidesBtnTopListCN
      );
    }
    if (isNotEmpty(this.slides_btn_right)) {
      // let slidesBtnRightTxt = this.#createSlidesBtnRightTxt(this.card_names);
      let slidesBtnRightTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnRightCN, true);
      this.slides_btn_right.innerHTML = slidesBtnRightTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_right,
        this.slidesBtnRightListCN
      );
    }
    if (isNotEmpty(this.slides_btn_under)) {
      // let slidesBtnUnderTxt = this.#createSlidesBtnUnderTxt(this.card_names);
      let slidesBtnUnderTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnUnderCN, false);
      this.slides_btn_under.innerHTML = slidesBtnUnderTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_under,
        this.slidesBtnUnderListCN
      );
    }

    // arrow left
    let slide = document.querySelector(this.parent + this.slideCN);
    let leftElement = document.createElement("button");
    leftElement.className = this.slideArrowBtnLeftCN.replaceAll(".", " ");
    leftElement.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="M 19.41,20.09 14.83,15.5 19.41,10.91 18,9.5 l -6,6 6,6 z" fill="#fff"></path></svg>`;
    slide.appendChild(leftElement);

    this.slide_arrow_btn_left = document.querySelector(
      this.parent + this.slideArrowBtnLeftCN
    );

    // arrow right
    let rightElement = document.createElement("button");
    rightElement.className = this.slideArrowBtnRightCN.replaceAll(".", " ");
    rightElement.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="m 12.59,20.34 4.58,-4.59 -4.58,-4.59 1.41,-1.41 6,6 -6,6 z" fill="#fff"></path></svg>`;
    slide.appendChild(rightElement);

    this.slide_arrow_btn_right = document.querySelector(
      this.parent + this.slideArrowBtnRightCN
    );

    this.#addSlidesBtnArrowEventListner();

    this.curCardName = this.card_names[this.card_names.length - 1];
  }
  run() {
    this.timeOutCardChange();
  }

  #findCardNames(slide_cards) {
    let card_names = [];
    for (let idx = 0; idx < slide_cards.length; ++idx) {
      card_names.push(slide_cards[idx].getAttribute("data-card-name"));
    }
    return card_names;
  }

  #addSlidesBtnCommonEventListener(element, limitClassName) {
    element.addEventListener("click", (e) => {
      let selectCardName = "";
      for (
        let target = e.target;
        isNotEmpty(target) && !target.classList.contains(limitClassName);
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
  
  //create Common Btn
  #createSlidesBtnCommonTxt(card_names, itemCN, isTextInject) {
    let result = ``;
    for (let i = 0; i < card_names.length; ++i) {
      result +=
        `<button class="` + itemCN.replace('.', '') + `" data-card-name="` +
        card_names[i] +
        `">` +
        (isTextInject ? card_names[i] : '') +
        `</button>`;
    }
    return result;
  }

  // < > btn
  #addSlidesBtnArrowEventListner() {
    let self = this;
    //add Click Event
    let slide_arrow_btn_left = document.querySelector(
      ".c-slide__arrow-btn.left"
    );
    slide_arrow_btn_left.addEventListener("click", (e) => {
      self.resetCardChange();
      self.changeSlide(self.defaultBeforeCardName(self.curCardName));
    });
    let slide_arrow_btn_right = document.querySelector(
      ".c-slide__arrow-btn.right"
    );
    slide_arrow_btn_right.addEventListener("click", (e) => {
      self.resetCardChange();
      self.changeSlide(self.defaultNextCardName(self.curCardName));
    });
  }

  defaultBeforeCardName(curCardName) {
    curCardName = curCardName.toUpperCase();
    let beforeCardName = "";

    for (let i = 0; i < this.card_names.length; ++i) {
      if (this.card_names[i].toUpperCase() === curCardName) {
        if (i === 0) {
          beforeCardName = this.card_names[this.card_names.length - 1];
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
      this.slidesBtnRightCN
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
      this.slidesBtnUnderCN
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
    let slide_cards = document.querySelectorAll(".c-slide__l-card");
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
    let nextCardName = this.defaultNextCardName(this.curCardName);
    this.changeSlide(nextCardName);
    this.timeId = setTimeout(this.timeOutCardChange.bind(this), 3000);
  }
  resetCardChange() {
    if (isNotEmpty(this.timeId)) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(this.timeOutCardChange.bind(this), 3000);
  }
}
