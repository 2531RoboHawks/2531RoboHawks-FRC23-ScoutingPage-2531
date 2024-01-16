//HTML elements
const tbody = document.getElementById("tbody");
const tr = document.getElementsByClassName("tr");
const redAllianceElements = document.getElementsByClassName('redAlliance');
const blueAllianceElements = document.getElementsByClassName('blueAlliance');


//Buttons
const updateButton = document.getElementById("updateButton");

//Make changes to corresponding regionals
const year = `2023`;
const event_key = `mndu`;

//Variables for API
const apiKey = 'HuPfMnMdd2A5uh6fVPjVmvycXADyZYWdArPFxaj3UsdVxsQZdqC31ST3bcIhinx0'; //TODO: hide API key
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version
const path = `/event/${year}${event_key}/matches`;
const url = `${baseUrl}${path}`;

//Variables used within the data handler
const timeArray = [];
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
        //This section retrieves predicted_time from Blue Alliance one by one and stores it into timeArray.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            timeArray.splice(i, null, sortedAndFilteredMatches[i].predicted_time);
        }

        //Convert 'timeArray' into real times and store them into 'real_time' as an array.
        let real_time = timeArray.map(convertTimestampToRealTime); 
        console.log(real_time);

        for (let i = 0; i < real_time.length; i++) {
            document.getElementById(`timeElement_${i}`).innerHTML = real_time[i]; //Display real_time onto the table
        }

        //This section retrieves match_number from Blue Alliance one by one and stores it into matchArray.
        for (let i = 0; i < sortedAndFilteredMatches.length; i++) {
            //format: array.splice(index, how_many, item_1, ..., item_n)
            matchArray.splice(i, null, sortedAndFilteredMatches[i].match_number);
            document.getElementById(`matchElement_${i}`).innerHTML = matchArray[i]; //Display match_number onto the table
        }

        //This section retrieves teams from Blue Alliance one by one and stores them into red1Array.
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

        //This section looks for '2531' and changes color
        for (let i = 0; i < redAllianceElements.length; i++) {
            let currentRedAllianceValue = redAllianceElements[i].innerHTML;
            // Check if the current element's value is '2531'
            if (currentRedAllianceValue === '2531') {
                redAllianceElements[i].style.backgroundColor = 'yellow';
                redAllianceElements[i].style.color = 'purple';
                let time = redAllianceElements[i].id.slice(5);
                document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`timeElement_${time}`).style.color = 'yellow';
                    //Check if match won
                    if(sortedAndFilteredMatches[time].winning_alliance == 'red') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                    }else if (sortedAndFilteredMatches[time].winning_alliance == 'blue') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                    }
            }
        }
        for (let i = 0; i < redAllianceElements.length; i++) {
            let currentBlueAllianceValue = blueAllianceElements[i].innerHTML;

            // Check if the current element's value is '2531'
            if (currentBlueAllianceValue === '2531') {
                blueAllianceElements[i].style.backgroundColor = 'yellow';
                blueAllianceElements[i].style.color = 'purple';
                let time = blueAllianceElements[i].id.slice(6);
                console.log(time);
                document.getElementById(`timeElement_${time}`).style.backgroundColor = 'purple';
                document.getElementById(`timeElement_${time}`).style.color = 'yellow';
                    //Check if match won
                    if(sortedAndFilteredMatches[time].winning_alliance == 'blue') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Won';
                    }else if (sortedAndFilteredMatches[time].winning_alliance == 'red') {
                        document.getElementById(`timeElement_${time}`).innerHTML = 'Lost';
                    }
            }
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

});
