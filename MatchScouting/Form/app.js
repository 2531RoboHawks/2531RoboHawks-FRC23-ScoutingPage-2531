//Firebase imports
import { database } from "../../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { match_layout } from "../../Constants/layout.js";
import { inputTypes } from "../../Constants/layout.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  


//Firebase references
const teamInfo_Firebase = ref(database, "teamInfo");
const data = ref(database, "match_data");

//HTML Elements
const teamInfo_td = document.getElementById("td_teamInfo");
const auto_td = document.getElementById("td_auto");
const teleop_td = document.getElementById("td_teleop");
const endGame_td = document.getElementById("td_endGame");
const selectTeam = document.getElementById("selectTeam");
const matchNum = document.getElementById("matchNum");
const teamNum = document.getElementById("teamNum");
const menuIcon = document.getElementById('menu-icon');
const allSections = document.querySelectorAll('section');
const sidebar = document.getElementById('section');

//Buttons
const nextButton_teamInfo = document.getElementById('nextButton_teamInfo');
const nextButton_auto = document.getElementById('nextButton_auto');
const nextButton_teleop = document.getElementById('nextButton_teleop');
const nextButton_endGame = document.getElementById('nextButton_endGame');
const submitButton = document.getElementById('submitButton');

//Show sidebar
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from propagating to the body
    // Toggle the sidebar's visibility by changing its left position
    sidebar.style.left = '0'; // Show sidebar
});


// Add click event listener to custom links
document.querySelectorAll('.custom-link').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
            // Navigate to the specified URL
            window.location.href = href;
        }
    });
});

// Close all sections if a click event occurs outside of it
document.addEventListener('click', function(event) {
    // Check if the clicked element is within a section
    if (!event.target.closest('section')) {
        for (let i = 0; i < allSections.length; i++) {
            allSections[i].style.left = '-100%'; // Hide section
        }
    }
});

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
while(match_layout.auto[i_auto]) {
    if (match_layout.auto[i_auto].type_of_input === inputTypes.chooser || match_layout.auto[i_auto].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        auto_td.innerHTML += 
        `<label>${match_layout.auto[i_auto].task}</label>`;

        //Create choices
        for (let i = 0; i < match_layout.auto[i_auto].choices.length; i++) {
        auto_td.innerHTML += `<input id="autoTask_${i_auto}" name="input_${match_layout.auto[i_auto].task}" type="${match_layout.auto[i_auto].type_of_input}"
                            <label>${match_layout.auto[i_auto].choices[i]}</label>`;
        }
        auto_td.innerHTML += `<br><br>`;
    }else {
        auto_td.innerHTML += 
        `<label>${match_layout.auto[i_auto].task}</label> <br>
        <input id="autoTask_${i_auto}" type="${match_layout.auto[i_auto].type_of_input}">
        <br><br>`;
    }
    i_auto++;
}

//Teleop Table
let i_teleop = 0;
while(match_layout.teleop[i_teleop]) {
    if (match_layout.teleop[i_teleop].type_of_input === inputTypes.chooser || match_layout.teleop[i_teleop].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        teleop_td.innerHTML += 
        `<label>${match_layout.teleop[i_teleop].task}</label>`;

        //Create choices
        for (let i = 0; i < match_layout.teleop[i_teleop].choices.length; i++) {
        teleop_td.innerHTML += `<input id="teleopTask_${i_teleop}" name="input_${match_layout.teleop[i_teleop].task}" type="${match_layout.teleop[i_teleop].type_of_input}"
                            <label>${match_layout.teleop[i_teleop].choices[i]}</label>`
        }
        teleop_td.innerHTML += `<br><br>`;

    }else {
        teleop_td.innerHTML += 
        `<label>${match_layout.teleop[i_teleop].task}</label> <br>
        <input id="teleopTask_${i_teleop}" type="${match_layout.teleop[i_teleop].type_of_input}">
        <br><br>`;
    }
    i_teleop++;
}


//Endgame Table
let i_endGame = 0;
while(match_layout.endGame[i_endGame]) {
    if (match_layout.endGame[i_endGame].type_of_input === inputTypes.chooser || match_layout.endGame[i_endGame].type_of_input === inputTypes.multi_choice) {
        
        //Create task label
        endGame_td.innerHTML += 
        `<label>${match_layout.endGame[i_endGame].task}</label>`;

        //Create choices
        for (let i = 0; i < match_layout.endGame[i_endGame].choices.length; i++) {
        endGame_td.innerHTML += `<input id="endGameTask_${i_endGame}" name="input_${match_layout.endGame[i_endGame].task}" type="${match_layout.endGame[i_endGame].type_of_input}"
                            <label>${match_layout.endGame[i_endGame].choices[i]}</label>`;
        }
        endGame_td.innerHTML += `<br><br>`;

    }else {
        endGame_td.innerHTML += 
        `<label>${match_layout.endGame[i_endGame].task}</label> <br>
        <input id="endGameTask_${i_endGame}" type="${match_layout.endGame[i_endGame].type_of_input}">
        <br><br>`;
    }
    i_endGame++;
}

//Actions
nextButton_auto.addEventListener('click', function() {
    let i = 0;
    let input;
    let output;

    while(match_layout.auto[i]) {
        if (match_layout.auto[i].type_of_input === inputTypes.chooser || match_layout.auto[i].type_of_input === inputTypes.multi_choice) {
            input = document.querySelector(input[name=`input_${match_layout.auto[i].task}`])
            for (let i = 0, length = input.length; i < length; i++) {
                if (input[i].checked) {
                    output = input[i].value;
                    // only one radio can be logically checked, don't check the rest
                    break;
                }
              }
            data_local.auto[i] = {
                task: match_layout.auto[i].task,
                data: `${output}`,
                points: match_layout.auto[i].points
            }
        } else{
            // console.log(document.getElementById(`autoTask_${i}`).value)
            data_local.auto[i] = {
                task: match_layout.auto[i].task,
                data: document.getElementById(`autoTask_${i}`).value,
                points: match_layout.auto[i].points
            }
        }
        i++;
    }
    console.log(data_local);
});

console.log(data_local);

});