//Firebase imports
import { database } from "../../Constants/firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {  

//Firebase refs
const user_ref = ref(database, "user/all");
const coaches_mentors_ref = ref(database, "users/cm");
const admin_ref = ref(database, "users/admin");
const members_ref = ref(database, "users/members");
const others_ref = ref(database, "users/others");


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
const deleteElList = document.querySelectorAll(".delete-cell");
const editElList = document.querySelectorAll(".edit-cell");


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

//Add Member Button
addButton.addEventListener("click", addUser);

//Listen for any click events on all edit elements
editElList.forEach(function(editEl) {
    editEl.addEventListener("click", function () {
        //Identify id on clicked element
        console.log(this.getAttribute("id"));
    })
    
});

function addUser() {
    // onValue(user_ref, function(snapshot) {
    //     const userList = Object.values(snapshot.val());
    //     const input = {
    //         name: nameInput.value,
    //         role: roleInput.value,
    //         resp: respInput.value
    //     }
    //     set(ref(database, `users/all/${userList.length}, ${input}`));
    // });
    nameInput.value = '';
}

function deleteRow() {

}

function editRow() {

}

});