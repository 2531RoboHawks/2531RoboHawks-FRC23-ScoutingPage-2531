//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, remove, set, child, get} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//Users and authentication
const memberUser = ref(database, "authentication/member/user");
const memberPass = ref(database, "authentication/member/pass");

//Buttons
const guestSignIn = document.getElementById("guestSignIn");
const loginButton = document.getElementById("loginButton");
const showPassword = document.getElementById("showPassword");

//InputFields
const userInput = document.getElementById("loginUsername");
const passInput = document.getElementById("loginPassword");


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {
//TODO: logout
//TODO: transfer page after login as member/guest
//TODO: gets 5 tries for wrong password
//TODO: show/hide error message

loginButton.addEventListener('click', function(){
    userLogin();
    console.log(localStorage.getItem('userStatus'));
});

guestSignIn.addEventListener('click', function() {
    clearUserStatus();
    console.log(localStorage.getItem('userStatus')); //set user as guest
});

//Listen for if showPassword checkbox is checked
showPassword.addEventListener('change', function(event) {
    if (event.target.checked) {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
});

//Checking login validation
function userLogin() {
    onValue(memberUser, function(userSnapshot) {
        const memberUserValue = Object.values(userSnapshot.val()).join(''); // Get member's username from Firebase 
        console.log("Member username from Firebase:", memberUserValue);
        console.log("Username input:", userInput.value);
        
        // Verify username
        if (userInput.value == memberUserValue) {
            localStorage.setItem('memberUser', 'userValid'); // Store user validation locally

            // After setting the user validation, check the password
            onValue(memberPass, function(passSnapshot) {
                const memberPassValue = Object.values(passSnapshot.val()).join(''); // Get member's password from Firebase
                console.log("Member password from Firebase:", memberPassValue);
                console.log("Password input:", passInput.value);
                
                // Verify password
                if (passInput.value == memberPassValue) {
                    localStorage.setItem('memberPass', 'passValid'); // Store pass validation locally
                    console.log("Password is valid.");

                    // Both user and pass are valid, set user status and alert
                    localStorage.setItem('userStatus', 'member');
                    alert("You're logged in as a member!!");
                    window.history.back();
                } else {
                    // Password is invalid
                    console.log("Password is invalid.");
                    clearUserStatus();
                    localStorage.setItem('userStatus', 'guest');
                    alert("Email/password is invalid. Please try again!")
                    userInput.value = '';
                    passInput.value = '';
                }
            });
        } else {
            // Username is invalid
            console.log("Username is invalid.");
            clearUserStatus();
            localStorage.setItem('userStatus', 'guest');
            alert("Email/password is invalid. Please try again!")
            userInput.value = '';
            passInput.value = '';
        }
    });
}

function clearUserStatus() {
    //clear user status locally
    localStorage.clear('memberUser');
    localStorage.clear('memberPass');
    localStorage.setItem('userStatus', 'guest'); //set user as guest

    console.log(localStorage.getItem('memberUser'));
    console.log(localStorage.getItem('memberPass'));
}
});