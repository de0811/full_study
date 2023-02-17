// Utill
function isEmpty(str) {
  return str == "" || str == undefined || str == null || str == "null";
}
function isNotEmpty(str) {
  return !isEmpty(str);
}

/**
  * TODO : img 버튼으로 만들지는... 아니 이런것도 해야하냐?
  * TODO : 속도 이슈 왜 나는지?
 */

class OneSlide {
  constructor(param) {
    this.init(param);
  }
  slide_cards = undefined;
  card_names = [];
  slides_btn_top = undefined;
  slides_btn_right = undefined;
  slides_btn_under = undefined;
  slides_btn_custom = undefined;
  slide_arrow_btn_left = undefined;
  slide_arrow_btn_right = undefined;
  slide_btn_play = undefined;
  slide_btn_pause = undefined;
  // slide를 감싸는 부모
  parent = "";
  timeId = undefined;
  // 현재 카드 이름
  curCardName = "";
  autoSlideSec = 3;
  changeSlideEventCallback = undefined;
  
  
  /*
  */
  

  // .c-one-slide
  slideCN = ".c-one-slide";
  cardCN = this.slideCN + "__l-card";
  // .c-one-slide__btn-list--top
  slidesBtnTopListCN = this.slideCN + "__btn-list--top";
  slidesBtnTopCN = this.slideCN + "__btn--top";
  // .c-one-slide__btn-list--right
  slidesBtnRightListCN = this.slideCN + "__btn-list--right";
  slidesBtnRightCN = this.slideCN + "__btn--right";
  // .c-one-slide__btn-list--under
  slidesBtnUnderListCN = this.slideCN + "__btn-list--under";
  // .c-one-slide__arrow-btn
  slidesBtnUnderCN = this.slideCN + "__btn--under";
  // .c-one-slide__btn-list--custom
  slidesBtnCustomListCN = this.slideCN + "__btn-list--custom";
  // .c-one-slide__btn--custom
  slidesBtnCustomCN = this.slideCN + "__btn--custom";

  // .c-one-slide__btn--play
  slideBtnPlayCN = this.slideCN + '__btn--play';
  // .c-one-slide__btn--pause
  slideBtnPauseCN = this.slideCN + '__btn--pause';

  // .c-one-slide__arrow-btn
  slideArrowBtnCN = this.slideCN + "__arrow-btn";
  left = ".left";
  right = ".right";
  // ".c-one-slide__arrow-btn.left";
  slideArrowBtnLeftCN = this.slideArrowBtnCN + this.left;
  // ".c-one-slide__arrow-btn.right";
  slideArrowBtnRightCN = this.slideArrowBtnCN + this.right;

  
  getSlideBtnListNm() {
    return this.slideCN + "\n" +
    this.slidesBtnTopListCN + '\n' +
    this.slidesBtnRightListCN + '\n' +
    this.slidesBtnUnderListCN + '\n' +
    this.slideArrowBtnCN;
  }

