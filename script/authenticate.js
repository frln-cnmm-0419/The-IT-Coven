const errormodal = document.getElementById("error-modal");
const closemodal = document.getElementById("close");
const okbtnmodal = document.getElementById("error-modal-button");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
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

// this is for the sign in form
$("#show-pass").click(() => {
	if ($("#password").attr("type") == "password") {
		$("#password").attr("type", "text");
	} else {
		$("#password").attr("type", "password");
	}
});

// this is for log in form
$("#show-pass-lg").click(() => {
	if ($("#password-lg").attr("type") == "password") {
		$("#password-lg").attr("type", "text");
	} else {
		$("#password-lg").attr("type", "password");
	}
});

$('#signup').click(() => {

	var email = $('#email').val();
	var password = $('#password').val();
	var name = $('#nickname').val();
	var passlength = $('#password').val().length;
	var nnlength = $('#nickname').val().length;

	if (nnlength <= 2) {
		$("#modal-note").text("Nickname must be 2 characters long");
		$("#modal").css("display", "flex");
	}
	else if (passlength <= 8) {
		$("#modal-note").text("Password must be 8 characters long");
		$("#modal").css("display", "flex");
	}
	else {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				// ...
				set(ref(database, 'users/' + user.uid), {
					name: name,
					email: email,
				});
				$("#modal-note").text("Account Creation Successful! Click OK to go to the sign in page.");
				$("#modal").css("display", "flex");
				$("#close-modal-btn").click(() => {
					location.href = "login.html";
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
				alert(errorMessage)
				if (errorMessage == "Firebase: Error (auth/invalid-email).") {
					$("#modal-note").text("Invalid Email,Please Try Again.");
					$("#modal").css("display", "flex");
				}
				else if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
					$("#modal-note").text("Whoa wait this email is already in used, please log in.");
					$("#modal").css("display", "flex");
				}
			});
	}
});

$('#signin').click(() => {
	var email = $('#email-lg').val();
	var password = $('#password-lg').val();

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			const dt = new Date();
			update(ref(database, 'users/' + user.uid), {
				lastLogin: dt,
			})
			$("#error-modal-text").text("Login Successful! Press OK to continue.");
			$("#error-modal").css("display", "flex");
			$("#error-modal-button").click(() => {
				location.href = "products.html";
			});
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
			if (errorMessage == "Firebase: Error (auth/invalid-email).") {
				$("#error-modal").css("display", "flex");
				$("#error-modal-text").text("Yayks! The email you used is non-existent. Have another go!");
			}
			else if (errorMessage == "Firebase: Error (auth/user-not-found).") {
				$("#error-modal").css("display", "flex");
				$("#error-modal-text").text("Yay! We can't find the email you entered in our database, Please Sign Up. >_<");
			}
		});
});

// google login button
$('#google-login, #google-sign-up').click(() => {
	signInWithPopup(auth, providerGoogle)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const userName = result.user;
			// ...
			alert(userName.displayName);
			$("#modal-note").text("Success!.");
			$("#modal").css("display", "flex");
		}).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
			// error handling if the user close the window during sign in
			if (errorMessage == "Firebase: Error (auth/popup-closed-by-user).") {
				$("#error-modal").css("display", "flex");
				$("#error-modal-text").text("Login Cancelled.");

				$("#modal-note").text("Opps, the user closed the pop-up window please try again.");
				$("#modal").css("display", "flex");
			}
		})
});

// disable button if the fields are empty for login
$("#email-lg, #password-lg").keyup(() => {
	if (($("#email-lg").val() != "") && ($("#password-lg").val() != "")) {
		$("#signin").prop("disabled", false);
	} else {
		$("#signin").prop("disabled", true);
	}
});

// close error modal login form
$("#error-modal, #error-modal-button").click(() => {
	$("#error-modal").css("display", "none");
});

// disable button if the fields are empty for sign up
$("#nickname, #email, #password").keyup(() => {
	// if all three fields are not empty then disabled attribute wll be disabled
	if (($("#email").val() != "") && ($("#password").val() != "") && ($("#nickname").val() != "")) {
		$("#signup").prop("disabled", false);
	} else {
		// otherwise...
		$("#signup").prop("disabled", true);
	}
});

// close error modal signup form
$("#close-modal-btn, #modal").click(() => {
	$("#modal").css("display", "none");
});