const quizData = [
    {
        question: "What is the main objective of BGMI?",
        answers: ["To be the last player/team standing", "To collect the most loot", "To complete missions", "To explore the map"],
        correctAnswer: "To be the last player/team standing"
    },
    {
        question: "Which company developed BGMI?",
        answers: ["Epic Games", "Krafton", "Activision", "Electronic Arts"],
        correctAnswer: "Krafton"
    },
    {
        question: "When was BGMI officially released for Android devices?",
        answers: ["July 2, 2020", "July 2, 2021", "July 2, 2019", "July 2, 2018"],
        correctAnswer: "July 2, 2021"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<li>
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
                        ${currentQuestion.answers[letter]}
                    </label>
                </li>`
            );
        }

        output.push(
            `<div class="question">${currentQuestion.question}</div>
            <ul class="answers">${answers.join('')}</ul>
            <div id="correct-answer${questionNumber}" class="correct-answer-message" style="display: none;">
                Correct answer: ${currentQuestion.correctAnswer}
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
            document.getElementById(`correct-answer${questionNumber}`).style.display = 'block';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${quizData.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);
