

let hamberger = document.querySelector('#ham-input');
console.log(hamberger.checked);

hamberger.addEventListener('click', () => {
  let nav = document.querySelector('.gnb');
  if( hamberger.checked ) {
    nav.classList.add('on');
  }else {
    nav.classList.remove('on');
  }
})