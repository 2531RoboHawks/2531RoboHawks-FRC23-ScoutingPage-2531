//Firebase imports
import { database } from "../../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

import { fetchAttendingTeams, fetchQualSchedule, fetchRegionalsList } from "../../Constants/API.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

//Firebase reference
const regionalsList = ref(database, 'generalInfo/regionalsList');
const selectedRegional_ref = ref(database, 'generalInfo/selectedRegional');
const attendingTeams = ref(database, 'generalInfo/attendingTeams');
const year_ref = ref(database, 'generalInfo/year');
const event_code_ref = ref(database, 'generalInfo/event_code');

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
        fetchQualSchedule();
        fetchAttendingTeams();

        let regionalPosition = regionalsList_Array.findIndex(item => item.name === selectRegional_input.value);
        set(selectedRegional_ref, regionalsList_Array[regionalPosition]);
        console.log(regionalsList_Array[regionalPosition].event_code);
        set(year_ref, year_input.value);
        set(event_code_ref, regionalsList_Array[regionalPosition].event_code);

    });

    //Update only regional
    eventUpdate_Button.addEventListener("click", function() {
        let regionalPosition = regionalsList_Array.findIndex(item => item.name === selectRegional_input.value);
        set(selectedRegional_ref, regionalsList_Array[regionalPosition]);
        fetchQualSchedule();
        fetchAttendingTeams();
    });
});

onValue(selectedRegional_ref, function(snapshot) {
    //Set value as current selected regional
    const selectedRegional = snapshot.val();
    selectRegional_input.value = selectedRegional.name;
    year_input.value = selectedRegional.year;
});

});