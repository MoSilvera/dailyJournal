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
