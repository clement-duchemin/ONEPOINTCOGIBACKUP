
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

//feedback messages
function determineMessage(totalScoreBef, totalScoreAft) {
    if (totalScoreBef <= 1 && totalScoreAft >= 3) {
        return "Au début, vous étiez biaisé(e)… Mais après avoir vu la vidéo, vous vous êtes amélioré(e) et avez donné une majorité de bonnes réponses ! Bravo !";
    }
    if (totalScoreBef >= 3 && totalScoreAft <= 1) {
        return "Vous avez commencé par donner une majorité de bonnes réponses… Mais après la vidéo, votre score a chuté ! Essayez une nouvelle fois !";
    }
    if (totalScoreBef === totalScoreAft) {
        return "Vous avez donné autant de bonnes réponses avant et après avoir visionné la vidéo !";
    }
    if (totalScoreBef >= 3 && totalScoreAft >= 3) {
        return "Au cours du jeu, vous avez donné une majorité de bonnes réponses ! Félicitations !";
    }
    if(totalScoreBef === 0 && totalScoreAft === 0) {
        return "";
    }
}




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


    //display score
    const beforeScores = ["G1Q1ConfBef", "G1Q2NconfBef", "G1Q3NconfBef", "G1Q4ConfBef"];
    const afterScores = ["G1Q5NconfAft", "G1Q6NconfAft", "G1Q7ConfAft", "G1Q8ConfAft"];
    const totalScoreBef = calculateTotalScore(beforeScores);
    const totalScoreAft = calculateTotalScore(afterScores);
    
    const totalScore = totalScoreBef + totalScoreAft;

    displayResult("result", "Score total: " + totalScore + " / 8");
    displayResult("resultBef", totalScoreBef + " / 4");
    displayResult("resultAft", totalScoreAft + " / 4");



    const message = determineMessage(totalScoreBef, totalScoreAft);
    displayResult("feedback", message);



    const uid = sessionStorage.getItem("userUID");
    const batAndBallGame = sessionStorage.getItem('batteEtBalleJeu');
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
  
  // Get items from sessionStorage and calculate scores for data sending
  const scoreConfBef = calculateScore(
    sessionStorage.getItem('G1Q1ConfBef'),
    sessionStorage.getItem('G1Q4ConfBef')
  );
  
  const scoreNconfBef = calculateScore(
    sessionStorage.getItem('G1Q2NconfBef'),
    sessionStorage.getItem('G1Q3NconfBef')
  );
  
  const scoreConfAft = calculateScore(
    sessionStorage.getItem('G1Q7ConfAft'),
    sessionStorage.getItem('G1Q8ConfAft')
  );
  
  const scoreNconfAft = calculateScore(
    sessionStorage.getItem('G1Q5NconfAft'),
    sessionStorage.getItem('G1Q6NconfAft')
  );
  

//Time spent on the task
const timeScores = ["TimeG1Q1ConfBef", "TimeG1Q2NconfBef", "TimeG1Q3NconfBef", "TimeG1Q4ConfBef", 
    "TimeG1Q5NconfAft", "TimeG1Q6NconfAft", "TimeG1Q7ConfAft", "TimeG1Q8ConfAft"];

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
const batteEtBalleStart = sessionStorage.getItem('batteEtBalleStartTime');

function sendData(uid, batteEtBalleStart, batAndBallGame, scoreConfBef, scoreNconfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent) {

    let data = {
        "cr40e_cogiuserid": uid,
        "cr40e_tempsdebuttache": batteEtBalleStart,
        "cr40e_cogitaskname": batAndBallGame,
        "cr40e_moyconfavvid": scoreConfBef.toString(),
        "cr40e_moynonconfavvid": scoreNconfBef.toString(),
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
   
  sendData(uid, batteEtBalleStart, batAndBallGame, scoreConfBef, scoreNconfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent);

    
  } else {
    // "age" is not found in sessionStorage, prevent sendData from starting
    console.log("Age is not found in sessionStorage. sendData is not executed.");
  }
    
  const modal = document.getElementById('consentModal');

  // Event listener for the modal close icon
    document.getElementById('closeIcon').addEventListener('click', function() {
        sendData(uid, batteEtBalleStart, batAndBallGame, scoreConfBef, scoreNconfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent);

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

             sendData(uid, batteEtBalleStart, batAndBallGame, scoreConfBef, scoreNconfBef, scoreConfAft, scoreNconfAft, time, age, gender, education, country, email, consent) 




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


    document.getElementById('home_button').addEventListener('click',  function() {
        
        window.location.href = "/";
    });

    document.getElementById('replay_button').addEventListener('click',  function() {
        
        window.location.href = "/batteQuestions";
    });

});

//button to take the form if the user has declined in a first place
document.getElementById('form_button').addEventListener('click', function(event) {
    event.preventDefault();

    const modal = document.getElementById('consentModal');
    modal.style.display = 'block';

});



















