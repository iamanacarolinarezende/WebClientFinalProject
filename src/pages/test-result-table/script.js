// Create a new link element
var link = document.createElement("link");

// Set the attributes of the link element
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "style.css");

// Append the link element to the head of the document
document.head.appendChild(link);


var peronalityResult=''

function displayUserData() {
  // I get the answers from the sessionStorage.
  var storedAnswers = JSON.parse(sessionStorage.getItem("questions"));

  if (storedAnswers && storedAnswers.questions) {
    //check if answers are there
    var totalPointsOfA = 0;
    var totalPointsOfB = 0;
    var totalPointsOfC = 0;
    var totalPointsOfD = 0;

    for (var i = 0; i < storedAnswers.questions.length; i++) {
      var answerRow = i; 

      //  document.getElementById("result_table").rows[answerRow].cells[0].innerText = storedAnswers.questions[i].id;
      //  document.getElementById("result_table").rows[answerRow].cells[1].innerText = storedAnswers.questions[i].text;

      var pointsOfA = 0;
      var pointsOfB = 0;
      var pointsOfC = 0;
      var pointsOfD = 0;

      for (var j = 0; j < storedAnswers.questions[i].answers.length; j++) {
        //here Im getting the letter or alphabet [a-b]
        var answer = storedAnswers.questions[i].answers[j][1];
        // getting the position of the letter, for example a is 1
        var position = storedAnswers.questions[i].answers[j][0];
        // adding points to each letter
        if (answer === 'a') {
          if (position === 1) {
              pointsOfA += 4;
          } else if (position === 2) {
              pointsOfA += 3;
          } else if (position === 3) {
              pointsOfA += 2;
          } else if (position === 4) {
              pointsOfA += 1;
          }
        } else if (answer === 'b') {
          if (position === 1) {
            pointsOfB += 4;
          } else if (position === 2) {
              pointsOfB += 3;
          } else if (position === 3) {
              pointsOfB += 2;
          } else if (position === 4) {
              pointsOfB += 1;
          }

        } else if (answer === 'c') {
          if (position === 1) {
            pointsOfC += 4;
          } else if (position === 2) {
              pointsOfC += 3;
          } else if (position === 3) {
              pointsOfC += 2;
          } else if (position === 4) {
              pointsOfC += 1;
          }

        } else if (answer === 'd') {
          if (position === 1) {
            pointsOfD += 4;
          } else if (position === 2) {
              pointsOfD += 3;
          } else if (position === 3) {
              pointsOfD += 2;
          } else if (position === 4) {
              pointsOfD += 1;
          }
        }
      }
      //assigning points to each tr
      document.getElementById("result_table").rows[answerRow+1].cells[1].innerText = pointsOfA;
      document.getElementById("result_table").rows[answerRow+1].cells[2].innerText = pointsOfB;
      document.getElementById("result_table").rows[answerRow+1].cells[3].innerText = pointsOfC;
      document.getElementById("result_table").rows[answerRow+1].cells[4].innerText = pointsOfD;
      //calculating total
      totalPointsOfA += pointsOfA;
      totalPointsOfB += pointsOfB;
      totalPointsOfC += pointsOfC;
      totalPointsOfD += pointsOfD;
    }
    //displaying the total in the last tr
    document.getElementById("result_table").rows[storedAnswers.questions.length+1].cells[0].innerText = "TOTAL POINTS";
    document.getElementById("result_table").rows[storedAnswers.questions.length+1].cells[1].innerText = totalPointsOfA;
    document.getElementById("result_table").rows[storedAnswers.questions.length+1].cells[2].innerText = totalPointsOfB;
    document.getElementById("result_table").rows[storedAnswers.questions.length+1].cells[3].innerText = totalPointsOfC;
    document.getElementById("result_table").rows[storedAnswers.questions.length+1].cells[4].innerText = totalPointsOfD;

    var obj = {'a':totalPointsOfA,'b':totalPointsOfB,'c':totalPointsOfC,'d':totalPointsOfD}
    console.log("Object Original:")
    console.log(obj)

// teste augusto 
    const keyValueArray = Object.entries(obj);
    // Sort the array based on the values (second element of each sub-array)
    keyValueArray.sort((a, b) => b[1]- a[1]);
    var final = [...keyValueArray[0][0], keyValueArray[1][0]]
    console.log(final)
    // Create a new object from the sorted array
    //const sortedObject = Object.fromEntries(keyValueArray);
    //console.log("Object Sorted:")
    //console.log(sortedObject)
//

    // Find the maximum value
    var maxPoints = Math.max(...Object.values(obj));

    // Extracting the two highest scores
    var sortedScores = Object.values(obj).sort((a, b) => b - a).slice(0, 2);

    // Iterating through the table cells and applying styles to the cells containing the two highest scores
    for (var i = 1; i < 5; i++) { // Assuming columns 1 to 4 contain scores
        var cellValue = document.getElementById("result_table").rows[storedAnswers.questions.length + 1].cells[i].innerText;
        
        if (sortedScores.includes(parseInt(cellValue))) {
            // Apply styles to highlight the cells with the highest scores
            document.getElementById("result_table").rows[storedAnswers.questions.length + 1].cells[i].style.fontWeight = "bold";
            document.getElementById("result_table").rows[storedAnswers.questions.length + 1].cells[i].style.fontSize = "larger";
            document.getElementById("result_table").rows[storedAnswers.questions.length + 1].cells[i].style.color = "blue";
            document.getElementById("result_table").rows[storedAnswers.questions.length + 1].cells[i].style.animation = "highlight 1s ease-in-out infinite";
        }
    }

    // Find characters with the maximum value
    var charactersWithMaxPoints = Object.keys(obj).filter(key => obj[key] === maxPoints).slice(0, 2);

    //save the final result to session storage
    sessionStorage.setItem("finalResult", charactersWithMaxPoints)
    
    //call the function to create te links with the responses
    displayResults(final)

  }
}

function displayResults(arrayString){
  var colors = {a: 'Orange', b: 'Green', c: 'Blue', d: 'Gold'}
  arrayString.forEach(element => {
    var button = document.createElement('button');
    button.setAttribute("class", "button-for-colors");
    button.innerHTML = `${colors[element]}`;
    button.onclick = function() {
      window.location.href = `../test-result-colors/${element}.html`;
    };
    document.querySelector(".results").appendChild(button);
  });
}

// Call the function to display user data when the page loads
window.onload = displayUserData;


