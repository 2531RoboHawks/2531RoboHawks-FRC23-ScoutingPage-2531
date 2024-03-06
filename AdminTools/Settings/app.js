//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { fetchRegionals } from "../../Constants/API.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//Firebase reference
const regionalsList = ref(database, 'generalInfo/regionalsList');
const selectedRegional = ref(database, 'generalInfo/selectedRegional')
const attendingTeams = ref(database, 'generalInfo/attendingTeams');

//HTML elements
const year_input = document.getElementById("year_input");
const selectRegional = document.getElementById("selectRegional");
const eventUpdate_Button = document.getElementById("eventUpdate_Button");

let year;
let event_code;
let team_number;

eventUpdate_Button.addEventListener("click", function() {
    year = year_input.value;
    fetchRegionals(year);
});



});