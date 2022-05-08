const buttonsContainer = document.querySelector(".buttons-container");
// Create calculator's buttons
for (let rowsIterator = 0; rowsIterator < 5; rowsIterator++){
    const rowOfButtons = document.createElement("div");
    rowOfButtons.classList.add("row-of-buttons");
    buttonsContainer.appendChild(rowOfButtons);
    const VALUES = {00:"AC", 01:"C", 02:"%", 03:"÷", 10:"7", 11:"8", 12:"9", 13:"+", 20:"4", 21:"5", 22:"6", 23:"-", 30:"1", 31:"2", 32:"3", 33:"x", 40:"0", 41:".", 42:"="};
    for (let buttonsIterator = 0; buttonsIterator < 4; buttonsIterator++){
        const button = document.createElement("div");
        button.classList.add("button");
        button.innerHTML = "<p>" + VALUES[Number(`${rowsIterator}${buttonsIterator}`)] + "</p>";
        button.setAttribute("id", `${rowsIterator}${buttonsIterator}`);
        if (rowsIterator === 4 && buttonsIterator === 2){
            button.classList.add("wider-button");
            buttonsIterator++;
        }
        rowOfButtons.appendChild(button);
    } 
}


