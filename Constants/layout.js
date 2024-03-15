//Use this for type_of_input to prevent typos
export const inputTypes = {
    number: "number",
    text: "text",
    chooser: "radio",
    multi_choice: "checkbox"
};
/*  
    The two array lists below are layouts for Pit and Match Scouting Forms.
    Edit these variables according to each year's game.
    Adjust these lists as needed.

    Also, if input type is a chooser OR mult_choice, then add a 4th item to the list like this:
    choices: [item1, item2, item3, ...]
*/

//Layout for Match Scouting Form
export const match_layout = {
    auto: {
        0: {
            task: "Leave Auto",
            points: 2, 
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        1: {
            task: "AMP Notes",
            points: 2,
            type_of_input: inputTypes.number
        },
        2: {
            task: "Speaker Notes",
            points: 5,
            type_of_input: inputTypes.number
        }
    },
    teleop: {
        0: {
            task: "AMP Notes",
            points: 1,
            type_of_input: inputTypes.number
        },
        1: {
            task: "Speaker Notes (not AMP)",
            points: 2,
            type_of_input: inputTypes.number
        },
        2: {
            task: "Speaker Notes (AMP)",
            points: 5,
            type_of_input: inputTypes.number
        }
    },
    endGame: {
        0: {
            task: "Park",
            points: 1,
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        1: {
            task: "Onstage (not SPOTLIT)",
            points: 3,
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        2: {
            task: "Onstage (SPOTLIT)",
            points: 4,
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        3: {
            task: "Harmony",
            points: 2,
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        4: {
            task: "Note in TRAP",
            points: 5,
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
    }
}


//Layout for Pit Scouting Form
export const pit_layout = {

    auto: {
        0: {
            question: "Leave Auto?", 
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        1: {
            question: "How many AMP Notes?",
            type_of_input: inputTypes.number
        },
        2: {
            question: "How many Speaker Notes?",
            type_of_input: inputTypes.number
        },
        3: {
            question: "Is there anything special you would like to share about your Auto?",
            type_of_input: inputTypes.text
        }
    },
    teleop: {
        0: {
            question: "How many AMP Notes?",
            type_of_input: inputTypes.number
        },
        2: {
            question: "What your cycle time?",
            type_of_input: inputTypes.text
        },
    },
    endGame: {
        1: {
            question: "Onstage?",
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        3: {
            question: "Can you harmony?",
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
        4: {
            question: "Note in TRAP?",
            type_of_input: inputTypes.chooser,
            choices: ["Yes", "No"]
        },
    },
    other: {
        0: {
            question: "What is your best strategy for this season?",
            type_of_input: inputTypes.text
        },
        //TODO: add more questions
        1: {
            question: "Interesting facts?",
            type_of_input: inputTypes.text
        }
    }
}