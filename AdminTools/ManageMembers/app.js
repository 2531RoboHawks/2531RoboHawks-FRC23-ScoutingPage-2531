//Firebase imports
import { database } from "../../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  

//HTML elements: Side bar
const menuIcon = document.getElementById('menu-icon');
const allSections = document.querySelectorAll('section');
const sidebar = document.getElementById('section');

//HTML Elements: add-to-list
const nameInput = document.getElementById("add_name");
const roleInput = document.getElementById("add_role");
const respInput = document.getElementById("add_resp");

//HTML Elements: Buttons
const addButton = document.getElementById("addButton");
const deleteEl = document.getElementsByClassName("delete-cell");
const editEl = document.getElementsByClassName("edit-cell");


//Show sidebar
menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from propagating to the body
    // Toggle the sidebar's visibility by changing its left position
    sidebar.style.left = '0'; // Show sidebar
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

});