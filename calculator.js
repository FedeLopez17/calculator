const operands = ["add", "substract", "multiply", "divide", "modulo"];
const VALUES = {00:["AC", "clear"], 01:["C", "delete"], 02:["%", "modulo"], 03:["÷", "divide"], 
                10:["7", "num"], 11:["8", "num"], 12:["9", "num"], 13:["+", "add"], 20:["4", "num"], 
                21:["5", "num"], 22:["6", "num"], 23:["-", "substract"], 30:["1", "num"], 31:["2", "num"], 
                32:["3", "num"], 33:["x", "multiply"], 40:["0", "num"], 41:[".", "point"], 42:["=", "equal"]};

let allowPoint = true;

function hasDecimalDigits(number){
    return (number % 1) ? true : false;
}

function add(num1, num2){
    return num1 + num2;
}

function substract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    result = num1 * num2;
    return (hasDecimalDigits(result)) ? result.toFixed(3) : result;
}

function divide(num1, num2){
    result = num1 / num2;
    return (hasDecimalDigits(result)) ? result.toFixed(3) : result;
}

function module(num1, num2){
    result = num1 % num2;
    return (hasDecimalDigits(result)) ? result.toFixed(3) : result;
}

function operate(operator, num1, num2){
    switch(operator){
        case "add":
            return add(num1, num2);
        case "substract":
            return substract(num1, num2);
        case "multiply":
            return multiply(num1, num2);
        case "divide":
            return divide(num1, num2);
    }
}

function writeToScreen(value){
    // Make sure that the point is only used once
    if (value !== "." || allowPoint) screenText.innerText += value;
    if (value === ".") allowPoint = false;
}

// Create calculator's buttons
const buttonsContainer = document.querySelector(".buttons-container");
for (let rowsIterator = 0; rowsIterator < 5; rowsIterator++){
    const rowOfButtons = document.createElement("div");
    rowOfButtons.classList.add("row-of-buttons");
    buttonsContainer.appendChild(rowOfButtons);
    for (let buttonsIterator = 0; buttonsIterator < 4; buttonsIterator++){
        const button = document.createElement("div");
        const currentButton = Number(`${rowsIterator}${buttonsIterator}`);
        button.classList.add("button");
        button.classList.add(VALUES[currentButton][1]);
        for (let operand of operands){
            if (button.classList.contains(operand)){
                button.classList.add("operand");
            }
        }
        button.value = VALUES[currentButton][0];
        button.innerHTML = "<p>" + button.value + "</p>";
        button.setAttribute("id", `${rowsIterator}${buttonsIterator}`);
        if (rowsIterator === 4 && buttonsIterator === 2){
            button.classList.add("wider-button");
            buttonsIterator++;
        }

        if(button.classList.contains("num") || button.classList.contains("operand") || button.classList.contains("point")){
            button.addEventListener("click", ()=>{
                writeToScreen(button.value);
                if (button.classList.contains("operand")) allowPoint = true;
            });
        }
        else if (button.classList.contains("clear")){
            button.addEventListener("click", ()=>{
                screenText.innerText = "";
                allowPoint = true;
            });
        }
        else if (button.classList.contains("delete")){
            button.addEventListener("click", ()=>{
                if (screenText.innerText[screenText.innerText.length - 1] === ".") allowPoint = true;
                screenText.innerText = screenText.innerText.slice(0, screenText.innerText.length - 1);
            });
        }


        rowOfButtons.appendChild(button);
    } 
}
// Update calculator's screen
const calculatorScreen = document.querySelector(".screen");
const screenText = document.querySelector(".screenText");