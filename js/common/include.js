setTimeout(function() {
  const modal = document.querySelector('.modal_window');
  modal.classList.add('hidden');
}, 1500);

function includeHTML() {
  let includeAttr = $('[include-html]');
  let self, url;
  $.each(includeAttr, function() {
    self = $(this);
    url = self.attr('include-html');
    self.load(url, function() {
      self.removeAttr("include-html");
    });
  });
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtBbPqSQ-Qy1h-7EkJ3NEtY-2sT8kyL4A",
  authDomain: "web-firebase-db-test.firebaseapp.com",
  projectId: "web-firebase-db-test",
  storageBucket: "web-firebase-db-test.appspot.com",
  messagingSenderId: "680685576176",
  appId: "1:680685576176:web:2f585c7176aa5f4dd0c735",
  measurementId: "G-YXGYMEZH3N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();

// const table_member = db.ref('member');
// table_member.on('child_added', function(data) {
//   console.dir(data.val());
// });