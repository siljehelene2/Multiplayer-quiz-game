const scorePlayer1 = sessionStorage.getItem("player1");
const scorePlayer2 = sessionStorage.getItem("player2");

const final = document.getElementById("finalScore");
const final2 = document.getElementById("finalScore2");

final.innerText = scorePlayer1;
final2.innerText = scorePlayer2;