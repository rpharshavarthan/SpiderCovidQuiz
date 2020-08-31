window.onload = function () {
  document.getElementById("navbar").style.display = "none";
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("playagain").style.display = "none";
};
var arr = [
  {
    id: 0,
    question: "Q. In which age group the COVID-19 spreads?",
    answer: "All the above are correct",
    options: [
      "COVID - 19 occur in all age groups",
      "Coronavirus infection is mild in children",
      "Older person are at high risk to develop serious illness",
      "All the above are correct",
    ],
  },
  {
    id: 1,
    question: "Q. From where coronavirus got its name?",
    answer: "Due to their crown-like projections",
    options: [
      "Due to their crown-like projections",
      "Due to their leaf-like projections",
      "Due to their surface structure of bricks",
      "None of the above",
    ],
  },
  {
    id: 2,
    question: "Q. Mild Symptoms of Novel coronavirus are?",
    answer: "All the above",
    options: ["Fever", "Cough", "Shortness of breath", "All the above"],
  },
  {
    id: 3,
    question: "Q. The first case of novel coronavirus was identified in?",
    answer: "Wuhan, Hubei",
    options: ["Beijing", "Shanghai", "Wuhan, Hubei", "Tianjin"],
  },
  {
    id: 4,
    question:
      "Q. In a study, which cells are found in COVID-19 patients 'bode well' for long term immunity?",
    answer: "T-Cell",
    options: ["P-cell", "D-Cell", "T-Cell", "Endothelial Cells"],
  },
  {
    id: 5,
    question: "Q. Which of the following diseases are related to coronavirus?",
    answer: "Both A and B",
    options: ["MERS", "SARS", "Both A and B", "Neither A nor B"],
  },
  {
    id: 6,
    question: "Q. What is Coronavirus?",
    answer: "Both A and B are correct",
    options: [
      "It is a large family of viruses",
      "It belongs to the family of Nidovirus",
      "Both A and B are correct",
      "Only A is correct",
    ],
  },
  {
    id: 7,
    question:
      "Q. How long is average the incubation period for Wuhan coronavirus?",
    answer: "5-6 Days",
    options: ["5-6 Days", "12-24 Hours", "1 Month", "3-4 Weeks"],
  },
  {
    id: 8,
    question:
      "Q. How many countries are suffering from novel coronavirus outbreak in the World?",
    answer: "More than 200",
    options: [
      "More than 50",
      "More than 100",
      "More than 150",
      "More than 200",
    ],
  },
  {
    id: 9,
    question:
      "Q. Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?",
    answer: "Monkeys",
    options: ["Monkeys", "Lizards", "Hens", "Kites"],
  },
];
var quesDone = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var userAnswer = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var correctAnswer = [3, 0, 3, 2, 2, 2, 2, 0, 3, 0];
var scores = [];
var i = -1;
var points = 0;
var array = [];
while (array.length < 10) {
  var r = Math.floor(Math.random() * 10);
  if (array.indexOf(r) === -1) {
    array.push(r);
  }
}
var t;
const startingMinutes = 2;
var totalSeconds = startingMinutes * 60;
function timer() {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
  totalSeconds--;
  if (minutes == 0 && seconds == 0) {
    quizOver();
  }
}
function runTime() {
  t = setInterval(timer, 1000);
}
function stopTime() {
  console.log("yes");
  clearInterval(t);
  totalSeconds = startingMinutes * 60;
}
var user;
var form = document.getElementById("userForm");
form.addEventListener("submit", userName);
function userName(event) {
  event.preventDefault();
  user = document.getElementById("username").value;
  displayQuizPage();
  playerinfo = { name: "", score: 0 };
  scores.push(playerinfo);
  scores[scores.length - 1].name = user;
  runTime();
  next();
}
function next() {
  if (i < arr.length - 1) {
    i += 1;
    if (i == arr.length - 1) {
      document.getElementById("next").innerHTML = "FINISH";
    }
  } else if (i == arr.length - 1) {
    quizOver();
  }
  showQuestion(i);
}
function previous() {
  if (i > 0) {
    i -= 1;
  }
  if (i < arr.length - 1) {
    document.getElementById("next").innerHTML = "NEXT";
  }
  showQuestion(i);
}
function nav(p) {
  i = parseInt(p);
  if (i == arr.length - 1) {
    document.getElementById("next").innerHTML = "FINISH";
  } else {
    document.getElementById("next").innerHTML = "NEXT";
  }
  showQuestion(i);
}
function showQuestion(i) {
  document.getElementById("ques").innerHTML = arr[array[i]].question;
  for (var k = 0; k < 4; k++) {
    if (quesDone[i] == i && userAnswer[i] == k) {
      document.getElementById(k).innerHTML = arr[array[i]].options[k];
      document.getElementById(k).removeAttribute("onclick");
      if (correctAnswer[array[i]] == k) {
        right(k);
      } else {
        wrong(k);
      }
    } else if (quesDone[i] == i && userAnswer[i] != k) {
      document.getElementById(k).innerHTML = arr[array[i]].options[k];
      document.getElementById(k).removeAttribute("onclick");
      notAttempted(k);
    } else if (quesDone[i] == -1 && userAnswer[i] == -1) {
      document.getElementById(k).innerHTML = arr[array[i]].options[k];
      document.getElementById(k).setAttribute("onclick", "checkAns(this.id)");
      notAttempted(k);
    }
  }
}
function checkAns(id) {
  quesDone[i] = i;
  userAnswer[i] = id;
  document.getElementById(`q${i}`).style.backgroundColor = "black";
  document.getElementById(`q${i}`).style.color = "white";
  var clicked_option = document.getElementById(id).innerHTML;
  if (clicked_option == arr[array[i]].answer) {
    points += 1;
    right(id);
  } else {
    wrong(id);
  }
}
function quizOver() {
  displayScorePage();
  stopTime();
  document.getElementById("timer").innerHTML = "START";
  scores[scores.length - 1].score = points;
  scores.sort(function (a, b) {
    return b.score - a.score;
  });
  for (var i = 0; i < scores.length; i++) {
    var table = document.getElementById("scoretable");
    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i + 1;
    cell2.innerHTML = scores[i].name.toUpperCase();
    cell3.innerHTML = scores[i].score;
  }
}
function playAgain() {
  displayStartPage();
  points = 0;
  i = -1;
  array = [];
  quesDone = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  userAnswer = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  document.getElementById("username").value = "";
  document.getElementById("next").innerHTML = "NEXT";
  for (var k = 0; k < arr.length; k++) {
    document.getElementById(`q${k}`).style.backgroundColor =
      "rgba(255, 255, 255, 0.5)";
    document.getElementById(`q${k}`).style.color = "black";
  }
  for (var j = 0; j < scores.length; j++) {
    document.getElementById("scoretable").deleteRow(1);
  }
  randomArray();
}
function randomArray() {
  while (array.length < 10) {
    var r = Math.floor(Math.random() * 10);
    if (array.indexOf(r) === -1) {
      array.push(r);
    }
  }
}
function right(id) {
  document.getElementById(id).style.fontSize = "1.2em";
  document.getElementById(id).style.fontWeight = "600";
  document.getElementById(id).style.color = "lime";
  document.getElementById(id).style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  for (var i = 0; i < 4; i++) {
    document.getElementById(i).removeAttribute("onclick");
  }
}
function wrong(id) {
  document.getElementById(id).style.fontSize = "1.2em";
  document.getElementById(id).style.fontWeight = "600";
  document.getElementById(id).style.color = "red";
  document.getElementById(id).style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  for (var i = 0; i < 4; i++) {
    document.getElementById(i).removeAttribute("onclick");
  }
}
function notAttempted(id) {
  document.getElementById(id).style.fontSize = "1.1em";
  document.getElementById(id).style.fontWeight = "500";
  document.getElementById(id).style.color = "white";
  document.getElementById(id).style.backgroundColor = "rgba(0, 0, 0, 0.5)";
}
function displayQuizPage() {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("navbar").style.display = "grid";
  document.getElementById("quiz-box").style.display = "grid";
  document.getElementById("timer").style.display = "block";
}
function displayScorePage() {
  document.getElementById("scoreCard").style.display = "flex";
  document.getElementById("playagain").style.display = "block";
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("navbar").style.display = "none";
  document.getElementById("timer").style.display = "none";
}
function displayStartPage() {
  document.getElementById("scoreCard").style.display = "none";
  document.getElementById("playagain").style.display = "none";
  document.getElementById("start-page").style.display = "flex";
}
