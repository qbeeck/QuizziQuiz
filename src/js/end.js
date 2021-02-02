const username = document.querySelector(".input-username");
const saveBtn = document.getElementById("save-button");
const finalScore = document.querySelector(".final-score");
const mostRecentScore = localStorage.getItem("mostScore");

if (window.location.pathname == "/end.html") {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  // Change score of game
  finalScore.innerText = mostRecentScore;
  // while username == "" button disabled
  username.addEventListener("keyup", () => {
    saveBtn.disabled = !username.value;
  });

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const score = {
      name: username.value,
      score: mostRecentScore,
    };

    highScores.push(score);

    highScores.sort((a, b) => {
      return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    console.log(highScores);
    return window.location.assign("/index.html");
  });
}
