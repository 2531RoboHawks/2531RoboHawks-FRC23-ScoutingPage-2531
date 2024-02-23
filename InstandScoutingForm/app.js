//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { instand_layout } from "../Constants/layout.js";

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
const teamInfo_Firebase = ref(database, "teamInfo");
const data = ref(database, "Instand_data");

//HTML Elements
const teamInfo_td = document.getElementById("td_teamInfo");
const auto_td = document.getElementById("td_auto");
const teleop_td = document.getElementById("td_teleop");
const endgame_td = document.getElementById("td_endGame");
const selectTeam = document.getElementById("selectTeam");
const matchNum = document.getElementById("matchNum");
const teamNum = document.getElementById("teamNum");

//Add teams to the list of options
onValue(teamInfo_Firebase, function(snapshot) {
    const teamInfo_Array = Object.values(snapshot.val());
    let teamList = [];
    for(let i = 0; i < teamInfo_Array.length; i++) {
        teamList.push(teamInfo_Array[i].team_number);
        selectTeam.innerHTML += `<option value="" id="selectTeam_${i}">${teamInfo_Array[i].team_number}</option>`
    }
});

//Auto Table
let i_auto = 0;
while(instand_layout.auto[i_auto]) {
    // console.log(instand_layout.auto[i_auto]);
    console.log(instand_layout.auto[i_auto].task);
    auto_td.innerHTML += 
        `<label>${instand_layout.auto[i_auto].task}</label> &ensp; &emsp;
        <input type="${instand_layout.auto[i_auto].type_of_input}">
        <br><br>`
    i_auto++;
}

//Teleop Table
let i_teleop = 0;
while(instand_layout.teleop[i_teleop]) {
    // console.log(instand_layout.teleop[i_teleop]);
    // console.log(instand_layout.teleop[i_teleop].task);
    i_teleop++;
}

//Endgame Table
let i_endGame = 0;
while(instand_layout.endGame[i_endGame]) {
    console.log(instand_layout.endGame[i_endGame]);
    console.log(instand_layout.endGame[i_endGame].task);
    i_endGame++;
}


});