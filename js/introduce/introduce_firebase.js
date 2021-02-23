const table_member = db.ref('public/member');
let members = [];
const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        members.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_member)
  .then((value) => {
    // resolve() was called
    console.dir(members);
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
  });