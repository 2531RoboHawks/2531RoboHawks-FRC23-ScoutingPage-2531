//Firebase imported functions
import { ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// //(import *) lets you import everything from that file
// import * as teamDatabase from "../firebase.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

//Table and row
const tbody = document.getElementById("tbody");
const tr = document.getElementsByClassName("tr");

//Buttons
const saveButton = document.getElementById("saveButton");
const resetButton = document.getElementById("resetButton");
const updateButton = document.getElementById("updateButton");

//Input fields
const timeInput = document.getElementById("timeInput");
const matchInput = document.getElementById("matchInput");
const red1Input = document.getElementById("red1");
const red2Input = document.getElementById("red2");
const red3Input = document.getElementById("red3");
const blue1Input = document.getElementById("blue1");
const blue2Input = document.getElementById("blue2");
const blue3Input = document.getElementById("blue3");

//Make changes to corresponding regionals
const year = `2023`;
const event_key = `mndu`;

//Variables for API
const apiKey = 'HuPfMnMdd2A5uh6fVPjVmvycXADyZYWdArPFxaj3UsdVxsQZdqC31ST3bcIhinx0';
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version
const path = `/event/${year}${event_key}/matches`;
const url = `${baseUrl}${path}`;

//Variables used within the data handler
const timeArray = [];
const videoArray = [];
const videoURLs = [];
const matchArray = [];
const redAllianceArray = [];
const blueAllianceArray = [];


//TODO: (optional) if time >= localTime, then change color --see HTML JavaScript w3schools
//TODO: (optional) add hover effects --see firebase mobile app tutorial

//TODO: sort array based on match_level
//TODO: filter array based on comp_level: qm


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
        }
        
        //This section retrieves predicted_time from Blue Alliance one by one and store into timeArray.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            timeArray.splice(i, null, sortedAndFilteredMatches[i].predicted_time);
        }

        //Convert 'timeArray' into real times and store them into 'real_time' as an array.
        let real_time = timeArray.map(convertTimestampToRealTime); 
        console.log(real_time);
        
        for (let i = 0; i < real_time.length; i++) {
            //Print real_time onto the table
            document.getElementById(`timeInput_${i}`).innerHTML = real_time[i];
        }

        //This section retrieves video link from Blue Alliance one by one and store into videoArray.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            videoArray.splice(i, null, sortedAndFilteredMatches[i].videos[0]);
            videoURLs.splice(i, null,  `https://www.thebluealliance.com/watch/${videoArray[i].key}/${videoArray[i].type}`);
            console.log(videoURLs[i]);
            // document.getElementById(`link_${i}`).href = videoURLs[i];
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });




updateButton.addEventListener("click", function() {

});


// Function to convert a timestamp to a formatted date
const convertTimestampToRealTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


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
});