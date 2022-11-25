const errormodal = document.getElementById("error-modal");
const closemodal = document.getElementById("close");
const okbtnmodal = document.getElementById("error-modal-button");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword,signInWithEmailAndPassword, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
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
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider(app);

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
    window.location.href = "products.html";
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
      console.log(errorMessage);
      if(errorMessage == "Firebase: Error (auth/invalid-email)."){
        $("#error-modal").css("display", "flex");
        $("#error-modal-text").text("Invalid Email");
      }
      else if(errorMessage == "Firebase: Error (auth/user-not-found).") {
        $("#error-modal").css("display", "flex");
        $("#error-modal-text").text("Username Not Found, Please Sign Up");
      }
    });
});

$('#google-login').click(() => {
  signInWithPopup(auth, providerGoogle)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    alert(user.displayName);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    alert(errorMessage);
  });
});

$("#email, #password").keyup(() => {
  if (($("#email").val() != "") && ($("#password").val() != "")) {
    $("#signin").prop("disabled", false);
  } else {
    $("#signin").prop("disabled", true);
  }
})

$("#close, #error-modal-button").click(() => {
  $("#error-modal").css("display", "none");
});

$("#error-modal").click( (e) => {
  $("#error-modal").css("display", "none");
});