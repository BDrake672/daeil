//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let page = getParameterByName('page');

const table_board = db.ref('board');
let posts = [];

const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        posts.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_board)
  .then((value) => {
    // resolve() was called
    if(page == "") {
      page = 1;
    }
    makePosts(posts, page);
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
  });

//게시글을 만드는 기능
function makePosts(postArr, page) {
  let tbody = document.querySelector('.board>table>tbody');
  tbody.innerHTML = "";
  let postNumber = 0;
  for(let i = postArr.length; i > 0; i--) {
    let str = '<tr class="post" onclick=location.href="/view/support/post/post.html?page=' + (postArr.length - postNumber) + '">' 
    + '<th class="post_number">' + (postArr.length - postNumber) + '</th>'
    + '<td class="post_title">' + postArr[i-1].title + '</td>'
    + '<td class="post_user">대일노무법인</td>'
    + '</tr>';
    tbody.innerHTML += str;
    postNumber++;
  }
}