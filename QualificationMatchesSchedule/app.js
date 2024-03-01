//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import * as constants from "../Constants.js";

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
const matchesData = ref(database, 'qualSchedule/matchesData');
const lastUpdate = ref(database, 'qualSchedule/lastUpdate');

//HTML elements
const updatedTime_element = document.getElementById("updatedTime");
const tbody = document.getElementById("tbody");
const tr = document.getElementsByClassName("tr");
const redAllianceElements = document.getElementsByClassName('redAlliance');
const blueAllianceElements = document.getElementsByClassName('blueAlliance');

//Variables used within the data handler
const predictedTimeArray = [];
const actualTimeArray = [];
const matchArray = [];
const red1Array = [];
const red2Array = [];
const red3Array = [];
const blue1Array = [];
const blue2Array = [];
const blue3Array = [];


onValue(lastUpdate, function(snapshot) {
    let updatedTime = snapshot.val();
    
    //On every ____ ms, the website will retrieve data from Blue Alliance to Firebase
    if(Date.now() - updatedTime >= 300000) {
        constants.fetchQualSchedule();
    }
    
    //Takes the updatedTime and convert it to real time for reference
    let convertedTime = convertTimeStamp(updatedTime);
    let minutesAgo = new Date((Date.now() - updatedTime)).getMinutes();
    let secondsAgo = new Date((Date.now() - updatedTime)).getSeconds();

    //Display on webpage
    updatedTime_element.innerHTML += `${convertedTime} <br> (${minutesAgo} min ${secondsAgo} sec ago)`;
});


/* Everything from here is only handling data from Firebase */

