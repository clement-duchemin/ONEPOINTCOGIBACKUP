
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
        batEn: {
            title: "Bat and Ball",
            instructions: [
                "You're going to be faced with a set of reasoning problems.",
                "Choose the right answer from 4 options, but no rush – take all the time you need!",
                "Score 1 point for each correct answer; miss, and you won't earn any points.",
                "Best of luck! 🧠🌟"
            ],
            link: "/batQuestionsEn",
            img: "/golden-ball.png",
            //buttonText: "Jouer à la batte et Balle"
        },
        negligenceEn: {
            title: "The neglect of base rates",
            instructions: [
                "In a big research project, a large number of studies were carried out where a psychologist made short personality descriptions of the participants.",
                "In every study, there were participants from two population groups (e.g., carpenters and policemen).",
                "You'll gain insight into the trait of a single participant, randomly selected from the sample.",
                "Your task: Match the trait to the right population group. 🕵️‍♂️",
                "Score 1 point for every correct match; slip up, and points elude you.",
                "Ready to dive into the challenge? Good luck! 🧠🌟"
            ],
            link: "/neglectQuestionsEn",
            img: "/magnifying-glass.png",
            //buttonText: "Jouer à la négligence des taux de base"
        },
        conjonctionEn: {
            title: "The conjunction fallacy",
            instructions: [
                "In this task, you will always see a brief description of a person, for example, 'Mary, 34, has previously studied medicine and likes the Red Cross'.",
                "You will also see four possible professions and/or activities.",
                "Your mission? Identify which of the four options is the most probable. 🕵️‍♂️",
                "Only one answer is allowed!",
                "Score 1 point for each correct answer. If you fail, you won't earn any points.",
                "Ready to take on the challenge?",
                "Good luck! 🧠🌟"
            ],
            link: "/conjunctionQuestionsEn",
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



