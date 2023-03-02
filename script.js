window.onload = function () {
    var start = document.getElementById("start");
    var counter = document.getElementById("counter");
    let intervalCountdown;
    var logData = document.getElementById("logData");


    var questionArea = document.getElementsByClassName('questions')[0],
        answerArea = document.getElementsByClassName('answers')[0],
        checker = document.getElementsByClassName('checker')[0],
        current = 0,

        // An object that holds all the questions + possible answers.
        // In the array --> last digit gives the right answer position
        allQuestions = {
            "What will the code: (console.log(1 + 2 * 3)) print?": ['6', '7', '9', '123', 1],

            "Which of the following is mutable?": ['Array', 'Number', 'string', 'boolean', 0],

            "What will the code: console.log(1 == '1.0') print?": ['NaN', 'false', 'true', 'undefined', 2],

            "Which of the following is NOT true?": ['!A && !B === !(A||B)', 'A && B === !A || !B', '!(!A && !B) === A || B', '!(A && B) === !A ||!B', 1],

            "What is the best description of the string slice() function?": ['Divides a string into two',
                'Divides a string sentence into an array containing each word', 'Removes the first character from a string',
                'Extracts a section of a string and returns a new string', 3]

        };

    // const questionTime = 10;
    // let counter = 0;

    // function startTimer() {
    //     counter = setInterval(start) {
    //         counter.innerHTML = counter;
    //     }
    // }



    function loadQuestion(curr) {
        // This function loads all the question into the questionArea
        // It grabs the current question based on the 'current'-variable

        var question = Object.keys(allQuestions)[curr];

        questionArea.innerHTML = '';
        questionArea.innerHTML = question;
    }

    function loadAnswers(curr) {
        // This function loads all the possible answers of the given question
        // It grabs the needed answer-array with the help of the current-variable
        // Every answer is added with an 'onclick'-function

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
        // This is the function that will run, when clicked on one of the answers
        // Check if givenAnswer is sams as the correct one
        // After this, check if it's the last question:
        // If it is: empty the answerArea and let them know it's done.

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

                answerArea.innerHTML = '';
                clearInterval(intervalCountdown)
            }

        };
    }

    function addChecker(bool) {
        // This function adds a div element to the page
        // Used to see if it was correct or false

        var createDiv = document.createElement('div'),
            txt = document.createTextNode(current + 1);

        createDiv.appendChild(txt);

        if (bool) {

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
        if (value == 0) {

            questionArea.innerHTML = 'Done';
            answerArea.innerHTML = '';
            clearInterval(intervalCountdown)

        } else { counter.innerHTML = value }

    }

    function begin() {

        loadQuestion(current);
        loadAnswers(current);
        intervalCountdown = setInterval(countDown, 1000);

    }
    function scoreReport() {
        let score = 0;

        for (var i = 0; i < Object.keys(allQuestions).length; i++) {
            if (addChecker(true) ) {
                score += 1;
            }

        scoreReport.style.display = 'block';
        let finalScore = Math.round(score/ allQuestions.length * 100);
        


     function logData() {
        createDiv.appendChild(input)
        
    
     }
    start.addEventListener("click", function () { begin() })
    // Start the quiz right away

};


