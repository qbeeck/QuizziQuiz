const highScoresList = document.querySelector(".list");

if (window.location.pathname == "/highlight.html") {
  const addData = () => {
    firebase
      .database()
      .ref("players")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let newObject = {
            username: childSnapshot.val().username,
            points: childSnapshot.val().points,
          };
          addLi(newObject);
        });
      });
  };

  const addLi = (obj) => {
    highScoresList.insertAdjacentHTML(
      "afterbegin",
      `<li>${obj.username} : ${obj.points}</li>`
    );
  };

  document.addEventListener("DOMContentLoaded", () => {
    addData();
  });
}