onValue(matchesData, function(snapshot) {
    let qualData_firebase = Object.values(snapshot.val());
    console.log(qualData_firebase);

    //Creates rows according to the amount of displayed data
    for (let i = 0; i < qualData_firebase.length; i++) {
        tbody.innerHTML += `<tr class="tr">
        <td class = "time" id="timeElement_${tr.length}">
        </td>
        <td class = "matchNumber" id="matchElement_${tr.length}" >
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
    }
    //This portion retrieves predicted_time from Blue Alliance one by one and stores it into timeArray.
    for (let i = 0; i < qualData_firebase.length; i++) {
        //format: array.splice(index, how_many, item_1, ..., item_n)
        predictedTimeArray.splice(i, null, qualData_firebase[i].predicted_time);
        actualTimeArray.splice(i, null, qualData_firebase[i].actual_time);
    }

    //Convert 'time' from Blue Alliance to 'real_time'.
    let converted_predicted_time = predictedTimeArray.map(convertFRCTimestamps); 
    let converted_actual_time = actualTimeArray.map(convertFRCTimestamps); 
    console.log("predicted_time: " + converted_predicted_time);
    console.log("actual_time: " + converted_actual_time);

    for (let i = 0; i < qualData_firebase.length; i++) {
        if(actualTimeArray[i]) {
            document.getElementById(`timeElement_${i}`).innerHTML = converted_actual_time[i]; //Display actual_time onto the table
            document.getElementById(`timeElement_${i}`).style.backgroundColor = 'gray';
            document.getElementById(`matchElement_${i}`).style.backgroundColor = 'gray';
        }else {
            document.getElementById(`timeElement_${i}`).innerHTML = converted_predicted_time[i]; //Display predicted_time onto the table
        }
    }

    //This portion retrieves match_number from Blue Alliance one by one and stores it into matchArray.
    for (let i = 0; i < qualData_firebase.length; i++) {
        //format: array.splice(index, how_many, item_1, ..., item_n)
        matchArray.splice(i, null, qualData_firebase[i].match_number);
        document.getElementById(`matchElement_${i}`).innerHTML = matchArray[i]; //Display match_number onto the table
    }

    //This portion retrieves teams from Blue Alliance one by one and stores them into red1Array.
    for (let i = 0; i < qualData_firebase.length; i++) {
        //format: array.splice(index, how_many, item_1, ..., item_n)
        red1Array.splice(i, null, qualData_firebase[i].alliances.red.team_keys[0].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`red1_${i}`).innerHTML = red1Array[i]; //Display red1 teams onto the table
        red2Array.splice(i, null, qualData_firebase[i].alliances.red.team_keys[1].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`red2_${i}`).innerHTML = red2Array[i]; //Display red2 teams onto the table
        red3Array.splice(i, null, qualData_firebase[i].alliances.red.team_keys[2].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`red3_${i}`).innerHTML = red3Array[i]; //Display red3 teams onto the table

        blue1Array.splice(i, null, qualData_firebase[i].alliances.blue.team_keys[0].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`blue1_${i}`).innerHTML = blue1Array[i]; //Display blue1 teams onto the table
        blue2Array.splice(i, null, qualData_firebase[i].alliances.blue.team_keys[1].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`blue2_${i}`).innerHTML = blue2Array[i]; //Display blue2 teams onto the table
        blue3Array.splice(i, null, qualData_firebase[i].alliances.blue.team_keys[2].slice(3)); //slice(3) slice out 'frc'
        document.getElementById(`blue3_${i}`).innerHTML = blue3Array[i]; //Display blue3 teams onto the table
    }

    //This portion looks for '2531' and changes color
    for (let i = 0; i < redAllianceElements.length; i++) {
        let currentRedAllianceValue = redAllianceElements[i].innerHTML;

        // Check if the current element's value is '2531'
        if (currentRedAllianceValue === '2531') {
            redAllianceElements[i].style.backgroundColor = 'gold';
            redAllianceElements[i].style.color = 'purple';
            let time = redAllianceElements[i].id.slice(5); //Get id and then slice 'red_n' to 'n'
            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
            document.getElementById(`timeElement_${time}`).style.color = 'gold';
            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'purple';
            document.getElementById(`matchElement_${time}`).style.color = 'gold';
                for(let i = 0; i < qualData_firebase.length; i++) {
                    if(typeof actualTimeArray[i] === "number" && actualTimeArray[i] > 0) {
                        //Check if match won
                        if(qualData_firebase[time].winning_alliance == 'red') {
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'lime';
                            document.getElementById(`timeElement_${time}`).style.color = 'mediumvioletred';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }else if (qualData_firebase[time].winning_alliance == 'blue') {
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'darkred';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }else{
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Tie';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'black';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }
                    }
                }
                
                
        }
    }
    for (let i = 0; i < redAllianceElements.length; i++) {
        let currentBlueAllianceValue = blueAllianceElements[i].innerHTML;

        // Check if the current element's value is '2531'
        if (currentBlueAllianceValue === '2531') {
            blueAllianceElements[i].style.backgroundColor = 'gold';
            blueAllianceElements[i].style.color = 'purple';
            let time = blueAllianceElements[i].id.slice(6); //Get id and then slice 'blue_n' to 'n'
            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
            document.getElementById(`timeElement_${time}`).style.color = 'gold';
            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'purple';
            document.getElementById(`matchElement_${time}`).style.color = 'gold';
                for(let i = 0; i < qualData_firebase.length; i++) {
                    if(typeof actualTimeArray[i] === "number" && actualTimeArray[i] > 0) {
                        // Check if match won
                        if(qualData_firebase[time].winning_alliance == 'blue') {
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'lime';
                            document.getElementById(`timeElement_${time}`).style.color = 'mediumvioletred';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }else if (qualData_firebase[time].winning_alliance == 'red') {
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'darkred';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }else{
                            document.getElementById(`timeElement_${time}`).innerHTML = 'Tie';
                            document.getElementById(`timeElement_${time}`).style.backgroundColor = 'black';
                            document.getElementById(`matchElement_${time}`).style.backgroundColor = 'gray';
                            document.getElementById(`matchElement_${time}`).style.color = 'purple';
                        }
                    }
                }
                
                
        }
    }
});

    //Converts Date.now() to hour:min
    const convertTimeStamp = (timestamp) => {
        const currentDate = new Date(timestamp); 
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds();
        return `${hours}:${minutes}`;
};

    //Converts FRC timestamps to hour:min
    const convertFRCTimestamps = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
};
});
