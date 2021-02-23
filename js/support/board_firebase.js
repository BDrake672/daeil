//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let page = getParameterByName('page');

const table_board = db.ref('public/board');
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
    showAdminButton();
    closeModalWindow();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
    console.dir(error);
  });

//게시글을 만드는 기능
function makePosts(postArr, page) {
  let tbody = document.querySelector('.board>table>tbody');
  tbody.innerHTML = "";

  let totalPage = 0; //전체 페이지 수
  // 페이지 파라미터가 빈값으로 들어왔다면 1로 맞추기
  if(page == "") {
    page = 1;
  }
  // 페이지에 해당되는 게시글의 첫번째 인덱스 구하기
  let num = parseInt(postArr.length / 10);
  if(postArr.length % 10 == 0) {
    num -= 1;
  }
  let startIndex = (num * 10) - ((page - 1) * 10);

  // 페이지 인덱스에 맞는 게시글 만들기
  for(let i = (startIndex + 9); i >= startIndex; i--) {
    if(postArr[i] == null) { continue; }
    let str = '<tr class="post" onclick=location.href="/view/support/post/post.html?post_index=' + i + '">'
    + '<th class="post_number">' + (i + 1) + '</th>'
    + '<td class="post_title">' + postArr[i].title + '</td>'
    + '<td class="post_user">대일노무법인</td>'
    + '</tr>';
    tbody.innerHTML += str;
  }

  // 전체 페이지 수를 구해서 페이지 네이션 만들기
  totalPage = parseInt(postArr.length / 10);
  if((postArr.length % 10) > 0) {
    totalPage += 1;
  }
  let pages = document.querySelector('span.pages');
  pages.innerHTML = "";
  for(let i = 0; i < totalPage; i++) {
    let str = '<a href="/view/support/support.html?page=' + (i + 1) + '"';
    // 페이지네이션의 현재 페이지에 current_page 클래스 주입
    if((i + 1) == page) {
      str += ' class="current_page">' + (i + 1) + '</a>';
    }else{
      str += '>' + (i + 1) + '</a>';
    }
    pages.innerHTML += str;
  }

  document.getElementById('button_write_post').onclick = function() {
    location.assign('/view/admin/support/write_post.html?post=new');
  }
}