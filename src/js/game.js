const game = document.querySelector(".game");
const loader = document.querySelector(".loader");
const answers = Array.from(document.getElementsByClassName("choice-text"));
const question = document.querySelector(".game__question");
const questionCounter = document.querySelector(".question-counter");
const scoreCounter = document.querySelector(".score-counter");
const progressBar = document.querySelector(".progress-bar-full");

let questionsList = [];
let availableQuestions = [];
let currentQuestion = {};
let currentQuestionNumber = 0;
let currentScore = 0;
let acceptAnswer = false;

const scoreBonus = 10;
const maxQuestions = 10;

window.location.pathname == "/game.html"
  ? axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((result) => {
        questionsList = result.data.results.map((item) => {
          // New object with question and random answer number
          const newQuestionObj = {
            question: changeEntitiesHTML(item.question),
            answer: Math.floor(Math.random() * 4) + 1,
          };
          // Array of incorrect answers
          const editedAnswers = [...item.incorrect_answers];
          // Add one true answer in array
          editedAnswers.splice(
            newQuestionObj.answer - 1,
            0,
            item.correct_answer
          );
          // Add properities to Object with array of answers
          editedAnswers.forEach((choice, index) => {
            newQuestionObj["choice" + (index + 1)] = changeEntitiesHTML(choice);
          });

          return newQuestionObj;
        });
        startGame();
      })
      .catch((error) => {
        console.log(error);
      })
  : null;

const startGame = () => {
  currentScore = 0;
  currentQuestionNumber = 0;
  availableQuestions = [...questionsList];
  getNewQuestion();
  loader.classList.add("hidden");
  game.classList.remove("hidden");
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    localStorage.setItem("mostScore", currentScore);
    console.log("yep");
    return window.location.assign("/end.html");
  }
  // Update question counter
  currentQuestionNumber++;
  questionCounter.innerText = `${currentQuestionNumber} / 10`;
  // Update progressBar
  progressBar.style.width = `${(currentQuestionNumber / maxQuestions) * 100}%`;
  // Random Question from
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  // Put random question in current
  currentQuestion = availableQuestions[questionIndex];
  // Change UI
  question.innerText = currentQuestion.question;
  answers.forEach((answer) => {
    const number = answer.dataset["number"];
    answer.innerHTML = currentQuestion["choice" + number];
  });
  // Delete question from array
  availableQuestions.splice(questionIndex, 1);
  acceptAnswer = true;
};

answers.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptAnswer) return;

    acceptAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(scoreBonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);
  });
});

const incrementScore = (num) => {
  currentScore += num;
  scoreCounter.innerText = currentScore;
};

const changeEntitiesHTML = (word) => {
  // Delete Special Character Codes from UI
  let localWord = word
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ograve;/g, "ò")
    .replace(/&Ograve;/g, "Ò")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&uuml;/g, "ü")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É");
  return localWord;
};
