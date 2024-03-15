//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//HTML elements
const menuIcon = document.getElementById('menu-icon');
const adminDir = document.getElementById('admin-directory');
const sidebar = document.getElementById('sidebar');
const adminBar = document.getElementById('admin-bar');


menuIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from propagating to the body

    // Toggle the sidebar's visibility by changing its left position
    if (sidebar.style.left === '-100%' || sidebar.style.left === '') {
        sidebar.style.left = '0'; // Show sidebar
    } else {
        sidebar.style.left = '-100%'; // Hide sidebar
    }
});

// adminDir.addEventListener('click', function(event) {
//     event.stopPropagation(); // Prevent the click event from propagating to the body

//     // Toggle the sidebar's visibility by changing its left position
//     if (adminBar.style.left === '-100%' || adminBar.style.left === '') {
//         adminBar.style.left = '0'; // Show adminBar
//         sidebar.style.left = '-100%'
//     } else {
//         adminBar.style.left = '-100%'; // Hide adminBar
//     }
// })

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

// Close the sidebar if a click event occurs outside of it
document.body.addEventListener('click', function() {
    sidebar.style.left = '-100%'; // Hide sidebar
});

});