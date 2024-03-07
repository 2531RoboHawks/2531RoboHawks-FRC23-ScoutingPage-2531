//Firebase imports
import { database } from "../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { instand_layout } from "../Constants/layout.js";
import { inputTypes } from "../Constants/layout.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  


//Firebase references
const teamInfo_Firebase = ref(database, "teamInfo");
const data = ref(database, "Instand_data");

//HTML Elements
const teamInfo_td = document.getElementById("td_teamInfo");
const auto_td = document.getElementById("td_auto");
const teleop_td = document.getElementById("td_teleop");
const endGame_td = document.getElementById("td_endGame");
const selectTeam = document.getElementById("selectTeam");
const matchNum = document.getElementById("matchNum");
const teamNum = document.getElementById("teamNum");

//Buttons
const nextButton_teamInfo = document.getElementById('nextButton_teamInfo');
const nextButton_auto = document.getElementById('nextButton_auto');
const nextButton_teleop = document.getElementById('nextButton_teleop');
const nextButton_endGame = document.getElementById('nextButton_endGame');
const submitButton = document.getElementById('submitButton');


//This empty JS dictionary will contain user inputs
const data_local = {
    teamInto: {

    },
    teleop: {

    },
    auto: {

    },
    endGame: {

    },
    matchResult: {

    }
}

//Add teams to the list of options
onValue(teamInfo_Firebase, function(snapshot) {
    const teamInfo_Array = Object.values(snapshot.val());
    let teamList = [];
    for(let i = 0; i < teamInfo_Array.length; i++) {
        teamList.push(teamInfo_Array[i].team_number);
        selectTeam.innerHTML += `<option value="" id="selectTeam_${i}">${teamInfo_Array[i].team_number}</option>`;
    }
});

//Auto Table
let i_auto = 0;
while(instand_layout.auto[i_auto]) {
    if (instand_layout.auto[i_auto].type_of_input === inputTypes.chooser || instand_layout.auto[i_auto].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        auto_td.innerHTML += 
        `<label>${instand_layout.auto[i_auto].task}</label>`;

        //Create choices
        for (let i = 0; i < instand_layout.auto[i_auto].choices.length; i++) {
        auto_td.innerHTML += `<input id="autoTask_${i_auto}" name="input_${instand_layout.auto[i_auto].task}" type="${instand_layout.auto[i_auto].type_of_input}"
                            <label>${instand_layout.auto[i_auto].choices[i]}</label>`;
        }
        auto_td.innerHTML += `<br><br>`;
    }else {
        auto_td.innerHTML += 
        `<label>${instand_layout.auto[i_auto].task}</label> <br>
        <input id="autoTask_${i_auto}" type="${instand_layout.auto[i_auto].type_of_input}">
        <br><br>`;
    }
    i_auto++;
}

//Teleop Table
let i_teleop = 0;
while(instand_layout.teleop[i_teleop]) {
    if (instand_layout.teleop[i_teleop].type_of_input === inputTypes.chooser || instand_layout.teleop[i_teleop].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        teleop_td.innerHTML += 
        `<label>${instand_layout.teleop[i_teleop].task}</label>`;

        //Create choices
        for (let i = 0; i < instand_layout.teleop[i_teleop].choices.length; i++) {
        teleop_td.innerHTML += `<input id="teleopTask_${i_teleop}" name="input_${instand_layout.teleop[i_teleop].task}" type="${instand_layout.teleop[i_teleop].type_of_input}"
                            <label>${instand_layout.teleop[i_teleop].choices[i]}</label>`
        }
        teleop_td.innerHTML += `<br><br>`;

    }else {
        teleop_td.innerHTML += 
        `<label>${instand_layout.teleop[i_teleop].task}</label> <br>
        <input id="teleopTask_${i_teleop}" type="${instand_layout.teleop[i_teleop].type_of_input}">
        <br><br>`;
    }
    i_teleop++;
}


//Endgame Table
let i_endGame = 0;
while(instand_layout.endGame[i_endGame]) {
    if (instand_layout.endGame[i_endGame].type_of_input === inputTypes.chooser || instand_layout.endGame[i_endGame].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        endGame_td.innerHTML += 
        `<label>${instand_layout.endGame[i_endGame].task}</label>`;

        //Create choices
        for (let i = 0; i < instand_layout.endGame[i_endGame].choices.length; i++) {
        endGame_td.innerHTML += `<input id="endGameTask_${i_endGame}" name="input_${instand_layout.endGame[i_endGame].task}" type="${instand_layout.endGame[i_endGame].type_of_input}"
                            <label>${instand_layout.endGame[i_endGame].choices[i]}</label>`;
        }
        endGame_td.innerHTML += `<br><br>`;

    }else {
        endGame_td.innerHTML += 
        `<label>${instand_layout.endGame[i_endGame].task}</label> <br>
        <input id="endGameTask_${i_endGame}" type="${instand_layout.endGame[i_endGame].type_of_input}">
        <br><br>`;
    }
    i_endGame++;
}

//Actions
nextButton_auto.addEventListener('click', function() {
    let i = 0;
    let input;
    let output;

    while(instand_layout.auto[i]) {
        if (instand_layout.auto[i].type_of_input === inputTypes.chooser || instand_layout.auto[i].type_of_input === inputTypes.multi_choice) {
            input = document.querySelector(input[name=`input_${instand_layout.auto[i].task}`])
            for (let i = 0, length = input.length; i < length; i++) {
                if (input[i].checked) {
                    output = input[i].value;
                    // only one radio can be logically checked, don't check the rest
                    break;
                }
              }
            data_local.auto[i] = {
                task: instand_layout.auto[i].task,
                data: `${output}`,
                points: instand_layout.auto[i].points
            }
        } else{
            // console.log(document.getElementById(`autoTask_${i}`).value)
            data_local.auto[i] = {
                task: instand_layout.auto[i].task,
                data: document.getElementById(`autoTask_${i}`).value,
                points: instand_layout.auto[i].points
            }
        }
        i++;
    }
    console.log(data_local);
});

console.log(data_local);

});