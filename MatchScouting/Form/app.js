//Firebase imports
import { database } from "../../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { match_layout, createForm } from "../../Constants/layout.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  


//Firebase references
const teamInfo_Firebase = ref(database, "teamInfo");

//HTML Elements
const auto_td = document.getElementById("td_auto");
const teleop_td = document.getElementById("td_teleop");
const endGame_td = document.getElementById("td_endGame");
const matchEval_td = document.getElementById("td_matchEval");
const selectTeam = document.getElementById("selectTeam");
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
    console.log(teamList)
});

//Create Auto Table
createForm(match_layout.auto, 'auto', auto_td); //Create form
auto_td.addEventListener('click', function(event) {
    handelingCounter(event);
});

//Create Teleop Table
createForm(match_layout.teleop, 'teleop', teleop_td); //Create form
teleop_td.addEventListener('click', function(event) {
    handelingCounter(event);
});

//Create Endgame Table
createForm(match_layout.endGame, 'endGame', endGame_td); //Create form
endGame_td.addEventListener('click', function(event) {
    handelingCounter(event);
});

//Create matchEval Table
createForm(match_layout.matchEval, 'matchEval', matchEval_td);


//General function for handeling counter
function handelingCounter(event) {

// Add event listener to the parent element
    const target = event.target;

    // Check if the clicked element is a "remove" button
    if (target.matches('[id^="remove_"]')) {
        const task = target.id.replace('remove_', '');
        const numberElement = document.getElementById(`number_${task}`);
        let counter = parseInt(numberElement.textContent);
        if (counter > 0) {
            counter--;
            numberElement.textContent = counter;
        }
    }

    // Check if the clicked element is an "add" button
    if (target.matches('[id^="add_"]')) {
        const task = target.id.replace('add_', '');
        const numberElement = document.getElementById(`number_${task}`);
        let counter = parseInt(numberElement.textContent);
        counter++;
        numberElement.textContent = counter;
    }
}

});