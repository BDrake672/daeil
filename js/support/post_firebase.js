//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let postIndex = getParameterByName('post_index');

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
    makePost(posts, postIndex);
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

function makePost(postArr, index) {
  document.querySelector('.post_title>h5').innerHTML = postArr[index].title;
  storage.ref().child(postArr[index].file).getDownloadURL().then(function(url) {
    document.querySelector('.file>a').href = url;
  });
  let fileName = postArr[index].file.substr((postArr[index].file.lastIndexOf('/')+1), (postArr[index].file.length-1));
  document.querySelector('.file>a').innerText = fileName;
  document.querySelector('span.context').innerHTML = postArr[index].context;
  document.getElementById('button_delete_post').onclick = function() {
    buttonDeletePost(postArr[index]);
  }
  document.getElementById('button_change_post').onclick = function() {
    buttonChagePost(index);
  }
}

function buttonDeletePost(data) {
  let confirmStr = '삭제하면 데이터를 되돌릴 수 없습니다.\n\'삭제하려면 "확인"을 입력하세요.';
  let confirm = prompt(confirmStr);
  if(confirm == '확인') {
    let pathStr = 'public/board/' + data.path_name;
    let filePathStr = data.file;
    db.ref(pathStr).remove();
    storage.ref().child(filePathStr).delete();
    alert('삭제 완료');
    location.assign('/view/support/support.html');
  }
}

function buttonChagePost(postIndex) {
  let str = '/view/admin/support/write_post.html?post=' + (Number(postIndex) + 1);
  location.assign(str);
}