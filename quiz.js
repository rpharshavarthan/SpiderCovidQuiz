window.onload = function () {
  next();
};
var arr = [
  {
    id: 0,
    question: "1. In which age group the COVID-19 spreads?",
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
    question: "2. From where coronavirus got its name?",
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
    question: "3. Mild Symptoms of Novel coronavirus are?",
    answer: "All the above",
    options: ["Fever", "Cough", "Shortness of breath", "All the above"],
  },
  {
    id: 3,
    question: "4. The first case of novel coronavirus was identified in?",
    answer: "Wuhan, Hubei",
    options: ["Beijing", "Shanghai", "Wuhan, Hubei", "Tianjin"],
  },
  {
    id: 4,
    question:
      "5. In a study, which cells are found in COVID-19 patients 'bode well' for long term immunity?",
    answer: "T-Cell",
    options: ["P-cell", "D-Cell", "T-Cell", "Endothelial Cells"],
  },
  {
    id: 5,
    question: "6. Which of the following diseases are related to coronavirus?",
    answer: "Both A and B",
    options: ["MERS", "SARS", "Both A and B", "Neither A nor B"],
  },
  {
    id: 6,
    question: "7. What is Coronavirus?",
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
      "8. How long is average the incubation period for Wuhan coronavirus?",
    answer: "5-6 Days",
    options: ["5-6 Days", "12-24 Hours", "1 Month", "3-4 Weeks"],
  },
  {
    id: 8,
    question:
      "9. How many countries are suffering from novel coronavirus outbreak in the World?",
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
      "10. Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?",
    answer: "Monkeys",
    options: ["Monkeys", "Lizards", "Hens", "Kites"],
  },
];
var quesDone = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var userAnswer = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var correctAnswer = [3, 0, 3, 2, 2, 2, 2, 0, 3, 0];
var i = -1;
var points = 0;

function next() {
  if (i < arr.length - 1) {
    i += 1;
    if (i == arr.length - 1) {
      document.getElementById("next").innerHTML = "FINISH";
    }
  } else if (i == arr.length - 1) {
    score();
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
function showQuestion(i) {
  document.getElementById("ques").innerHTML = arr[i].question;
  for (var k = 0; k < 4; k++) {
    if (quesDone[i] == i && userAnswer[i] == k) {
      document.getElementById(k).innerHTML = arr[i].options[k];
      document.getElementById(k).removeAttribute("onclick");
      if (correctAnswer[i] == k) {
        right(k);
      } else {
        wrong(k);
      }
    } else if (quesDone[i] == i && userAnswer[i] != k) {
      document.getElementById(k).innerHTML = arr[i].options[k];
      document.getElementById(k).removeAttribute("onclick");
      notAttempted(k);
    } else if (quesDone[i] == -1 && userAnswer[i] == -1) {
      console.log("3rd");
      document.getElementById(k).innerHTML = arr[i].options[k];
      document.getElementById(k).setAttribute("onclick", "checkAns(this.id)");
      notAttempted(k);
    }
  }
}
function checkAns(id) {
  quesDone[i] = i;
  userAnswer[i] = id;
  console.log(quesDone);
  console.log(userAnswer);
  var clicked_option = document.getElementById(id).innerHTML;
  if (clicked_option == arr[i].answer) {
    points += 1;
    right(id);
  } else {
    wrong(id);
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
function score() {
  document.getElementById("scoreCard").style.display = "flex";
  document.getElementById("Score").innerHTML =
    "YOUR SCORE:" + points + "/" + arr.length;
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("next").style.display = "none";
  document.getElementById("prev").style.display = "none";
}
