


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
    sessionStorage.setItem('negligenceStartTime', timeStamp);
    
    const gameName = "negligence";
    sessionStorage.setItem('negligenceJeu', gameName);
});




//Q&A array
document.addEventListener('DOMContentLoaded', function() {
    let questions = [
        {
            id: "G2Q1NConfBef",
            question: "Cette étude concerne des bibliothécaires et des DJ. La personne 'R' est calme. Il y a 995 bibliothécaires et 5 DJ. Est-ce que la personne 'R' a plus de chance d'être :",
            answers: ["Un bibliothécaire", "Un DJ"],
            correctAnswer: "Un bibliothécaire",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 1/8"
        },
        {
            id: "G2Q2NconfBef",
            question: "Cette étude concerne des architectes et des chauffeurs de bus.La personne 'C' est créative. Il y a 994 architectes et 6 chauffeurs de bus. Est-ce que la personne 'C' a plus de chance d'être :",
            answers: ["Un architecte", "Un chauffeur de bus"],
            correctAnswer: "Un architecte",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 2/8"
        },
        {
            id: "G2Q3confBef",
            question: "Cette étude concerne des directeurs administratifs et des humoristes. La personne 'K' est drôle. Il y a 997 directeurs administratifs et 3 humoristes.Est-ce que la personne 'K' a plus de chance d'être :",
            answers: ["Un directeur administratif", "Un humoriste"],
            correctAnswer: "Un directeur administratif",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 3/8"
        },
        {
            id: "G2Q4ConfBef",
            question: "Cette étude concerne des stars de Hollywood et des boulangers. La personne ‘C’ est riche. Il y a 5 stars de Hollywood et 995 boulangers. Est-ce que la personne ‘C’ a plus de chance d’être:",
            answers: ["Une star de Hollywood", "Un boulanger"],
            correctAnswer: "Un boulanger",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 4/8"
        },
        {
            questionType: "video",
            videoUrl: "https://www.youtube.com/embed/4KBcTIO7XRQ?enablejsapi=1", 
            imgSRC: "/woman-eureka.png",
            pageNumber: "La négligence des taux de base"
        },
        {
            id: "G2Q5NconfAft",
            question: "Cette étude concerne des pompiers et des riches héritiers. La personne 'L' est courageuse. Il y a 996 pompiers et 4 riches héritiers. Est-ce que la personne 'L' a plus de chance d'être :",
            answers: ["Un pompier", "Un riche héritier"],
            correctAnswer: "Un pompier",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 5/8"
        },
        {
            id: "G2Q6NconfAft",
            question: "Cette étude concerne des chirurgiennes et des adolescentes. La personne 'V' est immature. Il y a 5 chirurgiennes et 995 adolescentes. Est-ce que la personne 'V' a plus de chance d'être :",
            answers: ["Une chirurgienne", "Une adolescente"],
            correctAnswer: "Une adolescente",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 6/8"
        },
        {
            id: "G2Q7ConfAft",
            question: "Cette étude concerne des jardiniers et des PDG. La personne 'S' est autoritaire. Il y a 995 jardiniers et 5 PDG. Est-ce que la personne 'S' a plus de chance d'être :",
            answers: ["Un jardinier", "Un PDG"],
            correctAnswer: "Un jardinier",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 7/8"
        },
        {
            id: "G2Q8ConfAft",
            question: "Cette étude concerne des scientifiques et des vendeurs par téléphone. La personne 'E' est rigoureuse. Il y a 6 scientifiques et 994 vendeurs par téléphone. Est-ce que la personne 'E' a plus de chance d'être :?",
            answers: ["Un scientifique", "Un vendeur par téléphone"],
            correctAnswer: "Un vendeur par téléphone",
            questionType: "question",
            imgSRC: "/woman-thinking.png",
            pageNumber: "La négligence des taux de base 8/8"
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

        //quizTitle.textContent = "La négligence des taux de base " + (index + 1) + "/9";
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
            
            window.location.href = "https://cogitum.powerappsportals.com/negligenceResultats/"
        }
    });

    loadQuestion(currentQuestionIndex);
});



