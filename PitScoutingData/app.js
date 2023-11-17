//Firebase imported functions
import { ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

//(import *) lets you import everything from that file
import * as teamDatabase from "../firebase.js";

import * as points from "/InstandScoutingForm/app.js";
console.log(points.contributedPoints);

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

    //TODO: Keep comments hidden from 'guest' user

    
});