//TODO: change these variables to the attending regional
const year = `2023`; //yyyy
const event_key = `mndu`; //Found on 'apiDoc - Blue Alliance' OR 'Scoutradioz'

//Variables for API
const baseUrl = 'https://www.thebluealliance.com/api/v3'; // Adjust the base URL based on the TBA API version
const path = `/event/${year}${event_key}/matches`;
export const url = `${baseUrl}${path}`;