//Fetch retrieves existing journal entries and prints them to the DOM
fetch("http://localhost:8088/journalEntries")
    .then(response => response.json())
    .then(parsedJournalEntries => {
        parsedJournalEntries.forEach(entry => {
            const journalAsHTML = journalDOMComponent(entry);
            writeToDom(journalAsHTML)
        })

    })
let moodDropDown = document.getElementById("moodOption")
let moodRadioButtonContainer = document.getElementById("radioButtons")

let moodOptions =["Happy 😁", "Sad 😭", "Curious 🧠", "Excited 🤩", "Fearful 😱", "Frustrated 🤯", "Near Hopeless 💩", "VERKLEMPT 😒", "Winning 🏆", "Losing 🥉", "DGAF 🤷🏽‍♀️", "Anger of 1000 burning Suns 🤬", "VOM 🤮", ,"Magical 🧜🏼‍♀️"]

const moodRadioButtonCreator = (mood) => { return `
<input type="radio" name="mood" value="${mood}" id="${mood}"> ${mood}`}

moodOptions.forEach(mood =>
    moodRadioButtonContainer.innerHTML += moodRadioButtonCreator(mood))

const moodOptionCreator = (mood) => { return `
<option class="options" value="${mood}">${mood}</option>`
}

moodOptions.forEach(mood => {
    moodDropDown.innerHTML += moodOptionCreator(mood)
});

//refrence to the HTML element where the created journal entry elements will be injected
let entryContainer = document.getElementById("entryContainer")

//Returns the HTML for Journal Entries
let journalDOMComponent = (oneEntry) => `
    <div class="card JournalEntry" style="width: 20rem;">
    <div class="card-body">
    <h5 class="card-title entryTitle">${oneEntry.conceptsCovered}</h5>
    <h6 class="card-subtitle mb-2 text-muted ">${oneEntry.date}</h6>
    <h6 class="card-subtitle mb-2 text-muted ">${oneEntry.mood}</h6>
    <p class="card-text contents">${oneEntry.journalContents}</p>

    </div>
    </div>`

//Creates the Journal Entry object that will be sent to the json database
let journalFactory = (conceptsCovered, date, mood, journalContents) => {
    return {
        date: date,
        conceptsCovered: conceptsCovered,
        mood: mood,
        journalContents: journalContents
    }
}

//function that adds created journal entry element to DOM
const writeToDom = (whatToPrint) => {
    entryContainer.innerHTML += whatToPrint
}


searchInput.addEventListener('keypress', event => {
    //if the enter button is pressed
    if (event.keyCode === 13) {
      entryContainer.innerHTML= ""
      const searchTerm = event.target.value
    fetch("http://localhost:8088/journalEntries")
    .then(response => response.json())
    .then(parsedJournalEntries => {
      parsedJournalEntries.forEach(entry => {
          let entryArray = Object.values(entry)
          entryArray.forEach(item => {
           if(item.toString().includes(searchTerm)){
            writeToDom(journalDOMComponent(entry))
           }})
         })
      })
    }
  })


moodRadioButtonContainer.addEventListener("click", (event) => {
    entryContainer.innerHTML = ""
    let filterChoice =  document.querySelector('input[name = "mood"]:checked').value
    fetch("http://localhost:8088/journalEntries")
    .then(response => response.json())
    .then(parsedJournalEntries => {
       parsedJournalEntries.filter(entry => entry.mood === filterChoice)
        .forEach (entry => {
            writeToDom(journalDOMComponent(entry))
        })
        })

    })

//Event listener, on click
document.getElementById("submitButton").addEventListener("click", () => {
    //refrences to user input values in the html form
    let conceptsCovered = document.getElementById("conceptsCovered").value
    let date = document.getElementById("journalDate").value
    let mood = document.getElementById("moodOption").value
    let journalContents = document.getElementById("journalEntry").value
    //Variable that stores the value of the journal object function with form values as arguments,  creating function in a variable
    let entryToPost = journalFactory(conceptsCovered, date, mood, journalContents)

    //fetch 'post', puts the newly created journal object in the json database
    fetch("http://localhost:8088/journalEntries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryToPost)
    })
   .then(fetch("http://localhost:8088/journalEntries")
   .then(response => response.json())
   .then(parsedJournalEntries => {
       parsedJournalEntries.forEach(entry => {
           const journalAsHTML = journalDOMComponent(entry);
           writeToDom(journalAsHTML)
       })

   }))
})

