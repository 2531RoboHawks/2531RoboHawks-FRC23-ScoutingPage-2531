//Firebase imported functions
import { ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

//(import *) lets you import everything from that file
import * as teamDatabase from "../firebase.js";


//Table and row
const tbody = document.getElementById("tbody");
const tr = document.getElementsByClassName("tr");

//Buttons
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");

//Input fields
const timeInput = document.getElementById("timeInput");
const matchInput = document.getElementById("matchInput");
const red1Input = document.getElementById("red1");
const red2Input = document.getElementById("red2");
const red3Input = document.getElementById("red3");
const blue1Input = document.getElementById("blue1");
const blue2Input = document.getElementById("blue2");
const blue3Input = document.getElementById("blue3");


//TODO: user validation
//TODO: add delete function designated to each row
//TODO: add edit function designated to each row

//TODO: (optional) if time >= localTime, then change color --see HTML JavaScript w3schools
//TODO: (optional) add hover effects --see firebase mobile app tutorial


updateTable(); //Get saved data as soon as page open

//Push input to database and add row
saveButton.addEventListener("click", function() {
    //These will push user inputs to database
    saveTime();
    saveMatchNum();
    saveRed1();
    saveRed2();
    saveRed3();
    saveBlue1();
    saveBlue2();
    saveBlue3();
    
    addEmptyRow(); //Adds empty row for new inputs that are programmed to display immediately
    resetInputFields(); //Empty input fields after inputs are saved.
    console.log("save_" + (tr.length - 1));
});

//resets the whole table
resetButton.addEventListener("dblclick", function() {
    reset();
});

/*** Below are only for functions ***/

//Get saved data from database
function updateTable() {
    onValue(teamDatabase.qualRow, function(snapshot) {
    let rowArray = Object.values(snapshot.val());
    tbody.innerHTML = rowArray.join(""); //join("") replaces "," to "" between values in rowArray

        for(let i = 0; i < tr.length; i++) {
            onValue(teamDatabase.qualTime, function(snapshot) {
            let timeArray = Object.values(snapshot.val());
            document.getElementById("timeInput_"+(i)).innerHTML = timeArray[i];
            console.log(timeArray[i]); 
            });
        
            onValue(teamDatabase.qualMatch, function(snapshot) {
            let matchArray = Object.values(snapshot.val());
            document.getElementById("matchInput_"+(i)).innerHTML = matchArray[i];
            console.log(matchArray[i]);
            });
        
            onValue(teamDatabase.qualRed1, function(snapshot) {
            let red1Array = Object.values(snapshot.val());
            document.getElementById("red1_"+(i)).innerHTML = red1Array[i];
            console.log(red1Array[i]);
            });
            
            onValue(teamDatabase.qualRed2, function(snapshot) {
            let red2Array = Object.values(snapshot.val());
            document.getElementById("red2_"+(i)).innerHTML = red2Array[i];
            console.log(red2Array[i]);
            });
            
            onValue(teamDatabase.qualRed3, function(snapshot) {
            let red3Array = Object.values(snapshot.val());
            document.getElementById("red3_"+(i)).innerHTML = red3Array[i];
            console.log(red3Array[i]);
            });
        
            onValue(teamDatabase.qualBlue1, function(snapshot) {
            let blue1Array = Object.values(snapshot.val());
            document.getElementById("blue1_"+(i)).innerHTML = blue1Array[i];
            console.log(blue1Array[i]);
            });
        
            onValue(teamDatabase.qualBlue2, function(snapshot) {
            let blue2Array = Object.values(snapshot.val());
            document.getElementById("blue2_"+(i)).innerHTML = blue2Array[i];
            console.log(blue2Array[i]);
            });
            
            onValue(teamDatabase.qualBlue3, function(snapshot) {
            let blue3Array = Object.values(snapshot.val());
            document.getElementById("blue3_"+(i)).innerHTML = blue3Array[i];
            console.log(blue3Array[i]);
            });
        }
    });
}

function saveTime() {
    let timeInput = document.getElementById("timeInput").value;
    push(teamDatabase.qualTime, timeInput);
}

function saveMatchNum() {
    let matchInput = document.getElementById("matchInput").value;
    push(teamDatabase.qualMatch, matchInput);
}

function saveRed1() {
    let red1 = document.getElementById("red1").value;
    push(teamDatabase.qualRed1, red1);
}

function saveRed2() {
    let red2 = document.getElementById("red2").value;
    push(teamDatabase.qualRed2, red2);
}

function saveRed3() {
    let red3 = document.getElementById("red3").value;
    push(teamDatabase.qualRed3, red3);
}

function saveBlue1() {
    let blue1 = document.getElementById("blue1").value;
    push(teamDatabase.qualBlue1, blue1);
}

function saveBlue2() {
    let blue2 = document.getElementById("blue2").value;
    push(teamDatabase.qualBlue2, blue2);
}

function saveBlue3() {
    let blue3 = document.getElementById("blue3").value;
    push(teamDatabase.qualBlue3, blue3);
}

function addEmptyRow() {
    let newRow = `<tr class="tr">
        <td class = "time" id="timeInput_${tr.length}">
        </td>
        <td class = "matchNumber" id="matchInput_${tr.length}" >
        </td>
        <td class = "redAlliance" id="red1_${tr.length}">
        </td>
        <td class = "redAlliance" id="red2_${tr.length}">
        </td>
        <td class = "redAlliance" id="red3_${tr.length}">
        </td>
        <td class = "blueAlliance" id="blue1_${tr.length}">
        </td>
        <td class = "blueAlliance" id="blue2_${tr.length}">
        </td>
        <td class = "blueAlliance" id="blue3_${tr.length}">
        </td>
    </tr>`;
    tbody.innerHTML += newRow;
    push(teamDatabase.qualRow, newRow);
}

function resetInputFields() {
    timeInput.value = "";
    matchInput.value = "";
    red1Input.value = "";
    red2Input.value = "";
    red3Input.value = "";
    blue1Input.value = "";
    blue2Input.value = "";
    blue3Input.value = "";
}

// Something in the remove lastRow and lastTime that made it to delete everything

function removeLastRow() {
    
    onValue(teamDatabase.qualRow, function(snapshot) {
        let rowIDs = Object.keys(snapshot.val());
        let lastRowID = rowIDs[rowIDs.length - 1]; //Gets the ID of last row
        let lastRow = ref(database, `qualSchedule/Row/${lastRowID}`); //Refers to last row
            if(rowIDs.length > 0) {
                remove(lastRow); //Removes last value from table on database
            }
    });
            
    onValue(teamDatabase.qualTime, function(snapshot) {
        let timeIDs = Object.keys(snapshot.val());
        let lastTimeID = timeIDs[timeIDs.length - 1]; //Gets the timeID of last row
        let lastTime = ref(database, `qualSchedule/Time/${lastTimeID}`); //Refers to time of last row
            if(timeIDs.length > 0) {
                remove(lastTime); //Removes last value from time on database
            }
    });
            
    onValue(teamDatabase.qualMatch, function(snapshot) {
        let matchIDs = Object.keys(snapshot.val());
        let lastMatchID = matchIDs[matchIDs.length - 1]; //Gets the matchID of last row
        let lastMatch = ref(database, `qualSchedule/Match/${lastMatchID}`); //Refers to match of last row
            if(matchIDs.length > 0) {
                remove(lastMatch); //Removes last value from matches on database
            }
    });

    onValue(teamDatabase.qualRed1, function(snapshot) {
        let red1IDs = Object.keys(snapshot.val());
        let lastRed1ID = red1IDs[red1IDs.length - 1]; //Gets the red1ID of last row
        let lastRed1 = ref(database, `qualSchedule/Red1/${lastRed1ID}`); //Refers to red1 of last row
            if(red1IDs.length > 0) {
                remove(lastRed1); //Removes last value from red1 on database
            }
    });

    onValue(teamDatabase.qualRed2, function(snapshot) {
        let red2IDs = Object.keys(snapshot.val());
        let lastRed2ID = red2IDs[red2IDs.length - 1]; //Gets the red2ID of last row
        let lastRed2 = ref(database, `qualSchedule/Red2/${lastRed2ID}`); //Refers to red2 of last row
            if(red2IDs.length > 0 ) {
                remove(lastRed2); //Removes last value from red2 on database
            }
    });
   
    onValue(teamDatabase.qualRed3, function(snapshot) {
        let red3IDs = Object.keys(snapshot.val());
        let lastRed3ID = red3IDs[red3IDs.length - 1]; //Gets the red3ID of last row
        let lastRed3 = ref(database, `qualSchedule/Red3/${lastRed3ID}`); //Refers to red3 of last row
            if(red3IDs.length > 0) {
                remove(lastRed3); //Removes last value from red3 on database
            }
    });
            
    onValue(teamDatabase.qualBlue1, function(snapshot) {
        let blue1IDs = Object.keys(snapshot.val());
        let lastBlue1ID = blue1IDs[blue1IDs.length - 1]; //Gets the blue1ID of last row
        let lastBlue1 = ref(database, `qualSchedule/Blue1/${lastBlue1ID}`); //Refers to blue1 of last row
            if(blue1IDs.length > 0) {
                remove(lastBlue1); //Removes last value from blue1 on database
            }
    });

    onValue(teamDatabase.qualBlue2, function(snapshot) {
        let blue2IDs = Object.keys(snapshot.val());
        let lastBlue2ID = blue2IDs[blue2IDs.length - 1]; //Gets the blue2ID of last row
        let lastBlue2 = ref(database, `qualSchedule/Blue2/${lastBlue2ID}`); //Refers to blue2 of last row
            if(blue2IDs.length > 0) {
                remove(lastBlue2); //Removes last value from blue2 on database
            }
    });

    onValue(teamDatabase.qualBlue3, function(snapshot) {
        let blue3IDs = Object.keys(snapshot.val());
        let lastBlue3ID = blue3IDs[blue3IDs.length - 1]; //Gets the blue3ID of last row
        let lastBlue3 = ref(database, `qualSchedule/Blue3/${lastBlue3ID}`); //Refers to blue3 of last row
            if(blue3IDs.length > 0) {
                remove(lastBlue3); //Removes last value from blue3 on database
            }
    });
}

function reset() {
    remove(teamDatabase.qualTable); //Remove all data from database
    tbody.innerHTML = ""
    ; //Resets table on the front-end
}