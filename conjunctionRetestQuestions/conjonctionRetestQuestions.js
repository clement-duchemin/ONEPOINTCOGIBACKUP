


// Create a user id if not already done.
function getOrCreateUID() {
    let uid = sessionStorage.getItem('userUID');
    if (!uid) {
        try {
            uid = crypto.randomUUID();
        } catch (error) {
            console.error('Random UUID generation failed:', error);
            // Fallback mechanism, like generating random UID using another method, can be implemented here.
        }
        sessionStorage.setItem('userUID', uid);
    }
    return uid;
}


//Create a time stamp to know when the game was started
$(document).ready(function() {
    getOrCreateUID();

    const timeStamp = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
    sessionStorage.setItem('conjunctionFallacyRetestStartTime', timeStamp);
    
    const gameName = "Conjunction fallacy Retest";
    sessionStorage.setItem('ConjunctionFallacyRetestGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G3Q9ConfBefEn",
            question: "Tracy, 45, has previously studied synchronized swimming and likes the beach. Is it most probable that the described person is:",
            answers: ["A plumber and a tanner", "A plumber and a diver", "A plumber", "A celebrity DJ"],
            correctAnswer: ["A plumber", "A celebrity DJ"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 1/5"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/cpxEjgttTvA?enablejsapi=1",  
            imgSRC: "/woman-eureka.png",
            pageNumber: "Conjunction fallacy"
        },
        {
            id: "G3Q10NconfAftEn",
            question: "Grady, 37, has previously studied political science and likes local politics. Is it most probable that the described person is:",
            answers: ["A princess", "A receptionist and a political party member", "A receptionist and a poker player", "A political party member"],
            correctAnswer: ["A political party member", "A princess"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 2/5"
        },
        {
            id: "G3Q11NconfAftEn",
            question: "Brook, 28, has previously studied musicology and likes jazz. Is it most probable that the described person is:",
            answers: ["A taxi driver and an orienteer", "An ostrich farmer", "A taxi driver and a record collector", "A record collector"],
            correctAnswer: ["A record collector", "An ostrich farmer"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 3/5"
        },
        {
            id: "G3Q12ConfAftEn",
            question: "Katie, 32, has previously studied fine arts and likes painting. Is it most probable that the described person is:",
            answers: ["A brain surgeon", "A parking attendant", "A parking attendant and a snowboard", "A parking attendant and a cartoonist"],
            correctAnswer: ["A parking attendant", "A brain surgeon"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 4/5"
        },
        {
            id: "G3Q13ConfAftEn",
            question: "Jamie, 42, has previously studied sea winds and likes to sail. Is it most probable that the described person is:",
            answers: ["A postal worker", "A postal worker and a car collector", "A rock star", "A postal worker and a fisherman"],
            correctAnswer: ["A postal worker", "A rock star"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 5/5"
        },
    ];

    let currentQuestionIndex = 0;
    let startTime;

    function loadQuestion(index) {
        let questionData = questions[index];
        let quizTitle = document.getElementById('title-question');
        let questionElement = document.getElementById('question');
        let formBox1 = document.getElementById('form-box-1');
        let formBox2 = document.getElementById('form-box-2');
        let videoElement = document.getElementById('video');
        let questionBox = document.getElementById('question-box');
        startTime = new Date(); // Start timing for the question

        document.getElementById('guy-icon').src = questionData.imgSRC;

        //quizTitle.textContent = "Conjunction fallacy " + (index + 1) + "/6";
        quizTitle.textContent = questionData.pageNumber;

        // Reset visibility of elements based on the question type
        questionElement.style.display = "none";
        formBox1.style.display = "none";
        formBox2.style.display = "none";
        videoElement.style.display = "none";

        // Reset the display of question-box to flex for standard questions
        questionBox.style.display = "flex"; 

        if (questionData.questionType === "question") {
            questionElement.style.display = "";
            formBox1.style.display = "";
            formBox2.style.display = "";
            questionElement.textContent = questionData.question;
            formBox1.innerHTML = '';
            formBox2.innerHTML = '';

            questionData.answers.forEach(function(answer, index) {
                let column = index < 2 ? formBox1 : formBox2;
                let answerHtml = '<div class="form-check">' +
                 '<input type="radio" id="answer' + index + '" name="answer" value="' + answer + '" class="form-check-input" />' +
                 '<label for="answer' + index + '" class="form-check-label">' + answer + '</label>' +
                 '</div>';
                column.innerHTML += answerHtml;

            });
        } else if (questionData.questionType === "video") {
            videoElement.style.display = "";
            videoElement.innerHTML = '<p class="video-sentence">The answer to the previous problem is in this video! Watch it and keep on playing !</p>' +
            '<iframe frameborder="0" allowfullscreen="allowfullscreen" src="' + questionData.videoUrl + '" controls="controls" style="max-width: 100%; width: 100%; height: 450px;"> </iframe>';

            questionBox.style.display = "block"; 
        }
    }

 

    document.getElementById('next-button').addEventListener('click', function() {
        let questionData = questions[currentQuestionIndex];
        let selectedAnswer = document.querySelector('input[name="answer"]:checked');

        if (questionData.questionType === "question" && !selectedAnswer) {
            //alert('Please select an answer before proceeding.');
             // Get all radio inputs
        let radioButtons = document.querySelectorAll('input[type="radio"][name="answer"]');

        // Loop through each radio button to apply the red border style
        radioButtons.forEach(function(radio) {
            radio.classList.add('input-error'); // Add class for styling
        });
            return;
         }   

         // If a selection is made, ensure to remove the red border by removing the class
    document.querySelectorAll('input[type="radio"][name="answer"]').forEach(function(radio) {
        radio.classList.remove('input-error'); // Remove class to clear styling if it was previously added
    });

        var endTime = new Date();
        var timeSpent = Math.round((endTime - startTime) / 1000); // Time spent in seconds

        let isCorrect = questionData.questionType === "question" ? questionData.correctAnswer.includes(selectedAnswer.value) : true; // Assuming true for video type for simplicity
        let score = isCorrect ? 1 : 0;

        sessionStorage.setItem(questionData.id, score.toString());
        sessionStorage.setItem('Time' + questionData.id, timeSpent.toString());

         // Always stop the video when moving to the next question
    if (document.getElementById('video')) {
        let stopVid = document.getElementById('video').querySelector('iframe');
        if (stopVid && stopVid.src.includes('youtube')) {
            stopVid.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
    }

        currentQuestionIndex++;
       
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            window.location.href = "https://cogitum.powerappsportals.com/conjunctionRetestResults/";
        }
    });
    

    loadQuestion(currentQuestionIndex);
});






