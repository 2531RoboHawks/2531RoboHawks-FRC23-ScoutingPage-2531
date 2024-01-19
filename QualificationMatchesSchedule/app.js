//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, remove} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//HTML elements
const tbody = document.getElementById("tbody");
const tr = document.getElementsByClassName("tr");
const redAllianceElements = document.getElementsByClassName('redAlliance');
const blueAllianceElements = document.getElementsByClassName('blueAlliance');


//Buttons
const updateButton = document.getElementById("updateButton");

//TODO: change these variables to the attending regional
const year = `2023`; 
const event_key = `mndu`; //Found on apiDoc - Blue Alliance

//Variables for API
const apiKey_Firebase = ref(database, "apiKey"); //Stored in Firebase
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version
const path = `/event/${year}${event_key}/matches`;
const url = `${baseUrl}${path}`;

//Variables used within the data handler
const timeArray = [];
const actualTimeArray = [];
const matchArray = [];
const red1Array = [];
const red2Array = [];
const red3Array = [];
const blue1Array = [];
const blue2Array = [];
const blue3Array = [];

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {
//TODO: hide API Keys
//TODO: convert to actual time when available then change color --see HTML JavaScript w3schools
//TODO: (optional) add hover effects --see firebase mobile app tutorial

// updateButton.addEventListener("click", function() {
// location.reload();

onValue(apiKey_Firebase, function(snapshot) {
    let apiKey = Object.values(snapshot.val()).join(''); //Get apiKey from firebase 
    console.log(apiKey);

// Make the API request for data
fetch(url, {
    method: 'GET',
    headers: {
        'X-TBA-Auth-Key': apiKey,
    },
    })
    .then(response => response.json())

    //Most codes are written in this function because this is the only place that can access data.
    .then(data => { // Handle the data from the API response

        //This variable contains filtered and sorted data.
        let sortedAndFilteredMatches = data
            .filter(match => match.comp_level === 'qm') // Filter by comp_level 'qm'
            .sort((a, b) => a.match_number - b.match_number); // Sort by match_number
        console.log(sortedAndFilteredMatches);

        //Creates rows according to the amount of displayed data
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
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
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            timeArray.splice(i, null, sortedAndFilteredMatches[i].predicted_time);
            actualTimeArray.splice(i, null, sortedAndFilteredMatches[i].actual_time);
        }

        //Convert 'time' from Blue Alliance to 'real_time'.
        let converted_predicted_time = timeArray.map(convertTimestampToRealTime); 
        let converted_actual_time = actualTimeArray.map(convertTimestampToRealTime); 
        console.log(converted_actual_time);
        console.log(converted_predicted_time);

        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            if(actualTimeArray[i]) {
                document.getElementById(`timeElement_${i}`).innerHTML = converted_actual_time[i]; //Display actual_time onto the table
                document.getElementById(`timeElement_${i}`).style.backgroundColor = 'gray';
                document.getElementById(`matchElement_${i}`).style.backgroundColor = 'gray';
            }else {
                document.getElementById(`timeElement_${i}`).innerHTML = converted_predicted_time[i]; //Display predicted_time onto the table
            }
        }

        //This portion retrieves match_number from Blue Alliance one by one and stores it into matchArray.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            matchArray.splice(i, null, sortedAndFilteredMatches[i].match_number);
            document.getElementById(`matchElement_${i}`).innerHTML = matchArray[i]; //Display match_number onto the table
        }

        //This portion retrieves teams from Blue Alliance one by one and stores them into red1Array.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            red1Array.splice(i, null, sortedAndFilteredMatches[i].alliances.red.team_keys[0].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`red1_${i}`).innerHTML = red1Array[i]; //Display red1 teams onto the table
            red2Array.splice(i, null, sortedAndFilteredMatches[i].alliances.red.team_keys[1].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`red2_${i}`).innerHTML = red2Array[i]; //Display red2 teams onto the table
            red3Array.splice(i, null, sortedAndFilteredMatches[i].alliances.red.team_keys[2].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`red3_${i}`).innerHTML = red3Array[i]; //Display red3 teams onto the table

            blue1Array.splice(i, null, sortedAndFilteredMatches[i].alliances.blue.team_keys[0].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`blue1_${i}`).innerHTML = blue1Array[i]; //Display blue1 teams onto the table
            blue2Array.splice(i, null, sortedAndFilteredMatches[i].alliances.blue.team_keys[1].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`blue2_${i}`).innerHTML = blue2Array[i]; //Display blue2 teams onto the table
            blue3Array.splice(i, null, sortedAndFilteredMatches[i].alliances.blue.team_keys[2].slice(3)); //slice(3) slice out 'frc'
            document.getElementById(`blue3_${i}`).innerHTML = blue3Array[i]; //Display blue3 teams onto the table
        }

        //This portion looks for '2531' and changes color
        for (let i = 0; i < redAllianceElements.length; i++) {
            let currentRedAllianceValue = redAllianceElements[i].innerHTML;

            // Check if the current element's value is '2531'
            if (currentRedAllianceValue === '2531') {
                redAllianceElements[i].style.backgroundColor = 'yellow';
                redAllianceElements[i].style.color = 'purple';
                let time = redAllianceElements[i].id.slice(5); //Get id and then slice 'red_n' to 'n'
                document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`timeElement_${time}`).style.color = 'yellow';
                document.getElementById(`matchElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`matchElement_${time}`).style.color = 'yellow';
                    //Check if match won
                    if(sortedAndFilteredMatches[time].winning_alliance == 'red') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'lime';
                        document.getElementById(`timeElement_${time}`).style.color = 'mediumvioletred';
                    }else if (sortedAndFilteredMatches[time].winning_alliance == 'blue') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'darkred';
                    }else{
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Tie';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'black';
                    }
            }
        }
        for (let i = 0; i < redAllianceElements.length; i++) {
            let currentBlueAllianceValue = blueAllianceElements[i].innerHTML;

            // Check if the current element's value is '2531'
            if (currentBlueAllianceValue === '2531') {
                blueAllianceElements[i].style.backgroundColor = 'yellow';
                blueAllianceElements[i].style.color = 'purple';
                let time = blueAllianceElements[i].id.slice(6); //Get id and then slice 'blue_n' to 'n'
                document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`timeElement_${time}`).style.color = 'yellow';
                document.getElementById(`matchElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`matchElement_${time}`).style.color = 'yellow';
                    //Check if match won
                    if(sortedAndFilteredMatches[time].winning_alliance == 'blue') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'lime';
                        document.getElementById(`timeElement_${time}`).style.color = 'mediumvioletred';
                    }else if (sortedAndFilteredMatches[time].winning_alliance == 'red') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'darkred';
                    }else{
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Tie';
                        document.getElementById(`timeElement_${time}`).style.backgroundColor = 'black';
                    }
            }
        }

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
// });


// Function to convert a timestamp to a formatted date
const convertTimestampToRealTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

});
