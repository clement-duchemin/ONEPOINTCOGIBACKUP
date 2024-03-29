/*

function init() {
    
    // Display scores before and after video for first questions
    const beforeScores = ["G1Q1ConfBefEn", "G1Q2NconfBefEn", "G1Q3NconfBefEn", "G1Q4ConfBefEn"];
    const afterScores = ["G1Q5NconfAftEn", "G1Q6NconfAftEn", "G1Q7ConfAftEn", "G1Q8ConfAftEn"];
    const totalScoreBef = calculateTotalScore(beforeScores);
    const totalScoreAft = calculateTotalScore(afterScores);
    
    displayResult("previousScoreBef", totalScoreBef + " / 4");
    displayResult("previousScoreAft", totalScoreAft + " / 4");


    //Display total score retest
    
    const retestTotalScoreBef = ["G1Q9ConfBefEn"];
    const retestTotalScoreAft = ["G1Q10NconfAftEn", "G1Q11NconfAftEn", "G1Q12ConfAftEn", "G1Q13ConfAftEn"];
    const calculRetestTotalScoreAft = calculateTotalScore(retestTotalScoreAft);

    const retestTotalScore = retestTotalScoreBef + calculRetestTotalScoreAft;

    displayResult("result", "Total Score: " + retestTotalScore + " / 5");

    //Display retest score before and after video

    displayResult("resultBef", retestTotalScoreBef + " / 1");
    displayResult("resultAft", calculRetestTotalScoreAft + " / 4");




    //const message = determineMessage(totalScoreBef, totalScoreAft);
    //displayResult("feedback", message);
}

window.onload = init;
*/




//functions to calculate and display scores
function parseScore(key) {
    return parseInt(sessionStorage.getItem(key), 10) || 0;
}

function calculateTotalScore(scores) {
    return scores.reduce((total, score) => total + parseScore(score), 0);
}

function displayResult(elementId, text) {
    document.getElementById(elementId).textContent = text;
}
/*
//feedback messages
function determineMessage(totalScoreBef, totalScoreAft) {
    if (totalScoreBef <= 1 && totalScoreAft >= 3) {
        return "At the beginning, you were biased... But after watching the video, you improved and gave a majority of correct answers! Well done!";
    }
    if (totalScoreBef >= 3 && totalScoreAft <= 1) {
        return "You started by giving a majority of correct answers... But after the video, your score dropped! Try again! ";
    }
    if (totalScoreBef === totalScoreAft) {
        return "You gave an equal number of correct answers before and after watching the video! ";
    }
    if (totalScoreBef >= 3 && totalScoreAft >= 3) {
        return "Throughout the game, you gave a majority of correct answers! Congratulations!";
    }
    if(totalScoreBef === 0 && totalScoreAft === 0) {
        return "";
    }
}
*/


// Function to disable scrolling behind modal
function disableScrolling() {
    const scrollY = window.scrollY; // Save the scroll position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
}

// Function to enable scrolling when modal gone
function enableScrolling() {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}



//template web api
(function(webapi, $){
    function safeAjax(ajaxOptions) {
        var deferredAjax = $.Deferred();

        shell.getTokenDeferred().done(function (token) {
            // add headers for AJAX
            if (!ajaxOptions.headers) {
                $.extend(ajaxOptions, {
                    headers: {
                        "__RequestVerificationToken": token
                    }
                }); 
            } else {
                ajaxOptions.headers["__RequestVerificationToken"] = token;
            }
            $.ajax(ajaxOptions)
                .done(function(data, textStatus, jqXHR) {
                    validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
                }).fail(deferredAjax.reject); //AJAX
        }).fail(function () {
            deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
        });

        return deferredAjax.promise();	
    }
    webapi.safeAjax = safeAjax;
})(window.webapi = window.webapi || {}, jQuery)






