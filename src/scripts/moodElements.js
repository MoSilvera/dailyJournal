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