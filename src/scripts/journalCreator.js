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