// Ensure the DOM is fully loaded before setting up event listeners.
document.addEventListener('DOMContentLoaded', function() {


    //display score neglect 1st game
    const beforeScores = ["G2Q1NConfBefEn", "G2Q2NconfBefEn", "G2Q3confBefEn", "G2Q4ConfBefEn"];
    const afterScores = ["G2Q5NconfAftEn", "G2Q6NconfAftEn", "G2Q7ConfAftEn", "G2Q8ConfAftEn"];
    const totalScoreBef = calculateTotalScore(beforeScores);
    const totalScoreAft = calculateTotalScore(afterScores);
    
    const totalScore = totalScoreBef + totalScoreAft;

    displayResult("result", "Score total: " + totalScore + " / 8");
    displayResult("resultBef", totalScoreBef + " / 4");
    displayResult("resultAft", totalScoreAft + " / 4");

    //Display total score retest
    
    const retestTotalScoreBef = ["G2Q9ConfBefEn"];
    const calculretestTotalScoreBef = calculateTotalScore(retestTotalScoreBef);
    const retestTotalScoreAft = ["G2Q10NconfAftEn", "G2Q11NconfAftEn", "G2Q12ConfAftEn", "G2Q13ConfAftEn"];
    const calculRetestTotalScoreAft = calculateTotalScore(retestTotalScoreAft);

    const retestTotalScore = calculretestTotalScoreBef + calculRetestTotalScoreAft;

    displayResult("result", "Total Score: " + retestTotalScore + " / 5");

    //Display retest score before and after video

    displayResult("resultBef", calculretestTotalScoreBef + " / 1");
    displayResult("resultAft", calculRetestTotalScoreAft + " / 4");

    //Display previous scores

    displayResult("previousScoreBef", totalScoreBef + " / 4");
    displayResult("previousScoreAft", totalScoreAft + " / 4");


    // const message = determineMessage(totalScoreBef, totalScoreAft);
    // displayResult("feedback", message);



    const uid = sessionStorage.getItem("userUID");
    const neglectRetestGame = sessionStorage.getItem('neglectRetestGame');
    const age = Number(sessionStorage.getItem("age"));
    const gender = sessionStorage.getItem("sex");
    const education = sessionStorage.getItem("education");
    const country = sessionStorage.getItem("pays");
    const email = sessionStorage.getItem('email');
    const consent = sessionStorage.getItem('consentGiven');


// Function to calculate score based on input values
function calculateScore(...values) {
    const sum = values.reduce((acc, val) => acc + Number(val), 0);
    return sum === 1 ? 50 : sum === 2 ? 100 : sum;
  }
  

  
  // Get items from sessionStorage and calculate scores
  const scoreConfBef = calculateScore(
    sessionStorage.getItem('G2Q9ConfBefEn'),
  );
  
  const scoreConfAft = calculateScore(
    sessionStorage.getItem('G2Q12ConfAftEn'),
    sessionStorage.getItem('G2Q13ConfAftEn')
  );
  
  const scoreNconfAft = calculateScore(
    sessionStorage.getItem('G2Q10NconfAftEn'),
    sessionStorage.getItem('G2Q11NconfAftEn')
  );
  

//Time spent on the task
const timeScores = ["TimeG2Q9ConfBefEn", "TimeG2Q12ConfAftEn", "TimeG2Q13ConfAftEn", "TimeG2Q10NconfAftEn", 
    "TimeG2Q11NconfAftEn"];

    let time = 0;

// Loop through the timeScores array
timeScores.forEach(key => {
    // Retrieve each value from sessionStorage and convert it to a number
    const value = Number(sessionStorage.getItem(key));
    
    // Check if the retrieved value is a number and not NaN
    if (!isNaN(value)) {
        // Add the value to the sum
        time += value;
    } else {
        console.log(`Value for ${key} is not a valid number.`);
    }
});



//Task start time
const neglectRetestStartTime = sessionStorage.getItem('neglectRetestStartTime');

function sendData(uid, neglectRetestStartTime, neglectRetestGame, scoreConfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent) {

    let data = {
        "cr40e_cogiuserid": uid,
        "cr40e_tempsdebuttache": neglectRetestStartTime,
        "cr40e_cogitaskname": neglectRetestGame,
        "cr40e_moyconfavvid": scoreConfBef.toString(),
        "cr40e_moyconfapvid": scoreConfAft.toString(),
        "cr40e_moynonconfapvid": scoreNconfAft.toString(),
        "cr40e_dureetache": time.toString(),
        "cr40e_cogiconsent":consent.toString(),
    };

    // Add optional fields if they have valid values
    if (age) data["cr40e_cogiage"] = age;
    if (gender) data["cr40e_cogisexe"] = gender.toString();
    if (education) data["cr40e_cogieducation"] = education.toString();
    if (country) data["cr40e_cogipays"] = country.toString();
    if (email) data["cr40e_cogiemail"] = email.toString();
    //if (consent) data["cr40e_cogiconsent"] = consent.toString();
    

    webapi.safeAjax({
        type: "POST",
        url: "/_api/cr40e_cogitumtabs",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(res, status, xhr) { // Moved inside the object
            console.log("entityID: " + xhr.getResponseHeader("entityid"));

        },
        error: function(xhr, status, error) { // Moved inside the object
            console.error("Error occurred: " + error);

        }
});
}


// Function to check if "age" is in sessionStorage and then call sendData
if (sessionStorage.getItem("age") !== null) {
    // If "age" exists in sessionStorage, proceed to call sendData
   
  sendData(uid, neglectRetestStartTime, neglectRetestGame, scoreConfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent);

    
  } else {
    // "age" is not found in sessionStorage, prevent sendData from starting
    console.log("Age is not found in sessionStorage. sendData is not executed.");
  }
    
  const modal = document.getElementById('consentModal');

  // Event listener for the modal close icon
    document.getElementById('closeIcon').addEventListener('click', function() {
        sendData(uid, neglectRetestStartTime, neglectRetestGame, scoreConfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent);

        modal.style.display = 'none';
        enableScrolling();
    });

    //modal form submit
    const formButton = document.getElementById('form_button') // Reference to the modal opener button
    const form = document.getElementById('userInfoForm'); // Reference to the form
    const ageInput = document.getElementById('age'); // Reference to the age input
    const genderSelect = document.getElementById('gender'); // Reference to the gender select dropdown
    const educationSelect = document.getElementById('education'); // Reference to the education select dropdown
    const countrySelect = document.getElementById('country'); // Reference to the country select dropdown

    // Custom validation for the age input
    ageInput.addEventListener('input', function() {
        const ageValue = ageInput.value;
        if (!/^\d{1,3}$/.test(ageValue)) {
            ageInput.setCustomValidity('Please enter a valid age (up to 3 digits).');
        } else {
            ageInput.setCustomValidity('');
        }
    });

    // Function to check form validity
    function isFormValid() {
        // Check if dropdowns have a selected value other than the default
        const isGenderSelected = genderSelect.value !== '';
        const isEducationSelected = educationSelect.value !== '';
        const isCountrySelected = countrySelect.value !== '';

        // Check the custom validity for age input
        const isAgeValid = ageInput.checkValidity();

        // Update form validity based on all conditions
        return isGenderSelected && isEducationSelected && isCountrySelected && isAgeValid;
    }

    // Check if the age is already stored in sessionStorage
    if (!sessionStorage.getItem('age')) {
        // If age is not stored, display the modal and disable scrolling
        modal.style.display = 'block';
        formButton.style.display = 'block';
        disableScrolling();
    }

    // Add the event listener for the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Only proceed if the form is valid
        if (isFormValid()) {
            // Get the values from the form
            const age = ageInput.value;
            const gender = genderSelect.value;
            const education = educationSelect.value;
            const country = countrySelect.value;
            
            // Save the values to sessionStorage
             sessionStorage.setItem('age', age);
             sessionStorage.setItem('sex', gender);
             sessionStorage.setItem('education', education);
             sessionStorage.setItem('pays', country);

             sendData(uid, neglectRetestStartTime, neglectRetestGame, scoreConfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent) 




            // Hide the modal and enable scrolling
            modal.style.display = 'none';
            enableScrolling();
        } else {
            // Optionally, inform the user that the form is incomplete
            //alert('Please ensure all fields are filled out correctly.');
            educationSelect.style.border = '1px solid red';
            countrySelect.style.border = '1px solid red';
            genderSelect.style.border = '1px solid red';
            ageInput.style.border = '1px solid red';
        }
    });


    document.getElementById('home_button-en').addEventListener('click',  function() {
        
        window.location.href = "https://cogitum.powerappsportals.com/homePage/";
    });

    document.getElementById('replay_button-en').addEventListener('click',  function() {
        
        window.location.href = "https://cogitum.powerappsportals.com/neglectRetestQuestions/";
    });

});

//button to take the form if the user has declined in a first place
document.getElementById('form_button').addEventListener('click', function(event) {
    event.preventDefault();

    const modal = document.getElementById('consentModal');
    modal.style.display = 'block';

});

















