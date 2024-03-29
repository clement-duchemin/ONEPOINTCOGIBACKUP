


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
    sessionStorage.setItem('conjonctionStartTime', timeStamp);
    
    const gameName = "L’erreur de conjonction";
    sessionStorage.setItem('conjonctionJeu', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G3Q1NConfBef",
            question: "Manon, 33 ans, a étudié la comédie et aime rire. Est-il plus probable que Manon soit :",
            answers: ["Clown", "Directrice de banque", "Archiviste et karatéka", "Archiviste et clown"],
            correctAnswer: ["Clown", "Directrice de banque"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 1/8"
        },
        {
            id: "G3Q2NconfBef",
            question: "Serge, 44 ans, a étudié le marketing web et aime les réseaux sociaux. Est-il plus probable que Serge soit :",
            answers: ["Youtubeur", "Avaleur d’épée", "Gendarme et fan de puzzles", "Gendarme et youtubeur"],
            correctAnswer: ["Youtubeur", "Avaleur d’épée"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 2/8"
        },
        {
            id: "G3Q3confBef",
            question: "Charles, 35 ans, a étudié la philosophie et aime la Grèce antique. Est-il plus probable que Charles soit :",
            answers: ["Coach sportif", "Eleveur d’otaries", "Coach sportif et fan de télé-réalité", "Coach sportif et collectionneur d’art"],
            correctAnswer: ["Coach sportif", "Eleveur d’otaries"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 3/8"
        },
        {
            id: "G3Q4ConfBef",
            question: "Henri, 36 ans, aime les ragots et a étudié le journalisme. Est-il plus probable que Henri soit :",
            answers: ["Bricoleur et garde forestier", "Lecteur de presse people et garde forestier", "Garde forestier", "Démineur"],
            correctAnswer: ["Garde forestier", "Démineur"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/MdfKniUKxoE?enablejsapi=1",  
            imgSRC: "/woman-eureka.png",
            pageNumber: "L’erreur de conjonction"
        },
        {
            id: "G3Q5NconfAft",
            question: "Amélie, 37 ans, a étudié la biologie et aime les balades en forêt. Est-il plus probable que Amélie soit : ",
            answers: ["Ramasseuse de champignon", "Pilote de chasse", "Masseuse et lutteuse", "Masseuse et ramasseuse de champignons"],
            correctAnswer: ["Ramasseuse de champignon", "Pilote de chasse"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 5/8"
        },
        {
            id: "G3Q6NconfAft",
            question: "Mathieu, 32 ans, a étudié l’immobilier et aime les objets de luxe. Est-il plus probable que Mathieu soit :",
            answers: ["Collectionneur de montres", "Capitaine de sous-marin", "Livreur de pizza et maquilleur", "Livreur de pizza et collectionneur de montres"],
            correctAnswer: ["Collectionneur de montres", "Capitaine de sous-marin"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 6/8"
        },
        {
            id: "G3Q7ConfAft",
            question: "Clara, 25 ans, a étudié l’aérodynamique et aime les sports extrêmes. Est-il plus probable que Clara soit : ",
            answers: ["Professeure d’Histoire", "Croque-mort", "Professeure d'Histoire et joueuse de scrabble", "Professeur d’Histoire et pilote de moto"],
            correctAnswer: ["Professeure d’Histoire", "Croque-mort"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 7/8"
        },
        {
            id: "G3Q8ConfAft",
            question: "Adèle, 27 ans, a étudié le stylisme et aime la couture. Est-il plus probable que Adèle soit :",
            answers: ["Aide-soignante", "Astronaute", "Aide soignante et généalogiste", "Aide soignante et passionnée de mode"],
            correctAnswer: ["Aide-soignante", "Astronaute"],
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "L’erreur de conjonction 8/8"
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

        //quizTitle.textContent = "L’erreur de conjonction " + (index + 1) + "/9";
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
            window.location.href = "https://cogitum.powerappsportals.com/conjonctionResultats/";
        }
    });
    

    loadQuestion(currentQuestionIndex);
});

















































/*checkbox
let questionData = questions[currentQuestionIndex];
let isQuestionType = questionData.questionType === "question";
let selectedAnswers = isQuestionType ? document.querySelectorAll('input[name="answer"]:checked') : null;

if (isQuestionType) {
    if (selectedAnswers.length !== 2) {
        alert('Please select exactly 2 answers before proceeding.');
        let radioButtons = document.querySelectorAll('input[type="checkbox"][name="answer"]');

// Loop through each radio button to apply the red border style
radioButtons.forEach(function(radio) {
    radio.classList.add('input-error'); // Add class for styling
});
        return;
    }

    // Calculate score for question types
    let score = 0;
    selectedAnswers.forEach(answer => {
        if (questionData.correctAnswer.includes(answer.value)) {
            score += 1; // Award 1 point for each correct answer
        }
    });

    sessionStorage.setItem(questionData.id, score.toString());


  
    
} else {
    // Handle non-question types like videos
    // No answer checking required, but you might still want to perform actions like logging time spent
}

var endTime = new Date();
var timeSpent = Math.round((endTime - startTime) / 1000); // Time spent in seconds on the current question/video
sessionStorage.setItem('Time' + questionData.id, timeSpent.toString());


     // Always stop the video when moving to the next question
if (document.getElementById('video')) {
let stopVid = document.getElementById('video').querySelector('iframe');
if (stopVid && stopVid.src.includes('youtube')) {
    stopVid.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}
}

// Proceed to the next question or finish
currentQuestionIndex++;
*/