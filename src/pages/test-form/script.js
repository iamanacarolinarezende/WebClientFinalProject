var QUESTIONS;
var CURRENT_QUESTION = 0;

async function loadQuestions(){
//function to load the questions from JSON, save then on Session storage and on QUESTIONS variable
    return fetch('./questions.json')
    .then((response) => response.json())
    .then(data => QUESTIONS = data) //save the questions on local variable to be easier to access
    .then(res => JSON.stringify(res))
    .then(data => sessionStorage.setItem("questions", data)) //also save the questions on to sessionStorage  
}


function $(el){
  return document.querySelector(`${el}`)
}

function next(){
  //before loading the next question, validade if all cards were moved
  if(!allCardsWereMoved()){
    //save the user's answers on the object Questions
    collectAnswers()
    if(!((QUESTIONS.questions.length - 1) == CURRENT_QUESTION)){
      //just do this things if it's not the last question
      CURRENT_QUESTION++
      loadNextQuestion()
      moveCardsBack()
    }else {
      window.location.href="../test-result-table/index.html"
    }
    //insert here and else to send the user to another page
  }else $("#error-message").innerHTML = "Please move all cards"
}

function moveCardsBack(){
  //move the cards to the initial container when loading a new question
  [1,2,3,4].forEach(el => 
    $("#initial-container").appendChild($(`#b${el}`).childNodes[0])
  )
  $("#error-message").innerHTML = ""
}

function allCardsWereMoved(){
  //validade if all cards were moved
  return $("#initial-container").childElementCount > 0
}

function collectAnswers(){
  var res = [];
  
  [1,2,3,4].forEach(el => res.push([el, $(`#b${el}`).childNodes[0].id]));

  QUESTIONS.questions[CURRENT_QUESTION].answers = res;
  
  updateQuestionsOnSessionStorage()
  
}

async function loadNextQuestion(){
  //load the infomartion on the HTML element
  if(QUESTIONS === undefined){
      //Call the function to load the Questions
  await loadQuestions()
  }
  $("#question").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].text

  $("#a").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'a').text

  $("#b").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'b').text

  $("#c").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'c').text

  $("#d").innerHTML = QUESTIONS.questions[CURRENT_QUESTION].options.find( val => val.id == 'd').text


}

function updateQuestionsOnSessionStorage(){
  sessionStorage.setItem("questions", JSON.stringify(QUESTIONS))
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
  if ((['a','b','c','d'].indexOf(ev.target.id) == -1 
      && ev.target.childElementCount == 0)
      || ev.target.id == 'initial-container') //permit to move card back to initial container
  {
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
}