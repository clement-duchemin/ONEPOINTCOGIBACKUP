


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
    sessionStorage.setItem('batteEtBalleStartTime', timeStamp);
    
    const gameName = "Batte et Balle";
    sessionStorage.setItem('batteEtBalleJeu', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G1Q1ConfBef",
            question: "Dans une entreprise, il y a 150 hommes et femmes au total." 
            + "Il y a 100 hommes de plus que de femmes.\n" 
            + "Combien y a-t-il de femmes ?",
            answers: ["25", "75", "5", "50"],
            correctAnswer: "25",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 1/8"
        },
        {
            id: "G1Q2NconfBef",
            question: "Une ville possède 610 bus et trains au total. Il y a 600 bus. Combien y a-t-il de trains dans la ville ?",
            answers: ["5", "10", "15", "1"],
            correctAnswer: "10",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 2/8"
        },
        {
            id: "G1Q3NconfBef",
            question: "Un parc national a 380 roses et orchidées au total. Il y a 300 roses. Combien y a-t-il d'orchidées dans le parc ?",
            answers: ["80", "40", "120", "20"],
            correctAnswer: "80",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 3/8"
        },
        {
            id: "G1Q4ConfBef",
            question: "Une pomme et une banane coûtent ensemble 1€40. La banane coûte 1€ de plus que la pomme. Combien coûte la pomme?",
            answers: ["0.40€", "0.20€", "0.80€", "0.10€"],
            correctAnswer: "0.20€",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/pBYkxGo0Iis?enablejsapi=1", 
            imgSRC: "/woman-eureka.png",
            pageNumber: "La batte et Balle"
        },
        {
            id: "G1Q5NconfAft",
            question: "Dans un restaurant, il y a 230 verres et tasses au total. Il y a 200 verres. Combien y a-t-il de tasses dans ce restaurant ?",
            answers: ["5", "15", "30", "45"],
            correctAnswer: "30",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 5/8"
        },
        {
            id: "G1Q6NconfAft",
            question: "Un magasin met en exposition 280 pianos et harpes. Il y a 200 pianos. Combien y a-t-il de harpes dans ce magasin ?",
            answers: ["80", "40", "20", "120"],
            correctAnswer: "80",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 6/8"
        },
        {
            id: "G1Q7ConfAft",
            question: "Pour un tournoi sportif, on a invité 530 joueurs et entraîneurs. Il y a 500 joueurs de plus que d'entraîneurs. Combien y a-t-il d'entraîneurs ?",
            answers: ["15", "30", "5", "45"],
            correctAnswer: "15",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 7/8"
        },
        {
            id: "G1Q8ConfAft",
            question: "Dans une forêt, il y a 640 chênes et érables au total. Il y a 600 chênes de plus que d'érables. Combien y a-t-il d'érables ?",
            answers: ["60", "10", "40", "20"],
            correctAnswer: "20",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La batte et Balle 8/8"
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

        //quizTitle.textContent = "La batte et Balle " + (index + 1) + "/9";
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
            videoElement.innerHTML = '<p class="video-sentence">La réponse au problème précédent se trouve dans cette vidéo ! Regardez la et continuez à jouer !</p>' +
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
           
            window.location.href = "https://cogitum.powerappsportals.com/batteResultats/"
        }
    });

    loadQuestion(currentQuestionIndex);
});




