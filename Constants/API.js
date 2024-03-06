//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//Firebase reference
const apiKey_Firebase = ref(database, "apiKey"); //Stored in Firebase
const matchesData = ref(database, 'qualSchedule/matchesData');
const lastUpdate = ref(database, 'qualSchedule/lastUpdate');
const teamInfo = ref(database, 'generalInfo/teamInfo');
const scoutingData = ref(database, 'scoutingData');

//Variables for API
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version

//TODO: change these variables to the attending regional
const year = `2024`; //yyyy
const event_key = `mndu`; //Found on 'apiDoc - Blue Alliance' OR 'Scoutradioz'
export const team_number = '2531';

//Function to fetch Qualification Matches Schedule
export function fetchQualSchedule() {
    const url = `${baseUrl}/event/${year}${event_key}/matches`;

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
            
            // Handle the data from the API response
            .then(data => { 
            
                //This variable contains filtered and sorted data.
                let sortedAndFilteredMatches = data
                    .filter(match => match.comp_level === 'qm') // Filter by comp_level 'qm'
                    .sort((a, b) => a.match_number - b.match_number); // Sort by match_number
                    
                    set(matchesData, sortedAndFilteredMatches); //Push data to Firebase
                    set(lastUpdate, Date.now()); //Update on the updatedTime
            })
            .catch(error => {
                console.error(error);
            });
        
    });
}

//Function to fetch all attending teams and their info
export function fetchAttendingTeams() {
    const url = `${baseUrl}/event/${year}${event_key}/teams`;

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
            
            // Handle the data from the API response
            .then(data => {
                let sortedTeamsByNumber = data
                    .sort((a, b) => a.team_number - b.team_number); // Sort by team_number
                set(teamInfo, sortedTeamsByNumber); //Upload teamInfo to Firebase
            })
            .catch(error => {
                console.error(error);
            });
        
    });
}