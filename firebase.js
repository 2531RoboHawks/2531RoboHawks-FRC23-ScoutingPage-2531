// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
//initializeApp(): *one-time-use*, to initialize our app with app settings *app settings are set on firebase*

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

// Database for Qualification Matches Schedule
export const qualTable = ref(database, "qualSchedule");
export const qualRow = ref(database, "qualSchedule/Row");
export const qualTime = ref(database, "qualSchedule/Time");
export const qualMatch = ref(database, "qualSchedule/Match");
export const qualRed1 = ref(database, "qualSchedule/Red1");
export const qualRed2 = ref(database, "qualSchedule/Red2");
export const qualRed3 = ref(database, "qualSchedule/Red3");
export const qualBlue1 = ref(database, "qualSchedule/Blue1");
export const qualBlue2 = ref(database, "qualSchedule/Blue2");
export const qualBlue3 = ref(database, "qualSchedule/Blue3");

// Database for Practice Match Schedule
export const pracTable = ref(database, "pracSchedule");
export const pracRow = ref(database, "pracSchedule/Row");
export const pracTime = ref(database, "pracSchedule/Time");
export const pracMatch = ref(database, "pracSchedule/Match");
export const pracRed1 = ref(database, "pracSchedule/Red1");
export const pracRed2 = ref(database, "pracSchedule/Red2");
export const pracRed3 = ref(database, "pracSchedule/Red3");
export const pracBlue1 = ref(database, "pracSchedule/Blue1");
export const pracBlue2 = ref(database, "pracSchedule/Blue2");
export const pracBlue3 = ref(database, "pracSchedule/Blue3");

// Database for InstandScoutingData
let team;
export function getTeamNum(team) {
    team = localStorage.getItem("intandData/teamInfo/teamNum");
    console.log(team);
    return team;
}

export const team_instand = ref(database, `instandScouting/${team}`);
export const matchNum_instand = ref(database, `instandScouting/${team}/teamInfo/matchNum`);
export const teamNum_instand = ref(database, `instandScouting/${team}/teamInfo/teamNum`);
export const alliance_instand = ref(database, `instandScouting/${team}/teamInfo/alliance`);
export const highCones_Auto_instand = ref(database, `instandScouting/${team}/autoData/high/Cones`);
export const highCubes_Auto_instand = ref(database, `instandScouting/${team}/autoData/high/Cubes`);
export const midCones_Auto_instand = ref(database, `instandScouting/${team}/autoData/mid/Cones`);
export const midCubes_Auto_instand = ref(database, `instandScouting/${team}/autoData/mid/Cubes`);
export const lowCones_Auto_instand = ref(database, `instandScouting/${team}/autoData/low/Cones`);
export const lowCubes_Auto_instand = ref(database, `instandScouting/${team}/autoData/low/Cubes`);
export const chargingStation_Auto_instand = ref(database, `instandScouting/${team}/autoData/chargingStation`);
export const highCones_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/high/Cones`);
export const highCubes_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/high/Cubes`);
export const midCones_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/mid/Cones`);
export const midCubes_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/mid/Cubes`);
export const lowCones_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/low/Cones`);
export const lowCubes_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/low/Cubes`);
export const chargingStation_Teleop_instand = ref(database, `instandScouting/${team}/teleopData/chargingStation`);
export const matchResult_instand = ref(database, `instandScouting/${team}/matchResult`);
export const comments_instand = ref(database, `instandScouting/${team}/comments`);