//Fetch retrieves existing journal entries and prints them to the DOM
fetch("http://localhost:8088/journalEntries")
    .then(response => response.json())
    .then(parsedJournalEntries => {
        parsedJournalEntries.forEach(entry => {
            const journalAsHTML = journalDOMComponent(entry);
            writeToDom(journalAsHTML)
        });

    })

//Returns the HTML for Journal Entries
let journalDOMComponent = (oneEntry) => `
    <div class="card JournalEntry" style="width: 20rem;">
    <div class="card-body" "oneFood">
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

//refrence to the HTML element where the created journal entry elements will be injected
let entryContainer = document.getElementById("entryContainer")

//function that adds created journal element to DOM
const writeToDom = (whatToPrint) => {
    entryContainer.innerHTML += whatToPrint
}

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
    //prints the newest journal entry to the DOM immediately- this avoids the need for a page refresh to view
    let newJournal = journalDOMComponent(entryToPost)
    writeToDom(newJournal)
})