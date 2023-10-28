//Firebase imported functions
import { ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

//(import *) lets you import everything from that file
import * as teamDatabase from "../firebase.js";

//TeamInfo inputs
const matchNum = document.getElementById("matchNum");
const teamNum = document.getElementById("teamNum");
const allianceBlue = document.getElementById("allianceBlue");
const allianceRed = document.getElementById("allianceRed");

//Auto inputs
const highCones_Auto = document.getElementById("highCones_Auto");
const highCubes_Auto = document.getElementById("highCubes_Auto");
const midCones_Auto = document.getElementById("midCones_Auto");
const midCubes_Auto = document.getElementById("midCubes_Auto");
const lowCones_Auto = document.getElementById("lowCones_Auto");
const lowCubes_Auto = document.getElementById("lowCubes_Auto");
const balanceNone_Auto = document.getElementById("balanceNone_Auto");
const balanceDocked_Auto = document.getElementById("balanceDocked_Auto");
const balanceEngaged_Auto = document.getElementById("balanceEngaged_Auto");

//Teleop inputs
const highCones_Teleop = document.getElementById("highCones_Teleop");
const highCubes_Teleop = document.getElementById("highCubes_Teleop");
const midCones_Teleop = document.getElementById("midCones_Teleop");
const midCubes_Teleop = document.getElementById("midCubes_Teleop");
const lowCones_Teleop = document.getElementById("lowCones_Teleop");
const lowCubes_Teleop = document.getElementById("lowCubes_Teleop");
const balanceNone_Teleop = document.getElementById("balanceNone_Teleop");
const balanceDocked_Teleop = document.getElementById("balanceDocked_Teleop");
const balanceEngaged_Teleop = document.getElementById("balanceEngaged_Teleop");


//MatchResult inputs
const matchWin = document.getElementById("matchWin");
const matchLose = document.getElementById("matchLose");
const matchTie = document.getElementById("matchTie");
const comments = document.getElementById("comments");

//Buttons
const submitButton = document.getElementById("submitButton");
const saveButton_TeamInfo = document.getElementById("saveButton_TeamInfo");
const saveButton_Auto = document.getElementById("saveButton_Auto");
const saveButton_Teleop = document.getElementById("saveButton_Teleop");
const saveButton_MatchResult = document.getElementById("saveButton_MatchResult");

//TODO: hide submit button and next boxes until saveButton clicked.


//Show localStorage initially; -inputs saved locally in case user accidently exit page before submitting.
initialize(); 

//Codes for sumbitButton: saving values from localStorage to Firebase
submitButton.addEventListener("click", function() {
    //Save all data from localStorage to Firebase
    saveTeamInfo();
    saveAutoInputs();
    saveTeleopInputs();
    saveMatchResult();

    //Clear localStorage once submitted (last in order)
    clearLocalStorage();
});

//Saves TeamInfo locally
saveButton_TeamInfo.addEventListener("click", function() {
    saveTeamInfo_localStorage();
});

//Saves AutoData locally
saveButton_Auto.addEventListener("click", function() {
    // saveTeamInfo_localStorage();
    saveAutoInputs_localStorage();
});

//Saves TeleopData locally
saveButton_Teleop.addEventListener("click", function() {
    // saveTeamInfo_localStorage();
    // saveAutoInputs_localStorage();
    saveTeleopInputs_localStorage();
});

saveButton_MatchResult.addEventListener("click", function() {
    // saveTeamInfo_localStorage();
    // saveAutoInputs_localStorage();
    // saveTeleopInputs_localStorage();
    saveMatchResult_localStorage();
});

//Points contributed in match
let contributedPoints = 0;



/******** Only functions below ************/

//Show localStorage Data; -this is called as soon as page is opened
function initialize() {
    //Show TeamInfo localStorage
localStorage.getItem("intandData/teamInfo/alliance");
matchNum.value = localStorage.getItem("intandData/teamInfo/matchNum");
teamNum.value = localStorage.getItem("intandData/teamInfo/teamNum");
if(localStorage.getItem("intandData/teamInfo/alliance") == "blue") {
    allianceBlue.checked = true;
}else if(localStorage.getItem("intandData/teamInfo/alliance") == "red") {
    allianceRed.checked = true;
}else {
    allianceBlue.checked = false;
    allianceRed.checked = false;
}

//Show AutoData localStorage
highCones_Auto.value = localStorage.getItem("instandData/auto/highCones");
highCubes_Auto.value = localStorage.getItem("instandData/auto/highCubes");
midCones_Auto.value = localStorage.getItem("instandData/auto/midCones");
midCubes_Auto.value = localStorage.getItem("instandData/auto/midCubes");
lowCones_Auto.value = localStorage.getItem("instandData/auto/lowCones");
lowCubes_Auto.value = localStorage.getItem("instandData/auto/lowCubes");
if(localStorage.getItem("instandData/auto/balance") == "docked") {
    balanceDocked_Auto.checked = true;
}else if(localStorage.getItem("instandData/auto/balance") == "engaged") {
    balanceEngaged_Auto.checked = true;
}else if(localStorage.getItem("instandData/auto/balance") == "none") {
    balanceNone_Auto.checked = true;
}else {
    balanceDocked_Auto.checked = false;
    balanceEngaged_Auto.checked = false;
    balanceNone_Auto.checked = false;
}

//Show TeleopData localStorage
highCones_Teleop.value = localStorage.getItem("instandData/teleop/highCones");
highCubes_Teleop.value = localStorage.getItem("instandData/teleop/highCubes");
midCones_Teleop.value = localStorage.getItem("instandData/teleop/midCones");
midCubes_Teleop.value = localStorage.getItem("instandData/teleop/midCubes");
lowCones_Teleop.value = localStorage.getItem("instandData/teleop/lowCones");
lowCubes_Teleop.value = localStorage.getItem("instandData/teleop/lowCubes");
if(localStorage.getItem("instandData/teleop/balance") == "docked") {
    balanceDocked_Teleop.checked = true;
}else if(localStorage.getItem("instandData/teleop/balance") == "engaged") {
    balanceEngaged_Teleop.checked = true;
}else if(localStorage.getItem("instandData/teleop/balance") == "none") {
    balanceNone_Teleop.checked = true;
}else {
    balanceDocked_Teleop.checked = false;
    balanceEngaged_Teleop.checked = false;
    balanceNone_Teleop.checked = false;
}

//Show MatchResult localStorage
comments.value = localStorage.getItem("instandData/matchResult/comments");
localStorage.getItem("instandData/matchResult");

if(localStorage.getItem("instandData/matchResult") == "Win"){
    matchWin.checked = true;
}else if(localStorage.getItem("instandData/matchResult") == "Lose"){
    matchLose.checked = true;
}else if(localStorage.getItem("instandData/matchResult") == "Tie"){
    matchTie.checked = true;
}else{
    matchWin.checked = false;
    matchLose.checked = false;
    matchTie.checked = false;
}
}

function saveTeamInfo_localStorage() {
    //Making sure everything is filled out correctly.
    if(matchNum.value > 0 && teamNum.value > 0 && allianceBlue.checked == true && allianceRed.checked == false) {       //When only Blue is checked
        localStorage.setItem("intandData/teamInfo/alliance", `blue`);
        localStorage.setItem("intandData/teamInfo/matchNum", `${matchNum.value}`);
        localStorage.setItem("intandData/teamInfo/teamNum", `${teamNum.value}`);
        console.log(
            "alliance = " + localStorage.getItem("intandData/teamInfo/alliance") +
            "\nmatch = " + localStorage.getItem("intandData/teamInfo/matchNum") +
            "\nteam = " + localStorage.getItem("intandData/teamInfo/teamNum")
        );
    }else if(matchNum.value > 0 && teamNum.value > 0 && allianceRed.checked == true && allianceBlue.checked == false) { //When only Red is checked
        localStorage.setItem("intandData/teamInfo/alliance", `red`);
        localStorage.setItem("intandData/teamInfo/matchNum", `${matchNum.value}`);
        localStorage.setItem("intandData/teamInfo/teamNum", `${teamNum.value}`);
        console.log(
            "alliance = " + localStorage.getItem("intandData/teamInfo/alliance") +
            "\nmatch = " + localStorage.getItem("intandData/teamInfo/matchNum") +
            "\nteam = " + localStorage.getItem("intandData/teamInfo/teamNum")
        );
    }else {                                                                     //When something other than alliance is unfilled
    alert("Please make sure you have filled out everything!");
    console.log(
        "alliance = " + localStorage.getItem("intandData/teamInfo/alliance") +
        "\nmatch = " + localStorage.getItem("intandData/teamInfo/matchNum") +
        "\nteam = " + localStorage.getItem("intandData/teamInfo/teamNum")
    );
    }
}

function saveAutoInputs_localStorage() {
    if(highCones_Auto.value > 0) {
        localStorage.setItem("instandData/auto/highCones", `${highCones_Auto.value}`);
        console.log("highCones = " + localStorage.getItem("instandData/auto/highCones"));
    }else{
        localStorage.setItem("instandData/auto/highCones", 0);
        console.log("highCones = " + localStorage.getItem("instandData/auto/highCones"));
        highCones_Auto.value = 0;
    }

    if(highCubes_Auto.value > 0) {
        localStorage.setItem("instandData/auto/highCubes", `${highCubes_Auto.value}`);
        console.log("highCubes = " + localStorage.getItem("instandData/auto/highCubes"));
    }else{
        localStorage.setItem("instandData/auto/highCubes", 0);
        console.log("highCubes = " + localStorage.getItem("instandData/auto/highCubes"));
        highCubes_Auto.value = 0;
    }

    if(midCones_Auto.value > 0) {
        localStorage.setItem("instandData/auto/midCones", `${midCones_Auto.value}`);
        console.log("midCones = " + localStorage.getItem("instandData/auto/midCones"));
    }else{
        localStorage.setItem("instandData/auto/midCones", 0);
        console.log("midCones = " + localStorage.getItem("instandData/auto/midCones"));
        midCones_Auto.value = 0;
    }

    if(midCubes_Auto.value > 0) {
        localStorage.setItem("instandData/auto/midCubes", `${midCubes_Auto.value}`);
        console.log("midCubes = " + localStorage.getItem("instandData/auto/midCubes"));
    }else{
        localStorage.setItem("instandData/auto/midCubes", 0);
        console.log("midCubes = " + localStorage.getItem("instandData/auto/midCubes"));
        midCubes_Auto.value = 0;
    }

    if(lowCones_Auto.value > 0) {
        localStorage.setItem("instandData/auto/lowCones", `${lowCones_Auto.value}`);
        console.log("lowCones = " + localStorage.getItem("instandData/auto/lowCones"));
    }else{
        localStorage.setItem("instandData/auto/lowCones", 0);
        console.log("lowCones = " + localStorage.getItem("instandData/auto/lowCones"));
        lowCones_Auto.value = 0;
    }

    if(lowCubes_Auto.value > 0) {
        localStorage.setItem("instandData/auto/lowCubes", `${lowCubes_Auto.value}`);
        console.log("lowCubes = " + localStorage.getItem("instandData/auto/lowCubes"));
    }else{
        localStorage.setItem("instandData/auto/lowCubes", 0);
        console.log("lowCubes = " + localStorage.getItem("instandData/auto/lowCubes"));
        lowCubes_Auto.value = 0;
    }

    if(balanceDocked_Auto.checked){
        localStorage.setItem("instandData/auto/balance", "docked");
        console.log("chargingStation = " + localStorage.getItem("instandData/auto/balance"));
    }else if(balanceEngaged_Auto.checked){
        localStorage.setItem("instandData/auto/balance", "engaged");
        console.log("chargingStation = " + localStorage.getItem("instandData/auto/balance"));
    }else if(balanceNone_Auto.checked){
        localStorage.setItem("instandData/auto/balance", "none");
        console.log("chargingStation = " + localStorage.getItem("instandData/auto/balance"));
    }else{
        console.log("chargingStation = " + localStorage.getItem("instandData/auto/balance"));
        alert("Please choose an answer for Charging Station");
    }
}

function saveTeleopInputs_localStorage() {
    if(highCones_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/highCones", `${highCones_Teleop.value}`);
        console.log("highCones = " + localStorage.getItem("instandData/teleop/highCones"));
    }else{
        localStorage.setItem("instandData/teleop/highCones", 0);
        console.log("highCones = " + localStorage.getItem("instandData/teleop/highCones"));
        highCones_Teleop.value = 0;
    }

    if(highCubes_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/highCubes", `${highCubes_Teleop.value}`);
        console.log("highCubes = " + localStorage.getItem("instandData/teleop/highCubes"));
    }else{
        localStorage.setItem("instandData/teleop/highCubes", 0);
        console.log("highCubes = " + localStorage.getItem("instandData/teleop/highCubes"));
        highCubes_Teleop.value = 0;
    }

    if(midCones_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/midCones", `${midCones_Teleop.value}`);
        console.log("midCones = " + localStorage.getItem("instandData/teleop/midCones"));
    }else{
        localStorage.setItem("instandData/teleop/midCones", 0);
        console.log("midCones = " + localStorage.getItem("instandData/teleop/midCones"));
        midCones_Teleop.value = 0;
    }

    if(midCubes_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/midCubes", `${midCubes_Teleop.value}`);
        console.log("midCubes = " + localStorage.getItem("instandData/teleop/midCubes"));
    }else{
        localStorage.setItem("instandData/teleop/midCubes", 0);
        console.log("midCubes = " + localStorage.getItem("instandData/teleop/midCubes"));
        midCubes_Teleop.value = 0;
    }

    if(lowCones_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/lowCones", `${lowCones_Teleop.value}`);
        console.log("lowCones = " + localStorage.getItem("instandData/teleop/lowCones"));
    }else{
        localStorage.setItem("instandData/teleop/lowCones", 0);
        console.log("lowCones = " + localStorage.getItem("instandData/teleop/lowCones"));
        lowCones_Teleop.value = 0;
    }

    if(lowCubes_Teleop.value > 0) {
        localStorage.setItem("instandData/teleop/lowCubes", `${lowCubes_Teleop.value}`);
        console.log("lowCubes = " + localStorage.getItem("instandData/teleop/lowCubes"));
    }else{
        localStorage.setItem("instandData/teleop/lowCubes", 0);
        console.log("lowCubes = " + localStorage.getItem("instandData/teleop/lowCubes"));
        lowCubes_Teleop.value = 0;
    }

    if(balanceDocked_Teleop.checked){
        localStorage.setItem("instandData/teleop/balance", "docked");
        console.log("chargingStation = " + localStorage.getItem("instandData/teleop/balance"));
    }else if(balanceEngaged_Teleop.checked){
        localStorage.setItem("instandData/teleop/balance", "engaged");
        console.log("chargingStation = " + localStorage.getItem("instandData/teleop/balance"));
    }else if(balanceNone_Teleop.checked){
        localStorage.setItem("instandData/teleop/balance", "none");
        console.log("chargingStation = " + localStorage.getItem("instandData/teleop/balance"));
    }else{
        console.log("chargingStation = " + localStorage.getItem("instandData/teleop/balance"));
        alert("Please choose an answer for Charging Station");
    }
}

function saveMatchResult_localStorage() {
    if(matchWin.checked){
        localStorage.setItem("instandData/matchResult", `Win`);
        console.log("matchResult = " + localStorage.getItem("instandData/matchResult"));
    }else if(matchLose.checked){
        localStorage.setItem("instandData/matchResult", `Lose`);
        console.log("matchResult = " + localStorage.getItem("instandData/matchResult"));
    }else if(matchTie.checked){
        localStorage.setItem("instandData/matchResult", `Tie`);
        console.log("matchResult = " + localStorage.getItem("instandData/matchResult"));
    }else{
        console.log("matchResult = " + localStorage.getItem("instandData/matchResult"));
        alert("Please choose an answer for Match Result");
    }
    localStorage.setItem("instandData/matchResult/comments", `${comments.value}`);
    console.log("comments = " + localStorage.getItem("instandData/matchResult/comments"));
}

function clearLocalStorage() {
    //Delete TeamInfo localStorage
    localStorage.clear("intandData/teamInfo/alliance");
    localStorage.clear("intandData/teamInfo/matchNum");
    localStorage.clear("intandData/teamInfo/teamNum");

    //Delete AutoData localStorage
    localStorage.clear("instandData/auto/highCones");
    localStorage.clear("instandData/auto/highCubes");
    localStorage.clear("instandData/auto/midCones");
    localStorage.clear("instandData/auto/midCubes");
    localStorage.clear("instandData/auto/lowCones");
    localStorage.clear("instandData/auto/lowCubes");
    localStorage.clear("instandData/auto/balance");

    //Delete TeleopData localStorage
    localStorage.clear("instandData/teleop/highCones");
    localStorage.clear("instandData/teleop/highCubes");
    localStorage.clear("instandData/teleop/midCones");
    localStorage.clear("instandData/teleop/midCubes");
    localStorage.clear("instandData/teleop/lowCones");
    localStorage.clear("instandData/teleop/lowCubes");
    localStorage.clear("instandData/teleop/balance");

    //Delete MatchResult localStorage
    localStorage.clear("instandData/matchResult");
    localStorage.clear("instandData/matchResult/comments");
}

function saveTeamInfo() {

}

function saveAutoInputs() {

}

function saveTeleopInputs() {

}

function saveMatchResult() {

}

function calculateContributedPoints() {
    //Auto 2x points
    //Teleop 1x points
    //Do a return function
}