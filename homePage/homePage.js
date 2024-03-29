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
        "G1Q1ConfBefEn", "G1Q2NconfBefEn", "G1Q3NconfBefEn",
        "G1Q4ConfBefEn", "G1Q5NconfAftEn", "G1Q6NconfAftEn",
        "G1Q7ConfAftEn", "G1Q8ConfAftEn"
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
        document.getElementById("batResult").textContent = "Your last score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayBatteScore();



function displayNegligenceScore() {
    const keys = [
        "G2Q1NConfBefEn", "G2Q2NconfBefEn", "G2Q3confBefEn",
        "G2Q4ConfBefEn", "G2Q5NconfAftEn", "G2Q6NconfAftEn",
        "G2Q7ConfAftEn", "G2Q8ConfAftEn"
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
        document.getElementById("neglectResult").textContent = "Your last score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayNegligenceScore();



function displayConjonctionScore() {
    const keys = [
        "G3Q1NconfBefEn", "G3Q2NconfBefEn", "G3Q3ConfBefEn",
        "G3Q4ConfBefEn", "G3Q5NconfAftEn", "G3Q6NconfAftEn",
        "G3Q7ConfAftEn", "G3Q8ConfAftEn"
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
        document.getElementById("conjunctionResult").textContent = "Your last score: " + totalScore + " / 8";
    }
    // If items are not present, do nothing (do not display anything)
}

// Call the function to calculate the score and update the display
displayConjonctionScore();