
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
    sessionStorage.setItem('batAndBallRetestStartTime', timeStamp);
    
    const gameName = "Bat and Ball Retest";
    sessionStorage.setItem('batAndBallRetestGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G1Q9ConfBefEn",
            question: "A bat and ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?",
            answers: ["$0.20", "$0.05", "$0.10", "$0.40"],
            correctAnswer: "$0.05",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 1/5"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/jEyMlomnAQM?enablejsapi=1",  
            imgSRC: "/woman-eureka.png",
            pageNumber: "Bat and ball"
        },
        {
            id: "G1Q10NconfAftEn",
            question: "In a city park there are 640 skateboarders and pedestrians. There are 600 skateboarders. How many pedestrians are there in this park ?",
            answers: ["40", "60", "20", "10"],
            correctAnswer: "40",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 2/5"
        },
        {
            id: "G1Q11NconfAftEn",
            question: "In a city people use 650 scooters and bicycles in total. There are 600 scooters. How many bicycles are there in this city ?",
            answers: ["5", "50", "25", "75"],
            correctAnswer: "50",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 3/5"
        },
        {
            id: "G1Q12ConfAftEn",
            question: "To make yogurt, a cook has bought 270 apricots and pears. There are 200 more apricots than pears. How many pears are there ?",
            answers: ["70", "35", "7", "105"],
            correctAnswer: "35",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 4/5"
        },
        {
            id: "G1Q13ConfAftEn",
            question: "In a grass plain scientists have counted 330 zebras and elephants. There are 300 more zebras than elephants. How many elephants are there ?",
            answers: ["30", "15", "5", "45"],
            correctAnswer: "15",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 5/5"
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

        //quizTitle.textContent = "Bat and ball " + (index + 1) + "/6";
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

        let isCorrect = questionData.questionType === "question" ? selectedAnswer.value === questionData.correctAnswer : true; // Assuming true for video type for simplicity
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
            
            window.location.href = "https://cogitum.powerappsportals.com/batRetestResults/"
        }
    });

    loadQuestion(currentQuestionIndex);
});


