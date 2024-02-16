//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import * as layout from "../Constants/layout.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  
const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//Firebase references
// const layout = ref(database, "Instand_layout");
const teamInfo = ref(database, "teamInfo");
const data = ref(database, "Instand_data");

//HTML Elements
const teamInfo_table = document.getElementsByClassName("teamInfo");
const auto_table = document.getElementsByClassName("auto");
const teleop_table = document.getElementsByClassName("teleop");
const endgame_table = document.getElementsByClassName("endgame");
const selectTeam = document.getElementById("selectTeam");
const matchNum = document.getElementById("matchNum");
const teamNum = document.getElementById("teamNum");

//Add teams to the list of options
onValue(teamInfo, function(snapshot) {
    const teamInfo_Array = Object.values(snapshot.val());
    let teamList = [];
    for(let i = 0; i < teamInfo_Array.length; i++) {
        teamList.push(teamInfo_Array[i].team_number);
        selectTeam.innerHTML += `<option value="" id="selectTeam_${i}">${teamInfo_Array[i].team_number}</option>`
    }
});


});