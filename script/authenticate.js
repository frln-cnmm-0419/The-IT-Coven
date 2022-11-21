
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBfbXNMMl_LRaVqipBtRqGjAalDyyWXfRE",
authDomain: "hci-final-proj-b9b64.firebaseapp.com",
databaseURL: "https://hci-final-proj-b9b64-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "hci-final-proj-b9b64",
storageBucket: "hci-final-proj-b9b64.appspot.com",
messagingSenderId: "305393309772",
appId: "1:305393309772:web:85a65660ebbeefcd837ce9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

$('.signup').click( () => {

var email = $('#email').val();
var password = $('#password').val();
var name = $('#nickname').val();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    set(ref(database, 'users/' + user.uid), {
      name: name,
      email: email,
    });
    alert("Account Created");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage);
  });
});


$('#signin').click(() => {
  var email = $('#email').val();
  var password = $('#password').val();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        lastLogin: dt,
      })

      alert("Login Successful");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});