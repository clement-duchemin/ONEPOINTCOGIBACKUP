

/*     modal      */
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit-button-modal');
    const consentCheckbox = document.getElementById('consentCheckbox');
    const modal = document.getElementById('consentModal');
    const body = document.body;

    // Function to disable scrolling
    function disableScrolling(){
        const scrollY = window.scrollY; // Save the scroll position
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
    }

    // Function to enable scrolling
    function enableScrolling(){
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Check if consent has already been given
    if (sessionStorage.getItem('consentGiven') === 'true') {
        modal.style.display = 'none'; // Do not display the modal
        enableScrolling(); // Ensure scrolling is enabled
    } else {
        // Display the modal and disable scrolling if consent has not been given
        modal.style.display = 'block';
        disableScrolling();
    }

    submitButton.addEventListener('click', function (event) {
        if (!consentCheckbox.checked) {
            //alert('You must check the consent box to proceed.');
            consentCheckbox.classList.add('input-error');
            event.preventDefault(); // Prevent form submission
            return false;
        } else {
            // Hide the modal, enable scrolling, and store consent
            modal.style.display = 'none';
            enableScrolling();
            sessionStorage.setItem('consentGiven', 'true');
        }
    });
});





/*  Dynamic content      */

document.addEventListener("DOMContentLoaded", function() {
    // Define the game information, including titles and instruction text
    const gamesInfo = {
        batte: {
            title: "La batte et balle",
            instructions: [
                "Vous allez être confronté(e) à des problèmes de raisonnement.",
                "Choisissez la bonne réponse parmi 4 options, mais ne vous précipitez pas - vous avez tout le temps nécessaire !",
                "Marquez 1 point pour chaque réponse correcte ; échouez, et vous ne gagnerez aucun point.",
                "Bonne chance ! 🧠🌟"
            ],
            link: "/batteQuestions",
            img: "/golden-ball.png",
            //buttonText: "Jouer à la batte et Balle"
        },
        negligence: {
            title: "La négligence des taux de base",
            instructions: [
                "Dans le cadre d’un large projet de recherche, de nombreuses études ont été conduites. Des descriptions très courtes de la personnalité des participants ont été réalisées.",
                "Dans chaque étude, les participants provenaient de deux groupes de population différents (par exemple, des charpentiers et des policiers).",
                "Vous aurez un aperçu du trait d'un participant, choisi au hasard dans l'échantillon.",
                "Votre mission ? Vous devrez indiquer à quel groupe le participant a le plus de chances d’appartenir. 🕵️‍♂️",
                "Marquez 1 point pour chaque réponse correcte ; échouez, et vous ne gagnerez aucun point.",
                "Prêt à relever le défi ?",
                "Bonne chance ! 🧠🌟"
            ],
            link: "/negligenceQuestions",
            img: "/magnifying-glass.png",
            //buttonText: "Jouer à la négligence des taux de base"
        },
        conjonction: {
            title: "L'erreur de conjonction",
            instructions: [
                "Dans cette tâche, vous verrez toujours une brève description d'une personne, par exemple, 'Marie, 34 ans, a étudié la médecine et aime la Croix-Rouge'.",
                "Vous verrez également quatre professions et/ou activités possibles.",
                "Votre mission ? Indiquer laquelle des quatre options est la plus probable. 🕵️‍♂️",
                "Une seule réponse est autorisée !",
                "Marquez 1 point pour chaque réponse correcte. Si vous échouez, vous ne gagnerez aucun point.",
                "Prêt à relever le défi ?",
                "Bonne chance ! 🧠🌟"
            ],
            link: "/conjonctionQuestions",
            img: "/chef.png",
            //buttonText: "Jouer à l'erreur de conjonction"
        },
    };

     function showModal() {
        if (!sessionStorage.getItem('consentGiven')) {
            document.getElementById('consentModal').style.display = 'block';
        }
    }

    // Call showModal function to display the modal when the page loads
    showModal();

    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get the game parameter from the URL
    const game = getUrlParameter('game');

    // Update the page content if the game parameter exists and matches
    if (gamesInfo[game]) {
        // Update the title
        document.getElementById('title-question').textContent = gamesInfo[game].title;
        document.getElementById('img-icon').src = gamesInfo[game].img;
        
        // Update instruction paragraphs
        const instructionParagraphs = document.querySelectorAll('.question');
        instructionParagraphs.forEach((p, index) => {
            if (gamesInfo[game].instructions[index]) {
                p.textContent = gamesInfo[game].instructions[index];
            }
        });
        
        // Update the button link and text (if necessary)
        const playButton = document.querySelector('.submit-button');
        playButton.setAttribute('onclick', `location.href='${gamesInfo[game].link}'`);
        //const buttonText = document.querySelector('.button-text');
        //buttonText.textContent = gamesInfo[game].buttonText;
    }
});















