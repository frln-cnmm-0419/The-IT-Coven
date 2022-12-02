// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, getRedirectResult } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

$(document).ready(() => {
	const errormodal = document.getElementById("error-modal");
	const closemodal = document.getElementById("close");
	var product = document.getElementsByClassName("products");
	const okbtnmodal = document.getElementById("error-modal-button");
	const order = document.getElementById('order-now');
	var isLoggedIn = "false";
	var user;
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

	var cartcount = document.getElementsByClassName("content");
	var toast = document.getElementById("snackbar");
	var price = 0;
	var count = 0;

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

		let email = $('#email').val();
		let password = $('#password').val();
		let name = $('#nickname').val();
		let passlength = $('#password').val().length;
		let nnlength = $('#nickname').val().length;
		let snackbarforsu = document.getElementById("snackbar-for-signup");
		let redirectToProductsPageSU = () => {
			window.location.href = "login.html";
		}

		if (nnlength <= 2) {
			snackbarforsu.innerText = "Your nickname is too short (minimum 3 characters)";
			snackbarforsu.className = "show";
			setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
		}
		else if (passlength <= 8) {
			snackbarforsu.innerText = "Your password istoo short (8 characters minimum)";
			snackbarforsu.className = "show";
			setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
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
					snackbarforsu.innerText = "Account Creation Successful! Redirecting to the sign in page...";
					snackbarforsu.className = "show";
					setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
					isLoggedIn = "true";
					setTimeout(redirectToProductsPageSU, 3000);

				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					// ..
					console.log(errorMessage)
					if (errorMessage == "Firebase: Error (auth/invalid-email).") {
						snackbarforsu.innerText = "Invalid Email,Please Try Again.";
						snackbarforsu.className = "show";
						setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
					}
					else if (errorMessage == "Firebase: Error (auth/email-already-in-use).") {
						snackbarforsu.innerText = "Whoa wait this email is already in used, please log in.";
						snackbarforsu.className = "show";
						setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
					}
					else if (errorCode == "auth/invalid-email") {
						snackbarforsu.innerText = "Invalid Email,Please Try Again.";
						snackbarforsu.className = "show";
						setTimeout(() => { snackbarforsu.className = snackbarforsu.className.replace("show", ""); }, 3000);
					}
				});
		}
	});

	/* signin button function */
	$('#signin').click(() => {
		let email = $('#email-lg').val();
		let loginsb = document.getElementById("snackbar-lg");
		let password = $('#password-lg').val();

		let redirectToProductsPage = () => {
			location.href = "products.html";
		}

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				const dt = new Date();
				update(ref(database, 'users/' + user.uid), {
					lastLogin: dt,
				});
				loginsb.innerText = "Login Successful! Redirecting to Tusok Tusok Products Page...";
				loginsb.className = "show";
				setTimeout(() => { loginsb.className = loginsb.className.replace("show", ""); }, 3000);
				isLoggedIn = "true";
				setTimeout(redirectToProductsPage, 3000);

				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if (errorCode == "auth/invalid-email") {
					loginsb.innerText = "Yayks! The email you've entered is non-existent. Have another go!";
					loginsb.className = "show";
					setTimeout(() => { loginsb.className = loginsb.className.replace("show", ""); }, 3000);
				}
				else if (errorCode == "auth/user-not-found") {
					loginsb.innerText = "Yay! We can't find the email you've entered in our database. Please Sign Up. >_<";
					loginsb.className = "show";
					setTimeout(() => { loginsb.className = loginsb.className.replace("show", ""); }, 3000);
				}
				else if (errorCode == "auth/wrong-password") {
					loginsb.innerText = "Yay! The password you've entered is incorrect. Please try again. >_<";
					loginsb.className = "show";
					setTimeout(() => { loginsb.className = loginsb.className.replace("show", ""); }, 3000);
				}
				else if (errorMessage == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts.") {
					loginsb.innerText = "Yay! Your account has been temporarily disabled due to many failed login attempts, please after 15mins.";
					loginsb.className = "show";
					setTimeout(() => { loginsb.className = loginsb.className.replace("show", ""); }, 3000);
				}
			});
	});

	// google login button
	$('#google-login, #google-sign-up').click(e => {
		signInWithPopup(auth, providerGoogle)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const userName = result.user;
				// ...
				alert(userName.displayName);
				isLoggedIn = "true";
				user = userName.displayName;
				$("#modal-note").text("Success!.");
				$("#modal").css("display", "flex");
				location.href = "products.html";
				e.preventDefault();
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

	$(product).click((e) => {
		price += 100;
		// console.log(price);
		// getting the snackbar DIV
		if (isLoggedIn == "true") {
			toast.innerText = "Added to Cart!";
			toast.className = "show";
			setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
			count++;
			console.log(count);
			$(cartcount).text(count);
			$(e).css("scale", "1.2");
			$(cartcount).css("width", "1.8rem");
			$(cartcount).css("height", "1.8rem");
		}
		else {
			toast.innerText = "Please login to add to cart!";
			toast.className = "show";
			setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
		}
	})
});