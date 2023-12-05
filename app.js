//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
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
        let sortedMatches = data.sort((a, b) => a.match_number - b.match_number);

        // Now 'sortedMatches' contains the match information in the order of 'match_number'
        console.log(sortedMatches);
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });
});