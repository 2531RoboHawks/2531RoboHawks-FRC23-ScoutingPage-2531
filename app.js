//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
// //(import *) lets you import everything from that file
// import * as teamDatabase from "../firebase.js";

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'HuPfMnMdd2A5uh6fVPjVmvycXADyZYWdArPFxaj3UsdVxsQZdqC31ST3bcIhinx0';
    const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version
    
    //Make changes to corresponding regionals
    const year = `2023`
    const event_key = `mndu`;
    
    // Make the API request for 
    const path = `/event/${year}${event_key}/matches`;
    const url = `${baseUrl}${path}`;

    fetch(url, {
    method: 'GET',
    headers: {
        'X-TBA-Auth-Key': apiKey,
    },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // 'sortedMatches' contains the match information in the order of 'match_number'
        let sortedMatches = data.sort((a, b) => a.match_number - b.match_number);
        console.log(sortedMatches);

        let sortedAndFilteredMatches = data
            .filter(match => match.comp_level === 'qm') // Filter by comp_level 'qm'
            .sort((a, b) => a.match_number - b.match_number); // Sort by match_number
        console.log(sortedAndFilteredMatches);
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });
});