  init(param) {
    if (isNotEmpty(param) && "parent" in param) {
      this.parent = param.parent + " ";
    }
    if (isNotEmpty(param) && 'autoSlideSec' in param) {
      this.autoSlideSec = param.autoSlideSec;
    }
    if( isNotEmpty(param) && 'changeSlideEventCallback' in param ) {
      this.changeSlideEventCallback = param.changeSlideEventCallback;
    }
    let slide = document.querySelector(this.parent + this.slideCN);
    
    // TODO :각종 list들 모두 자동으로 추가 되도록 수정
    if( isNotEmpty(param) && 'isCreateBtnTop' in param && param.isCreateBtnTop ){
      let slidesBtnTopListElement = document.createElement('div');
      slidesBtnTopListElement.className = this.slidesBtnTopListCN.replaceAll('.', '');
      slide.appendChild(slidesBtnTopListElement);
    }
    if( isNotEmpty(param) && 'isCreateBtnRight' in param && param.isCreateBtnRight ){
      let slidesBtnRightListElement = document.createElement('div');
      slidesBtnRightListElement.className = this.slidesBtnRightListCN.replaceAll('.', '');
      slide.appendChild(slidesBtnRightListElement);
    }
    if( isNotEmpty(param) && 'isCreateBtnUnder' in param && param.isCreateBtnUnder ){
      let slidesBtnUnderListElement = document.createElement('div');
      slidesBtnUnderListElement.className = this.slidesBtnUnderListCN.replaceAll('.', '');
      slide.appendChild(slidesBtnUnderListElement);
    }
    if( isNotEmpty(param) && 'isCreateBtnArrow' in param && param.isCreateBtnArrow ){
      let leftElement = document.createElement("button");
      leftElement.className = this.slideArrowBtnLeftCN.replaceAll(".", " ");
      leftElement.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="M 19.41,20.09 14.83,15.5 19.41,10.91 18,9.5 l -6,6 6,6 z" fill="#fff"></path></svg>`;
      slide.appendChild(leftElement);
      
      let rightElement = document.createElement("button");
      rightElement.className = this.slideArrowBtnRightCN.replaceAll(".", " ");
      rightElement.innerHTML = `<svg height="100%" version="1.1" viewBox="0 0 32 32" width="100%"><path d="m 12.59,20.34 4.58,-4.59 -4.58,-4.59 1.41,-1.41 6,6 -6,6 z" fill="#fff"></path></svg>`;
      slide.appendChild(rightElement);
    }


    this.slide_cards = document.querySelectorAll(this.parent + this.cardCN);
    this.slides_btn_top = document.querySelector(this.parent + this.slidesBtnTopListCN);
    this.slides_btn_right = document.querySelector(this.parent + this.slidesBtnRightListCN);
    this.slides_btn_under = document.querySelector(this.parent + this.slidesBtnUnderListCN);
    this.slides_btn_custom = document.querySelector(this.parent + this.slidesBtnCustomListCN);

    this.card_names = this.#findCardNames(this.slide_cards);
    if (isNotEmpty(this.slides_btn_top)) {
      let slidesBtnTopTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnTopCN, true);
      this.slides_btn_top.innerHTML = slidesBtnTopTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_top,
        this.slidesBtnTopListCN
      );
    }
    if (isNotEmpty(this.slides_btn_right)) {
      let slidesBtnRightTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnRightCN, true);
      this.slides_btn_right.innerHTML = slidesBtnRightTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_right,
        this.slidesBtnRightListCN
      );
    }
    if (isNotEmpty(this.slides_btn_under)) {
      let slidesBtnUnderTxt = this.#createSlidesBtnCommonTxt(this.card_names, this.slidesBtnUnderCN, false);
      this.slides_btn_under.innerHTML = slidesBtnUnderTxt;
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_under,
        this.slidesBtnUnderListCN
      );
    }
    if( isNotEmpty(this.slides_btn_custom) ){
      this.#addSlidesBtnCommonEventListener(
        this.slides_btn_custom,
        this.slidesBtnCustomListCN
      )
    }

    // arrow
    this.slide_arrow_btn_left = document.querySelector(this.parent + this.slideArrowBtnLeftCN);
    this.slide_arrow_btn_right = document.querySelector(this.parent + this.slideArrowBtnRightCN);
    if( isNotEmpty(this.slide_arrow_btn_left) && isNotEmpty(this.slide_arrow_btn_right) ){
      this.#addSlidesBtnArrowEventListner();
    }
    
    this.slide_btn_play = document.querySelector( this.parent + this.slideBtnPlayCN );
    this.slide_btn_pause = document.querySelector( this.parent + this.slideBtnPauseCN );
    if( isNotEmpty(this.slide_btn_play) ) {
      this.#addSlidesBtnPlayEventListener(this.slide_btn_play);
    }
    if( isNotEmpty(this.slide_btn_pause) ) {
      this.#addSlidesBtnPuaseEventListener(this.slide_btn_pause);
    }

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

  #addSlidesBtnPlayEventListener(element) {
    element.addEventListener("click", (e) => {
      this.resetCardChange();
    });
  }
  #addSlidesBtnPuaseEventListener(element) {
    element.addEventListener("click", (e) => {
      this.puase();
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
    let slide_arrow_btn_left = document.querySelector(this.parent + this.slideArrowBtnLeftCN);
    slide_arrow_btn_left.addEventListener("click", (e) => {
      // self.resetCardChange();
      console.log(this);
      this.changeSlide(this.defaultBeforeCardName(this.curCardName));
    });
    let slide_arrow_btn_right = document.querySelector(this.parent + this.slideArrowBtnRightCN);
    slide_arrow_btn_right.addEventListener("click", (e) => {
      // self.resetCardChange();
      console.log(this);
      this.changeSlide(this.defaultNextCardName(this.curCardName));
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
  findCardNameCommonBtnElement(btnListNm, name) {
    let slides_btn_items = document.querySelectorAll(
      btnListNm
    );
    for (let i = 0; i < slides_btn_items.length; ++i) {
      if (
        slides_btn_items[i]
          .getAttribute("data-card-name")
          .toUpperCase() === name.toUpperCase()
      ) {
        return slides_btn_items[i];
      }
    }
    return undefined;
  }

  changeSlide(selectCardName) {
    if( isNotEmpty(this.changeSlideEventCallback) ){
      this.changeSlideEventCallback(this.curCardName, selectCardName);
    }
    if (isNotEmpty(this.curCardName)) {
      // let curCardEle = this.findCardNameCardElement(this.curCardName);
      let curCardEle = this.findCardNameCommonBtnElement(this.parent + this.cardCN, this.curCardName);
      // let curRightBtnEle = this.findCardNameRightBtnElement(this.curCardName);
      let curRightBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnRightCN, this.curCardName);
      // let curUnderBtnEle = this.findCardNameUnderBtnElement(this.curCardName);
      let curUnderBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnUnderCN, this.curCardName);
      // let curTopBtnEle = this.findCardNameTopBtnElement(this.curCardName);
      let curTopBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnTopCN, this.curCardName);
      let curCustomBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnCustomCN, this.curCardName);
      if( isNotEmpty(curCardEle) ) curCardEle.classList.remove("active");
      if( isNotEmpty(curRightBtnEle) ) curRightBtnEle.classList.remove("active");
      if( isNotEmpty(curUnderBtnEle) ) curUnderBtnEle.classList.remove("active");
      if( isNotEmpty(curTopBtnEle) ) curTopBtnEle.classList.remove('active');
      if( isNotEmpty(curCustomBtnEle) ) curCustomBtnEle.classList.remove('active');
    }

    if (isNotEmpty(selectCardName)) {
      // let selectCardEle = this.findCardNameCardElement(selectCardName);
      let selectCardEle = this.findCardNameCommonBtnElement(this.parent + this.cardCN, selectCardName);
      // let selectRightBtnEle = this.findCardNameRightBtnElement(selectCardName);
      let selectRightBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnRightCN, selectCardName);
      // let selectUnderBtnEle = this.findCardNameUnderBtnElement(selectCardName);
      let selectUnderBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnUnderCN, selectCardName);
      // let selectTopBtnEle = this.findCardNameTopBtnElement(selectCardName);
      let selectTopBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnTopCN, selectCardName);
      let selectCustomBtnEle = this.findCardNameCommonBtnElement(this.parent + this.slidesBtnCustomCN, selectCardName);
      console.log(selectCustomBtnEle);
      if( isNotEmpty(selectCardEle) ) selectCardEle.classList.add("active");
      if( isNotEmpty(selectRightBtnEle) ) selectRightBtnEle.classList.add("active");
      if( isNotEmpty(selectUnderBtnEle) ) selectUnderBtnEle.classList.add("active");
      if( isNotEmpty(selectTopBtnEle) ) selectTopBtnEle.classList.add('active');
      if( isNotEmpty(selectCustomBtnEle) ) selectCustomBtnEle.classList.add('active');
    }
    this.curCardName = selectCardName;
  }

  timeOutCardChange() {
    let nextCardName = this.defaultNextCardName(this.curCardName);
    this.changeSlide(nextCardName);
    this.timeId = setTimeout(this.timeOutCardChange.bind(this), this.autoSlideSec * 1000);
  }
  resetCardChange() {
    if (isNotEmpty(this.timeId)) {
      clearTimeout(this.timeId);
    }
    this.timeId = setTimeout(this.timeOutCardChange.bind(this), this.autoSlideSec * 1000);
  }
  puase() {
    if( isNotEmpty(this.timeId) ){
      clearTimeout(this.timeId);
    }
  }
}
