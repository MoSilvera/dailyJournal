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