var contentsArr = document.querySelectorAll('.target_contents');

for(let i = 0; i < contentsArr.length; i++) {
  contentsArr[i].onmouseover = function() {
    let span = contentsArr[i].querySelector('h6>span');
    span.classList.add('active');
  }
  contentsArr[i].onmouseout = function() {
    let span = contentsArr[i].querySelector('h6>span');
    span.classList.remove('active');
  }
}