var QUESTIONS;
var CURRENT_QUESTION = 0;

//function to load the questions from JSON, save then on Session storage and on QUESTIONS variable
function loadQuestions(){
    return fetch('./questions.json')
    .then((response) => response.json())
    .then(data => QUESTIONS = data) //save the questions on local variable to be easier to access
    .then(res => JSON.stringify(res))
    .then(data => sessionStorage.setItem("questions", data)) //also save the questions on to sessionStorage  
}
//Call the function to load the Questions
loadQuestions()

function next(){
  CURRENT_QUESTION++
  loadNextQuestion()
  moveCardsBack()
}

function moveCardsBack(){
  [1,2,3,4].forEach(el => 
    document.querySelector("#initial-container").appendChild(document.querySelector(`#b${el}`).childNodes[0])
  )
}

function loadNextQuestion(){
  //load the infomartion on the HTML element
  questionText = QUESTIONS.questions[CURRENT_QUESTION].text
  document.querySelector("#question").innerHTML = questionText
  document.querySelector("#a").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'a').text
  document.querySelector("#b").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'b').text
  document.querySelector("#c").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'c').text
  document.querySelector("#d").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'd').text
}


//Functions to Allow drag and drop on the page
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    //if to prevent to move one card inside another
    if (['a','b','c','d'].indexOf(ev.target.id) == -1){
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }
  }