const highScoresList = document.querySelector(".list");
const highScores = JSON.parse(localStorage.getItem("highScores"));

console.log(highScores);

if (window.location.pathname == "/highlight.html") {
  highScoresList.innerHTML = highScores
    .map((score) => {
      console.log("heelp")
      return `<li>${score.name} - ${score.score}p</li>`;
    })
    .join("");
}
