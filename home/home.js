function getOrCreateUID() {
    let uid = sessionStorage.getItem('userUID');
    if (!uid) {
        uid = crypto.randomUUID();
        sessionStorage.setItem('userUID', uid);
    }
    return uid;
}

$(document).ready(function() {
    getOrCreateUID();
});

// function submitEmail() {
//     let email = document.getElementById('mail-input').value;
//     sessionStorage.setItem('email', email);
//   }

  
// Function to calculate the total score and update the display
function displayBatteScore() {
    const keys = [
        "G1Q1ConfBef", "G1Q2NconfBef", "G1Q3NconfBef",
        "G1Q4ConfBef", "G1Q5NconfAft", "G1Q6NconfAft",
        "G1Q7ConfAft", "G1Q8ConfAft"
    ];
    let totalScore = 0;
    let allItemsPresent = true;

    for (let key of keys) {
        let value = sessionStorage.getItem(key);
        if (value === null) {
            allItemsPresent = false;
            break;
        }
        totalScore += parseInt(value, 10);
    }

    if (allItemsPresent) {
        document.getElementById("batteResultats").textContent = "Votre dernier score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayBatteScore();



function displayNegligenceScore() {
    const keys = [
        "G2Q1NConfBef", "G2Q2NconfBef", "G2Q3confBef",
        "G2Q4ConfBef", "G2Q5NconfAft", "G2Q6NconfAft",
        "G2Q7ConfAft", "G2Q8ConfAft"
    ];
    let totalScore = 0;
    let allItemsPresent = true;

    for (let key of keys) {
        let value = sessionStorage.getItem(key);
        if (value === null) {
            allItemsPresent = false;
            break;
        }
        totalScore += parseInt(value, 10);
    }

    if (allItemsPresent) {
        document.getElementById("negligence").textContent = "Votre dernier score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayNegligenceScore();



function displayConjonctionScore() {
    const keys = [
        "G3Q1NConfBef", "G3Q2NconfBef", "G3Q3confBef",
        "G3Q4ConfBef", "G3Q5NconfAft", "G3Q6NconfAft",
        "G3Q7ConfAft", "G3Q8ConfAft"
    ];
    let totalScore = 0;
    let allItemsPresent = true;

    for (let key of keys) {
        let value = sessionStorage.getItem(key);
        if (value === null) {
            allItemsPresent = false;
            break;
        }
        totalScore += parseInt(value, 10);
    }

    if (allItemsPresent) {
        document.getElementById("conjonction").textContent = "Votre dernier score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayConjonctionScore();