// Utill
function isEmpty(str) {
  return str == "" || str == undefined || str == null || str == "null";
}
function isNotEmpty(str) {
  return !isEmpty(str);
}

// TODO : Event 종류 선택할 수 있도록 수정
// TODO : 'data-link-name' 이 아니라 다른 것도 링크 가능하게 수정
// TODO : 토글 되는 class 이름 설정할 수 있도록 수정

class LinkEvent {
  constructor(param) {
    this.init(param);
  }
  links = [];
  curLink = null;

  // const linkEvent = new LinkEvent({ links: ['.c-card--nav', '.c-card-short'] });
  init(param) {
    
    if (isNotEmpty(param) && "links" in param) {
      for(let i = 0; i < param.links.length; ++i){
        let navCards = document.querySelectorAll(param.links[i]);
        for (let idx = 0; idx < navCards.length; ++idx) {
          let linkNm = navCards[idx].getAttribute("data-link-name");
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
        link.items[i].addEventListener("mouseover", () => {
          if (this.curLink !== null) {
            this.toggleClass(this.curLink.items, "on");
          }
          this.toggleClass(link.items, "on");
          this.curLink = link;
        });
        link.items[i].addEventListener("mouseout", () => {
          if (this.curLink !== null) {
            this.toggleClass(this.curLink.items, "on");
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

// const links = [];

// function addLink(links, name, addItem) {
//   let link = findLink(links, name);
//   if (link === null || link === undefined) {
//     links.push({ name: name, items: [] });
//     link = findLink(links, name);
//   }
//   link.items.push(addItem);
//   return link;
// }

// let navCards = document.querySelectorAll(".c-card--nav");
// for (let idx = 0; idx < navCards.length; ++idx) {
//   let linkNm = navCards[idx].getAttribute("data-link-name");
//   if (linkNm !== null) {
//     linkNms.push(linkNm);
//     addLink(links, linkNm, navCards[idx]);
//   }
// }

// function findLink(links, name) {
//   for (let i = 0; i < links.length; ++i) {
//     if (links[i].name.toUpperCase() === name.toUpperCase()) {
//       return links[i];
//     }
//   }
//   return null;
// }

// navCards = document.querySelectorAll(".c-card-short");
// for (let idx = 0; idx < navCards.length; ++idx) {
//   let linkNm = navCards[idx].getAttribute("data-link-name");
//   if (linkNm !== null) {
//     let link = findLink(links, linkNm);
//     addLink(links, linkNm, navCards[idx]);
//   }
// }

// let curLink = null;
// function addEventHandlerLinks(links) {
//   for (let idx = 0; idx < links.length; ++idx) {
//     let link = links[idx];
//     if (curLink !== null) {
//     }

//     for (let i = 0; i < link.items.length; ++i) {
//       link.items[i].addEventListener("mouseover", () => {
//         if (curLink !== null) {
//           toggleClass(curLink.items, "on");
//         }
//         toggleClass(link.items, "on");
//         curLink = link;
//       });
//       link.items[i].addEventListener("mouseout", () => {
//         if (curLink !== null) {
//           toggleClass(curLink.items, "on");
//         }
//         curLink = null;
//       });
//     }
//   }
// }

// addEventHandlerLinks(links);

// function addEvent(link, event, classNm) {
//   for (let i = 0; i < link.items.length; ++i) {
//     link.items[i].addEventHandlerLinks(event, () => {
//       if (curLink !== null) {
//         toggleClass(curLink.items, "on");
//       }
//       toggleClass(link.items, "on");
//       curLink = link;
//     });
//   }
// }

// function toggleClass(items, classNm) {
//   for (let k = 0; k < items.length; ++k) {
//     items[k].classList.toggle(classNm);
//   }
// }
