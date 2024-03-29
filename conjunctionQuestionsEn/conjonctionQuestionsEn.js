


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
    sessionStorage.setItem('conjunctionFallacyStartTime', timeStamp);
    
    const gameName = "Conjunction fallacy";
    sessionStorage.setItem('ConjunctionFallacyGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G3Q1NconfBefEn",
            question: "Riley, 33, has previously studied comedy and likes laughing. Is it most probable that the described person is:",
            answers: ["A clown", "An archivist and a clown", "A bank CEO", "An archivist and a kareteka"],
            correctAnswer: ["A clown", "A bank CEO"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 1/8"
        },
        {
            id: "G3Q2NconfBefEn",
            question: "Kadin, 32, has previously studied astronomy and likes sci-fi. Is it most probable that the described person is:",
            answers: ["A stargazer", "An Oscar winner", "A longshoreman and a stargazer", "A longshoreman and an equestrian"],
            correctAnswer: ["A stargazer", "An Oscar winner"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 2/8"
        },
        {
            id: "G3Q3ConfBefEn",
            question: "Perry, 36, has previously studied literature and likes poetry. Is it most probable that the described person is:",
            answers: ["A carpenter and a hockey player", "A carpenter", "An Olympic medalist", "A carpenter and a novel writer"],
            correctAnswer: ["A carpenter", "An Olympic medalist"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 3/8"
        },
        {
            id: "G3Q4ConfBefEn",
            question: "Henri, 36, has previously studied journalism and likes gossip. Is it most probable that the described person is:",
            answers: ["A mine-clearer", "A forest ranger", "A forest ranger and a handyman", "A forest ranger and a tabloid reader"],
            correctAnswer: ["A mine-clearer", "A forest ranger"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/xNDZmKWrvhI?enablejsapi=1",  
            imgSRC: "/woman-eureka.png",
            pageNumber: "Conjunction fallacy"
        },
        {
            id: "G3Q5NconfAftEn",
            question: "Billy, 27, has previously studied geography and likes foreign cultures. Is it most probable that the described person is:",
            answers: ["A pawnbroker and a globetrotter", "A pawnbroker and a perfumer", "A swordsman", "A globetrotter"],
            correctAnswer: ["A globetrotter", "A swordsman"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 5/8"
        },
        {
            id: "G3Q6NconfAftEn",
            question: "Jodie, 39, has previously studied cultural analysis and likes Apple products. Is it most probable that the described person is:",
            answers: ["An iPad owner", "A corporal", "A house painter and an iPad owner", "A house painter and a carpet weaver"],
            correctAnswer: ["An iPad owner", "A corporal"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 6/8"
        },
        {
            id: "G3Q7ConfAftEn",
            question: "Falon, 26, has previously studied education and likes children. Is it most probable that the described person is:",
            answers: ["A flight attendant", "A flight attendant and a dad", "A duke", "A flight attendant and a rally racing fan"],
            correctAnswer: ["A flight attendant", "A duke"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 7/8"
        },
        {
            id: "G3Q8ConfAftEn",
            question: "Wayne, 39, has previously studied zoology and likes mountain nature. Is it most probable that the described person is:",
            answers: ["A navy admiral", "A musician and a birdwatcher", "A musician", " A musician and a juggler"],
            correctAnswer: ["A navy admiral", "A musician"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "Conjunction fallacy 8/8"
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

        //quizTitle.textContent = "Conjunction fallacy " + (index + 1) + "/9";
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
            window.location.href = "https://cogitum.powerappsportals.com/conjunctionResultsEn/";
        }
    });
    

    loadQuestion(currentQuestionIndex);
});









