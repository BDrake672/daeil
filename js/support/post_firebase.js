//페이지 파라미터로 들어온 이름을 알아내는 기능
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let postIndex = getParameterByName('post_index');

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
    makePost(posts, postIndex);
    closeModalWindow();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
  });

function makePost(postArr, index) {
  document.querySelector('.post_title>h5').innerHTML = postArr[index].title;
  document.querySelector('.file>a').href = postArr[index].file;
  let fileName = postArr[index].file.substr((postArr[index].file.lastIndexOf('/')+1), (postArr[index].file.length-1));
  document.querySelector('.file>a').innerText = fileName;
  document.querySelector('span.context').innerHTML = postArr[index].context;
}