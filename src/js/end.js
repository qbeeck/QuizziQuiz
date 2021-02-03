const username = document.querySelector(".input-username");
const saveBtn = document.getElementById("save-button");
const finalScore = document.querySelector(".final-score");
const mostRecentScore = localStorage.getItem("mostScore");

var firebaseConfig = {
  apiKey: "AIzaSyCYBss10j2vvnqVZ0W1i6m1s8HClYVW1Oo",
  authDomain: "javasc-a9a08.firebaseapp.com",
  projectId: "javasc-a9a08",
  storageBucket: "javasc-a9a08.appspot.com",
  messagingSenderId: "636217841571",
  appId: "1:636217841571:web:f0193b4a8a89bdfcec6c16",
};

firebase.initializeApp(firebaseConfig);

if (window.location.pathname == "/end.html") {
  // Change game Score to FinalScore
  finalScore.innerText = mostRecentScore;
  // If username not empty => button enabled
  username.addEventListener("keyup", () => {
    saveBtn.disabled = !username.value;
  });
  // Save username score => send data to dataBase and refresh page
  saveBtn.addEventListener("click", () => {
    sendData();
    setTimeout(() => {
      return window.location.assign("/index.html");
    }, 1000);
  });
  // send Data to Firebase
  const sendData = () => {
    firebase
      .database()
      .ref("players/" + username.value)
      .set({
        username: username.value,
        points: finalScore.textContent,
      });
  };
}
