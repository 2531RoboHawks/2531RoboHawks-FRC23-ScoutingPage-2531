//Blue Alliance API Documentation: https://www.thebluealliance.com/apidocs/v3


// //Array of event-keys that we might use:
// const event_keys = [
//     `mndu`,     //Duluth
//     `ndgf`,     //GrandForks
//     `mnros`,    //MRI
//     `mnwz`,      //Blue Twilight Week Zero Invitational (Eagan)
//     `...`
// ]

// //NOT IN USE  --these can be obtained from BlueAlliance API.
// const team_keys = [
//     `frc2531`,
//     `frc2052`,
//     `...`
// ]

// //These are just references of API paths that we might use:
// const API_paths = [
//     `/team/{team_key}`,             //Team Info
//     `/team/{event_key}/teams/keys`  //List of all teams at event
// ]

const apiKey = 'HuPfMnMdd2A5uh6fVPjVmvycXADyZYWdArPFxaj3UsdVxsQZdqC31ST3bcIhinx0';
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version

//Make changes to corresponding regionals
const year = `2023`
const event_key = `mndu`;

// Make the API request for 
    const path = `/event/${year}${event_key}/matches/keys`;
    const url = `${baseUrl}${path}`;

    fetch(url, {
    method: 'GET',
    headers: {
        'X-TBA-Auth-Key': apiKey,
    },
    })
    .then(response => response.json())
    .then(data => {
        // Handle the data from the API response
        console.log(data[1].alliances.blue.team_keys[0]);
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });