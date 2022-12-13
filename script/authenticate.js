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
	var user;
	const paynow = document.getElementsByClassName("pn-btn");
	var arrOfProducts = [];
	var arrOfProductsPrice = [];
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
				setTimeout(redirectToProductsPage, 3000);
				sessionStorage.setItem("displayname", email);
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
				user = userName.displayName;
				$("#modal-note").text("Success!.");
				$("#modal").css("display", "flex");
				location.href = "products.html";
				sessionStorage.setItem("displayname", user);
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

	var addToArrOfProducts = (target) => {
		if (target == "bananacue") {
			arrOfProducts.push("Banana Cue");
		}
		else if (target == "balot") {
			arrOfProducts.push("Balot");
		}
		else if (target == "barbeque") {
			arrOfProducts.push("Barbeque");
		}
		else if (target == "buchi") {
			arrOfProducts.push("Buchi");
		}
		else if (target == "calamares") {
			arrOfProducts.push("Calamares");
		}
		else if (target == "carioca") {
			arrOfProducts.push("Carioca");
		}
		else if (target == "lumpianshanghai") {
			arrOfProducts.push("Lumpia Shanghai");
		}
		else if (target == "potatoballs") {
			arrOfProducts.push("Potato Balls");
		}
		else if (target == "sundot") {
			arrOfProducts.push("Sundot");
		}
		else if (target == "siomai") {
			arrOfProducts.push("Siomai");
		}
		else if (target == "taho") {
			arrOfProducts.push("Taho");
		}
		else if (target == "takoyaki") {
			arrOfProducts.push("Takoyaki");
		}
		else if (target == "fishball") {
			arrOfProducts.push("Fishball");
		}
		else if (target == "kwekkwek") {
			arrOfProducts.push("Kwek Kwek");
		}
		else if (target == "kikyam") {
			arrOfProducts.push("Kikyam");
		}
		else if (target == "chickenskin") {
			arrOfProducts.push("Chicken Skin");
		}
		else if (target == "corndog") {
			arrOfProducts.push("Corn Dog");
		}
		else if (target == "dynamite") {
			arrOfProducts.push("Dynamite");
		}
		console.log(target);
	}

	$(product).click((e) => {
		var price;
		price += 100;
		// console.log(price);
		// getting the snackbar DIV
		if (sessionStorage.getItem("displayname") != null) {
			toast.innerText = "Added to Cart!";
			toast.className = "show";
			setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
			count++;
			$(cartcount).text(count);
			$(e).css("scale", "1.2");
			$(cartcount).css("width", "1.8rem");
			$(cartcount).css("height", "1.8rem");
			console.log(e.target.id)
			addToArrOfProducts(e.target.id);

		}
		else {
			toast.innerText = "Please login to add to cart!";
			toast.className = "show";
			setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
		}
	})
	var list = document.getElementsByClassName("contentarea");
	$(paynow).click(() => {
		var i;
		console.log(arrOfProducts);
		for (i = 0; i < arrOfProducts.length; i++) {
			// $(list).append("<li>" + arrOfProducts[i] + "</li>");
			if (arrOfProducts[i] == "Banana Cue") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 10.00" + "</li>");
				arrOfProductsPrice.push(10);
			}
			else if (arrOfProducts[i] == "Balot") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 20.00" + "</li>");
				arrOfProductsPrice.push(20);
			}
			else if (arrOfProducts[i] == "Barbeque") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 30.00" + "</li>");
				arrOfProductsPrice.push(30);
			}
			else if (arrOfProducts[i] == "Buchi") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 40.00" + "</li>");
				arrOfProductsPrice.push(5);
			}
			else if (arrOfProducts[i] == "Calamares") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 3.00" + "</li>");
				arrOfProductsPrice.push(3);
			}
			else if (arrOfProducts[i] == "Carioca") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 5.00" + "</li>");
				arrOfProductsPrice.push(5);
			}
			else if (arrOfProducts[i] == "Lumpia Shanghai") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 10.00" + "</li>");
				arrOfProductsPrice.push(7);
			}
			else if (arrOfProducts[i] == "Potato Balls") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 25.00" + "</li>");
				arrOfProductsPrice.push(25);
			}
			else if (arrOfProducts[i] == "Sundot") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 50.00" + "</li>");
				arrOfProductsPrice.push(50);
			}
			else if (arrOfProducts[i] == "Siomai") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 12.00" + "</li>");
				arrOfProductsPrice.push(12);
			}
			else if (arrOfProducts[i] == "Taho") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 25.00" + "</li>");
				arrOfProductsPrice.push(25);
			}
			else if (arrOfProducts[i] == "Takoyaki") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 50.00" + "</li>");
				arrOfProductsPrice.push(50);
			}
			else if (arrOfProducts[i] == "Fishball") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 2.00" + "</li>");
				arrOfProductsPrice.push(2);
			}
			else if (arrOfProducts[i] == "Kikyam") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 3.00" + "</li>");
				arrOfProductsPrice.push(3);
			}
			else if (arrOfProducts[i] == "Kwekkwek") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 4.00" + "</li>");
				arrOfProductsPrice.push(4);
			}
			else if (arrOfProducts[i] == "Chicken Skin") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 10.00" + "</li>");
				arrOfProductsPrice.push(10);
			}
			else if (arrOfProducts[i] == "Corn Dog") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 60.00" + "</li>");
				arrOfProductsPrice.push(60);
			}
			else if (arrOfProducts[i] == "Dynamite") {
				$(list).append("<li>" + arrOfProducts[i] + "   " + "P 15.00" + "</li>");
				arrOfProductsPrice.push(15);
			}
		}
	});

	const lg_btn = document.getElementById("loginbtn");
	const su_btn = document.getElementById("signupbtn");
	const userName = document.getElementsByClassName("user");

	if (sessionStorage.getItem("displayname") != null) {
		$(userName).css("display", "block");
		$(userName).text(sessionStorage.getItem("displayname"));
		$(lg_btn).css("display", "none");
		$(su_btn).css("display", "none");
	}
	else {
		$(lg_btn, su_btn).css("display", "flex");
	}

	$(lg_btn).click(() => {
		window.location.replace("login.html");
	});
	$(su_btn).click(() => {
		window.location.replace("sign-up.html");
	})
});