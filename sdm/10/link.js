// Utill
function isEmpty(str) {
  return str == "" || str == undefined || str == null || str == "null";
}
function isNotEmpty(str) {
  return !isEmpty(str);
}

// TODO : Event 종류 선택할 수 있도록 수정
// TODO : 토글 되는 class 이름 설정할 수 있도록 수정
// 
/*example
const linkEvent = new LinkEvent({
     links: ['.c-card--nav', '.c-card-short'] ,
     eventOnNm: 'mouseover',
     eventOffNm: 'mouseout',
     classToggleNm: 'on'
    });
*/

class LinkEvent {
  constructor(param) {
    this.init(param);
  }
  links = [];
  curLink = null;
  dataNm = 'data-link-name'
  eventOnNm = 'mouseover';
  eventOffNm = 'mouseout';
  classToggleNm = 'on';

  init(param) {
    
    if (isNotEmpty(param) && "dataNm" in param) {
      this.dataNm = param.dataNm;
    }
    if (isNotEmpty(param) && "eventOnNm" in param) {
      this.eventOnNm = param.eventOnNm;
    }
    if (isNotEmpty(param) && "eventOffNm" in param) {
      this.eventOffNm = param.eventOffNm;
    }
    if (isNotEmpty(param) && "classToggleNm" in param) {
      this.classToggleNm = param.classToggleNm;
    }

    if (isNotEmpty(param) && "links" in param) {
      for(let i = 0; i < param.links.length; ++i){
        let navCards = document.querySelectorAll(param.links[i]);
        for (let idx = 0; idx < navCards.length; ++idx) {
          let linkNm = navCards[idx].getAttribute(this.dataNm);
          if (linkNm !== null) {
            this.addLink(this.links, linkNm, navCards[idx]);
          }
        }  
      }
    }


    this.addEventHandlerLinks(this.links);
  }

  addLink(links, name, addItem) {
    let link = this.findLink(links, name);
    if (link === null || link === undefined) {
      links.push({ name: name, items: [] });
      link = this.findLink(links, name);
    }
    link.items.push(addItem);
    return link;
  }

  findLink(links, name) {
    for (let i = 0; i < links.length; ++i) {
      if (links[i].name.toUpperCase() === name.toUpperCase()) {
        return links[i];
      }
    }
    return null;
  }

  addEventHandlerLinks(links) {
    for (let idx = 0; idx < links.length; ++idx) {
      let link = links[idx];

      for (let i = 0; i < link.items.length; ++i) {
        link.items[i].addEventListener(this.eventOnNm, () => {
          if (this.curLink !== null) {
            this.toggleClass(this.curLink.items, this.classToggleNm);
          }
          this.toggleClass(link.items, this.classToggleNm);
          this.curLink = link;
        });
        link.items[i].addEventListener(this.eventOffNm, () => {
          if (this.curLink !== null) {
            this.toggleClass(this.curLink.items, this.classToggleNm);
          }
          this.curLink = null;
        });
      }
    }
  }

  toggleClass(items, classNm) {
    for (let k = 0; k < items.length; ++k) {
      items[k].classList.toggle(classNm);
    }
  }
}

  