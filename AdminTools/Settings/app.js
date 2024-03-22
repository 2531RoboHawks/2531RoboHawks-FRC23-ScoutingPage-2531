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
const status = document.getElementById("status");
const year_input = document.getElementById("year_input");
const selectRegional_input = document.getElementById("selectRegional");
const eventUpdate_Button = document.getElementById("eventUpdate_Button");
const yearUpdate_Button = document.getElementById("yearUpdate_Button");
const menuIcon = document.getElementById('menu-icon');
const allSections = document.querySelectorAll('section');
const sidebar = document.getElementById('section');

//TODO: admin only access

//Hide status block
status.style.display = 'none';

//Show sidebar
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from propagating to the body
    // Toggle the sidebar's visibility by changing its left position
    if(sidebar) {
            sidebar.style.left = '0'; // Show sidebar
    }
});


// Add click event listener to custom links
document.querySelectorAll('.custom-link').forEach(link => {
    link.addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        if (href) {
            // Navigate to the specified URL
            window.location.href = href;
        }
    });
});

// Close all sections if a click event occurs outside of it
document.addEventListener('click', function(event) {
    // Check if the clicked element is within a section
    if (!event.target.closest('section')) {
        for (let i = 0; i < allSections.length; i++) {
            allSections[i].style.left = '-100%'; // Hide section
        }
    }
});

onValue(regionalsList, function(snapshot) {
    //Add regionals to the list of options
    const regionalsList_Array = Object.values(snapshot.val());
    for(let i = 0; i < regionalsList_Array.length; i++) {
        selectRegional_input.innerHTML += `<option value="${regionalsList_Array[i].name}" id="regional_${i}">${regionalsList_Array[i].name}</option>`;
    }
    
    //Update year and regionalsList
    yearUpdate_Button.addEventListener("click", function() {
        fetchRegionalsList(year_input.value);
        set(year_ref, year_input.value);
        //Remove all existing options
        for(let i = 0; i < regionalsList_Array.length; i++) {
            selectRegional_input.innerHTML -= `<option value="${regionalsList_Array[i].name}" id="regional_${i}">${regionalsList_Array[i].name}</option>`;
        }
        //Add new options according to year_input
        for(let i = 0; i < regionalsList_Array.length; i++) {
            selectRegional_input.innerHTML += `<option value="${regionalsList_Array[i].name}" id="regional_${i}">${regionalsList_Array[i].name}</option>`;
        }
        alert("Year is updated!\nPlease update regional as well!! --even if regional name stays the same")
    });

    //Update selected regional
    eventUpdate_Button.addEventListener("click", function() {
        let regionalPosition = regionalsList_Array.findIndex(item => item.name === selectRegional_input.value);
        setTimeout(function() {
            set(event_code_ref, regionalsList_Array[regionalPosition].event_code);
            set(selectedRegional_ref, regionalsList_Array[regionalPosition]);
            console.log(regionalsList_Array[regionalPosition]);
            fetchQualSchedule();
            fetchAttendingTeams();
        }, 1000);

        status.innerText = 'Updated successfully!';
        status.style.display = 'block';
        setTimeout(() => {
            status.style.display = 'none';
        }, 1500);
    });
});

onValue(selectedRegional_ref, function(snapshot) {
//Set value as current selected regional
const selectedRegional = snapshot.val();
selectRegional_input.value = selectedRegional.name;
year_input.value = selectedRegional.year;
});


});
