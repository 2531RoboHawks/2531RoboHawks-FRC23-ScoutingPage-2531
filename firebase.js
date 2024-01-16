// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

// Follow this pattern to import other Firebase services
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-analytics.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app-check.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-functions.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-storage.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-performance.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-remote-config.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-messaging.js";
    // import {} from "https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-database.js";

import { getDatabase, ref, push, onValue, update, remove, set, child, get} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";
    /* 
        All functions listed after ref() are not used in this js file.
        They're just there for future coders to reference.
        You can find out what each one does in firebase documentation.
        Import only the functions that you need.
    */

import * as teamNum_instandLocal from "./InstandScoutingForm/app.js";

const appSettings = {
    databaseURL: "https://scoutingapp-e16c4-default-rtdb.firebaseio.com/"
}
      
// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

//Users and authentication
export const memberUser = ref(database, "authentication/member/user");
export const memberPass = ref(database, "authentication/member/pass");

