
async function loadQuestions(){
    fetch('./questions.json')
    .then((response) => response.json())
    .then(data => createElements(data.questions) )
    
}

function createElements(data){
    var form = document.querySelector("#colors-test")
    data.forEach(element => {
        let question = `question_${element.id}`
        //creating the question div
        let questionDiv = document.createElement("div")
        questionDiv.className = "question"
        
        //creating the question text
        let questionText = document.createElement("h2")
        questionText.innerHTML = `${element.id} - ${element.text}`
        questionText.className = "question-text"
        questionDiv.appendChild(questionText)

        //creating the answers options
        let answersDiv = document.createElement("div")
        answersDiv.className = "answers-options"
        element.options.forEach(answer => {
            //creating the answer's label
            let label = document.createElement("label")
            label.setAttribute("for", `${question}_answer_${answer.id}`)
            label.innerHTML = `${answer.id} - ${answer.text}`
            label.className = "answer-radio-label"

            let radio = document.createElement("input")
            radio.setAttribute("type", "radio")
            radio.setAttribute("id", `${question}_answer_${answer.id}`)
            radio.setAttribute("name", `${question}_answers`)
            radio.className = "answer-radio-input"

            let blankLine = document.createElement("br")

            answersDiv.appendChild(radio)
            answersDiv.appendChild(label)
            answersDiv.appendChild(blankLine)
        });

        //adding the question to the form
        questionDiv.appendChild(answersDiv)
        form.appendChild(questionDiv)

    });
    //creating the submit button
    var myButton = document.createElement("input")
    myButton.setAttribute("type","submit")
    myButton.setAttribute("value","submit")
    myButton.className = "submit-button"
    form.appendChild(myButton)
}
