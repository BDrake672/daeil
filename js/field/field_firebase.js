const table_field = db.ref('field');
let fieldData = [];

const getData = (ref) => {
  return new Promise((resolve, reject) => {
    const onError = error => reject(error);
    const onData = snap => resolve(
      // snap.val()
      snap.forEach(ss => {
        fieldData.push(ss.val());
      })
    );
    ref.on("value", onData, onError);
  });
};

getData(table_field)
  .then((value) => {
    // resolve() was called
    // makeHome();
    closeModalWindow();
  })
  .catch((error) => {
    // reject() was called
    // Something went wrong while fetching the data.
    // Handle that error here.
    console.log('에러발생');
    console.dir(error);
  });