//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { fetchRegionalsList } from "../../Constants/API.js";

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
const regionalsList = ref(database, 'generalInfo/regionalsList');
const selectedRegional_ref = ref(database, 'generalInfo/selectedRegional')
const attendingTeams = ref(database, 'generalInfo/attendingTeams');

//HTML elements
const year_input = document.getElementById("year_input");
const selectRegional_input = document.getElementById("selectRegional");
const eventUpdate_Button = document.getElementById("eventUpdate_Button");
const yearUpdate_Button = document.getElementById("yearUpdate_Button");


onValue(regionalsList, function(snapshot) {
    //Add regionals to the list of options
    const regionalsList_Array = Object.values(snapshot.val());
    for(let i = 0; i < regionalsList_Array.length; i++) {
        selectRegional_input.innerHTML += `<option value="${regionalsList_Array[i].name}" id="regional_${i}">${regionalsList_Array[i].name}</option>`;
    }

    //Update both year and regional
    yearUpdate_Button.addEventListener("click", function() {
        let year = year_input.value;
        fetchRegionalsList(year);

        let regionalPosition = regionalsList_Array.findIndex(item => item.name === selectRegional_input.value);
        set(selectedRegional_ref, regionalsList_Array[regionalPosition]);

    });

    //Update only regional
    eventUpdate_Button.addEventListener("click", function() {
        let regionalPosition = regionalsList_Array.findIndex(item => item.name === selectRegional_input.value);
        set(selectedRegional_ref, regionalsList_Array[regionalPosition]);
    });
});

onValue(selectedRegional_ref, function(snapshot) {
    //Set value as current selected regional
    const selectedRegional = snapshot.val();
    console.log(selectedRegional);
    selectRegional_input.value = selectedRegional.name;
    year_input.value = selectedRegional.year;
});

});