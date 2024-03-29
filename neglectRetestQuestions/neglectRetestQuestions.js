
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
    sessionStorage.setItem('neglectRetestStartTime', timeStamp);
    
    const gameName = "neglect Retest";
    sessionStorage.setItem('neglectRetestGame', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G2Q9ConfBefEn",
            question: "This study contains lab technicians and politicians. Person ‘F’ is dishonest. There are 996 lab technicians and 4 politicians. Is Person ‘F’ more likely to be:",
            answers: ["A lab technician", "A politician"],
            correctAnswer: "A lab technician",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 1/5"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/Ig9MqEsF1Tc?enablejsapi=1",  
            imgSRC: "/woman-eureka.png",
            pageNumber:"Base-rate neglect"
        },
        {
            id: "G2Q10NconfAftEn",
            question: "This study contains rich people and paramedics. Person 'J' is reliable. There are 996 paramedics and 4 rich people. Is person 'J' more likely to be:",
            answers: ["A rich people", "A paramedic"],
            correctAnswer: "A paramedic",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 2/5"
        },
        {
            id: "G2Q11NconfAftEn",
            question: "This study contains lawyers and gardeners. Person 'X' is gentle. There are 5 lawyers and 995 gardeners. Is Person 'X' more likely to be:",
            answers: ["A lawyer", "A gardener"],
            correctAnswer: "A gardener",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 3/5"
        },
        {
            id: "G2Q12ConfAftEn",
            question: "This study contains women and drummers. Person 'M' is sensitive. There 4 women and 996 drummers. Is Person 'M' more likely to be:",
            answers: ["A drummer", "A woman"],
            correctAnswer: "A drummer",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 4/5"
        },
        {
            id: "G2Q13ConfAftEn",
            question: "This study contains I.T. technicians and real estate agents. Person 'U' is nerdy. There are 997 real estate agents and 3 I.T. technicians. Is Person ‘U’ more likely to be:",
            answers: ["An I.T. technician", "A real estate agent"],
            correctAnswer: "A real estate agent",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber:"Base-rate neglect 5/5"
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

        //quizTitle.textContent = "Base-rate neglect " + (index + 1) + "/6";
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
            
            window.location.href = "https://cogitum.powerappsportals.com/neglectRetestResults/"
        }
    });

    loadQuestion(currentQuestionIndex);
});
