const buttonsContainer = document.querySelector(".buttons-container");
// Create calculator's buttons
for (let rows = 0; rows < 5; rows++){
    const rowOfButtons = document.createElement("div");
    rowOfButtons.classList.add("row-of-buttons");
    buttonsContainer.appendChild(rowOfButtons);
    if (rows !== 4){
        for (let buttons = 0; buttons < 4; buttons++){
            const button = document.createElement("div");
            button.classList.add("button");
            button.setAttribute("id", `${rows}${buttons}`);
            rowOfButtons.appendChild(button);
        }
    }
    else{ 
        for(let buttons = 0; buttons < 3; buttons++){
            const button = document.createElement("div");
            button.classList.add("button");
            if (buttons === 2) button.classList.add("wider-button");
            button.setAttribute("id", `${rows}${buttons}`);
            rowOfButtons.appendChild(button);
        }
    }
}


