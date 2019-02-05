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
