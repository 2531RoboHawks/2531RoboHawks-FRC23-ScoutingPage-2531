//(import *) lets you import everything from that file
import * as teamDatabase from "../firebase.js";
import {ref, push, onValue, update, remove, set, child, get} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

//Buttons
const guestSignIn = document.getElementById("guestSignIn");
const loginButton = document.getElementById("loginButton");

//InputFields
const userInput = document.getElementById("loginUsername");
const passInput = document.getElementById("loginPassword");

//set userStatus initially as guest
localStorage.setItem('userStatus', 'guest');

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
    // location.replace("../app.js");
});



/*
 ********* Below are only for FUNCTIONS ********
 *Because of scope issues with onValue(), localStorage is needed.
 *Meaning any variables declared within onValue() cannot be used outside of onValue(), and vice versa.
*/

//Checking login validation
function userLogin() {
    onValue(teamDatabase.memberUser, function(snapshot) {
        let memberUser = Object.values(snapshot.val()); //Get member's username from firebase 
        console.log(memberUser);
        //Verify username
        if(userInput.value == memberUser) {
            localStorage.setItem('memberUser', 'userValid'); //Store user validation locally
        }
    });

    onValue(teamDatabase.memberPass, function(snapshot) {
        let memberPass = Object.values(snapshot.val()); //Get member's password from firebase
        console.log(memberPass);
        //Verify pass
        if(passInput.value == memberPass) {
            localStorage.setItem('memberPass', 'passValid'); //Store pass validation locally
        }
    });

    if(localStorage.getItem('memberUser') == 'userValid'  &&  localStorage.getItem('memberPass') == 'passValid') {
        localStorage.setItem('userStatus', 'member');
    } else {
        clearUserStatus();
        localStorage.setItem('userStatus', 'guest');
        alert("Email/password is invalid. Please try again!")
        userInput.value = '';
        passInput.value = '';
    }
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