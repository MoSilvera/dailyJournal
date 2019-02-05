//Fetch retrieves existing journal entries and prints them to the DOM
fetch("http://localhost:8088/journalEntries")
    .then(response => response.json())
    .then(parsedJournalEntries => {
        parsedJournalEntries.forEach(entry => {
            const journalAsHTML = journalDOMComponent(entry);
            writeToDom(journalAsHTML)
        })

    })