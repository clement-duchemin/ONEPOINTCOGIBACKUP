
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
    sessionStorage.setItem('batAndBallStartTime', timeStamp);
    
    const gameName = "Bat and Ball";
    sessionStorage.setItem('batAndBallGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G1Q1ConfBefEn",
            question: "In a company there are 150 men and women in total. There are 100 more men than women. How many women are there?",
            answers: ["25", "75", "5", "50"],
            correctAnswer: "25",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 1/8"
        },
        {
            id: "G1Q2NconfBefEn",
            question: "A city has acquired 610 buses and trains in total. There are 600 buses. How many trains are there in this city?",
            answers: ["5", "10", "15", "1"],
            correctAnswer: "10",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 2/8"
        },
        {
            id: "G1Q3NconfBefEn",
            question: "A national park has 380 roses and lotus flowers in total. There are 300 roses. How many lotus flowers are there in this park?",
            answers: ["80", "40", "120", "20"],
            correctAnswer: "80",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 3/8"
        },
        {
            id: "G1Q4ConfBefEn",
            question: "A magazine and a banana cost $2.60 in total. The magazine costs $2 more than the banana. How much does the banana cost?",
            answers: ["$0.30", " $0.15", "$0.60", "$0.90"],
            correctAnswer: "$0.30",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/Cj82pPLnytw?enablejsapi=1" ,
            imgSRC: "/woman-eureka.png",
            pageNumber: "Bat and ball"
        },
        {
            id: "G1Q5NconfAftEn",
            question: "In a restaurant, clients have been using 230 forks and napkins. There are 200 forks. How many napkins are there in the restaurant?",
            answers: ["5", "15", "30", "45"],
            correctAnswer: "30",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 5/8"
        },
        {
            id: "G1Q6NconfAftEn",
            question: "A store is showcasing 280 pianos and xylophones in total. There are 200 pianos. How many xylophones are there in this store?",
            answers: ["80", "40", "20", "120"],
            correctAnswer: "80",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 6/8"
        },
        {
            id: "G1Q7ConfAftEn",
            question: "For a sports event, organizers have invited 530 players and coaches. There are 500 more players than coaches. How many coaches are there?",
            answers: ["15", "30", "5", "45"],
            correctAnswer: "15",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 7/8"
        },
        {
            id: "G1Q8ConfAftEn",
            question: "In a forest there are 640 mango trees and guava trees. There are 600 more mango trees than guava trees. How many mango trees are there?",
            answers: ["60", "10", "40", "20"],
            correctAnswer: "20",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Bat and ball 8/8"
        }
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

        //quizTitle.textContent = "Bat and ball " + (index + 1) + "/9";
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
            
            window.location.href = "https://cogitum.powerappsportals.com/batResultsEn/"
        }
    });

    loadQuestion(currentQuestionIndex);
});


