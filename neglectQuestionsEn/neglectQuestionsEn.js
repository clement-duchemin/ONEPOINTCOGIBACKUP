


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
    sessionStorage.setItem('neglectStartTime', timeStamp);
    
    const gameName = "neglect";
    sessionStorage.setItem('neglectGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G2Q1NConfBefEn",
            question: "This study contains high school students and librarians. Person 'M' is loud. There are 995 high school students and 5 librarians. Is Person 'M' more likely to be:",
            answers: ["A high school student", "A librarian"],
            correctAnswer: "A high school student",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 1/8"
        },
        {
            id: "G2Q2NconfBefEn",
            question: "This study contains nurses and artists. Person 'S' is creative. There are 3 nurses and 997 artists. Is Person 'S' more likely to be:",
            answers: ["A nurse", "An artist"],
            correctAnswer: "An artist",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 2/8"
        },
        {
            id: "G2Q3confBefEn",
            question: "This study contains clowns and doctors. Person 'R' is funny. There are 4 clowns and 996 dentists. Is Person ‘R’ more likely to be:",
            answers: ["A clown", "A doctor"],
            correctAnswer: "A clown",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 3/8"
        },
        {
            id: "G2Q4ConfBefEn",
            question: "This study contains boxers and kindergarten teachers. Person ‘V’ is kind. There are 995 boxers and 5 kindergarten teachers. Is Person ‘V’ more likely to be:",
            answers: ["A boxer", "A kindergarten teacher"],
            correctAnswer: "A boxer",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/WzFzjfrWuNk?enablejsapi=1", 
            imgSRC: "/woman-eureka.png",
            pageNumber:"Base-rate neglect"
        },
        {
            id: "G2Q5NconfAftEn",
            question: "This study contains computer programmers and hippies. Person 'B' is unconventional. There are 5 computer programmers and 995 hippies. Is Person 'B' more likely to be:",
            answers: ["A hippie", "A computer programmer"],
            correctAnswer: "A hippie",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 5/8"
        },
        {
            id: "G2Q6NconfAftEn",
            question: "This study contains writers and sixteen year olds. Person 'Z' is immature. There are 996 sixteen year olds and 4 writers. Is Person 'Z' more likely to be:",
            answers: ["A writer", "A sixteen year olds"],
            correctAnswer: "A sixteen year olds",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 6/8"
        },
        {
            id: "G2Q7ConfAftEn",
            question: "This study contains nannies and businessmen. Person 'C' is ambitious. There are 997 nannies and 3 businessmen. Is Person 'C' more likely to be:",
            answers: ["A nanny", "A businessman"],
            correctAnswer: "A nanny",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 7/8"
        },
        {
            id: "G2Q8ConfAftEn",
            question: "This study contains secretaries and telemarketers. Person 'H' is persuasive. There are 996 secretaries and 4 telemarketers. Is Person 'H' is more likely to be:",
            answers: ["A secretary", "A telemarketer"],
            correctAnswer: "A secretary",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 8/8"
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

        //quizTitle.textContent = "Base-rate neglect " + (index + 1) + "/9";
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
            let radioButtons = document.querySelectorAll('input[type="radio"][name="answer"]');

        // Loop through each radio button to apply the red border style
        radioButtons.forEach(function(radio) {
            radio.classList.add('input-error'); // Add class for styling
        });
            return;
        }

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
            
            window.location.href = "https://cogitum.powerappsportals.com/neglectResultsEn/"
        }
    });

    loadQuestion(currentQuestionIndex);
});



