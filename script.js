window.onload = function () {
    var start = document.getElementById("start");
    var counter = document.getElementById("counter");
    var score = document.getElementById("score");
    var submit = document.getElementById("submit");
    var initials = document.getElementById("initials");
    var questionArea = document.getElementsByClassName('questions')[0];
    var answerArea = document.getElementsByClassName('answers')[0];
    var checker = document.getElementsByClassName('checker')[0];
    let intervalCountdown;
    var totalScore = 0;
    let current = 0;


    allQuestions = {

        "What will the code: (console.log(1 + 2 * 3)) print?": ['6', '7', '9', '123', 1],

        "Which of the following is mutable?": ['Array', 'Number', 'string', 'boolean', 0],

        "What will the code: console.log(1 == '1.0') print?": ['NaN', 'false', 'true', 'undefined', 2],

        "Which of the following is NOT true?": ['!A && !B === !(A||B)', 'A && B === !A || !B',
            '!(!A && !B) === A || B', '!(A && B) === !A ||!B', 1],

        "What is the best description of the string slice() function?": ['Divides a string into two',
            'Divides a string sentence into an array containing each word',
            'Removes the first character from a string',
            'Extracts a section of a string and returns a new string', 3]

    };




    function loadQuestion(curr) {

        var question = Object.keys(allQuestions)[curr];

        questionArea.innerHTML = '';

        questionArea.innerHTML = question;


    }

    function loadAnswers(curr) {

        var answers = allQuestions[Object.keys(allQuestions)[curr]];

        answerArea.innerHTML = '';

        for (var i = 0; i < answers.length - 1; i += 1) {
            var createDiv = document.createElement('div'),
                text = document.createTextNode(answers[i]);

            createDiv.appendChild(text);
            createDiv.addEventListener("click", checkAnswer(i, answers));

            answerArea.appendChild(createDiv);

        }


    }

    function checkAnswer(i, arr) {

        return function () {
            var givenAnswer = i,
                correctAnswer = arr[arr.length - 1];

            if (givenAnswer === correctAnswer) {
                addChecker(true);
            } else {
                addChecker(false);
                counter.innerHTML -= 5
            }

            if (current < Object.keys(allQuestions).length - 1) {
                current += 1;

                loadQuestion(current);
                loadAnswers(current);
            } else {
                questionArea.innerHTML = 'Done';
                percentScore = document.getElementById("percent-score");
                percentScore.innerHTML = (totalScore / Object.keys(allQuestions).length * 100) + "%";
                showSubmitButton();
                
                // score.innerHTML = totalScore;
                answerArea.innerHTML = '';
                clearInterval(intervalCountdown)
            }

        };
    }

    function addChecker(bool) {

        var createDiv = document.createElement('div'),
            text = document.createTextNode(current + 1);

        createDiv.appendChild(text);

        if (bool) {

            totalScore++;
            createDiv.className += 'correct';
            checker.appendChild(createDiv);

        } else {
            createDiv.className += 'false';
            checker.appendChild(createDiv);

        }
    }
    function countDown() {
        let value = counter.innerHTML
        value = value - 1;
        if (value == 0 || value < 0) {

            score.innerHTML = totalScore;

            questionArea.innerHTML = 'Done';
            percentScore = document.getElementById("percent-score");
            percentScore.innerHTML = (totalScore / Object.keys(allQuestions).length * 100) + "%";

            answerArea.innerHTML = '';
            clearInterval(intervalCountdown)

        } else { counter.innerHTML = value }



    }

    function begin() {

        loadQuestion(current);
        loadAnswers(current);
        intervalCountdown = setInterval(countDown, 1000);
        removeStartButton();
        hideSubmitButton();

    }
    
    function scoreReport() {

        percentScore = document.getElementById("percent-score");
        percentScore.innerHTML = '';
        localStorage.setItem('score', totalScore);
        localStorage.setItem('value', initials.value);        
        start.style.display = 'inline-block';
        counter.innerHTML = 50;
        questionArea.innerHTML = '';
        checker.innerHTML = '';
        initials.value = '';
        totalScore = 0;
        current = 0;
        score.innerHTML =''

    }

    function removeStartButton() {
        start.style.display = 'none';
    }

    function showSubmitButton() {
        submit.style.display = 'inline-block';
    }


    function hideSubmitButton() {
        submit.style.display = 'none';
    }






    start.addEventListener("click", function () { begin() });
    submit.addEventListener("click", function () { scoreReport() })

};


