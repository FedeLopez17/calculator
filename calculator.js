const BODY = document.querySelector("body");
const operands = ["add", "substract", "multiply", "divide", "modulo"];
const operandSymbols = ["+", "-", "%", "x", "÷"];
const VALUES = {00:["AC", "clear"], 01:["C", "delete"], 02:["%", "modulo"], 03:["÷", "divide"], 
                10:["7", "num"], 11:["8", "num"], 12:["9", "num"], 13:["+", "add"], 20:["4", "num"], 
                21:["5", "num"], 22:["6", "num"], 23:["-", "substract"], 30:["1", "num"], 31:["2", "num"], 
                32:["3", "num"], 33:["x", "multiply"], 40:["0", "num"], 41:[".", "point"], 42:["=", "equal"]};
const KEYBOARD_NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const KEYBOARD_OPERANDS = ["/","*", "X" ];

let allowPoint = true, initialZero = true, resultGiven = false;
let operandChosen, firstNumber, secondNumber, result, operationLength, isNumButton, isPointButton, isOperandButton, isEqualButton, rickrollActivated;

function hasDecimalDigits(number){
    return (number % 1) ? true : false;
}

function deleteLastInScreen(){
    screenText.innerText = screenText.innerText.slice(0, screenText.innerText.length - 1);
}

function clearScreen(){
    removeRickrolls();
    screenText.innerText = "";
    allowPoint = true;
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

function getTypeOfButton(button){
    isNumButton = false, isPointButton = false, isOperandButton = false, isEqualButton = false;
    if (typeof button === "object"){
        if (button.classList.contains("num")){
            isNumButton = true;
            return;
        }
        else if (button.classList.contains("operand")){
            isOperandButton = true;
            return;
        }
        else if (button.classList.contains("point")){
            isPointButton = true;
            return;
        }
        else{
            isEqualButton = true;
            return;
        }
    }
    // keyboard support
    if (KEYBOARD_NUMBERS.includes(button)){
        button = {"value": button};
        isNumButton = true;
        return button;
    }
    else if (operandSymbols.includes(button)){
        button = {"value": button};
        isOperandButton = true;
        return button;
    }
    else if (KEYBOARD_OPERANDS.includes(button)){
        button = (button === "X" || button === "*") ? "x" : "÷";
        button = {"value": button};
        isOperandButton = true;
        return button;
    }
    else if (button === "."){
        button = {"value": button};
        isPointButton = true;
        return button;
    }
    else if (button === "Enter" || button === "="){
        button = {"value": "="};
        isEqualButton = true;
        return button;
    }
    else{
        return "invalid key";
    }
}

function checkDivisionByZero(){
    let lastTwoInScreen = screenText.innerText.slice(screenText.innerText.length - 2, screenText.innerText.length);
    if (lastTwoInScreen === "÷0") return true; 
    let check = screenText.innerText.split("÷0");
    if (check[1]) {
        let checkLetters;
        for (let letter of check[1]){
            checkLetters = (letter === "0" || letter === ".") ? true : false;
            if(!checkLetters)return false;
        }
        return true;
    }
}

function addRickrolls(){
    rickrollActivated = true;
    BODY.classList.add("angry");
    screenText.classList.add("angry-text");
    const operandsAndEqual = document.querySelectorAll(".operand, .equal");
    for (let eachButton of operandsAndEqual){
        const rickRollButton = document.createElement("a");
        rickRollButton.innerHTML = eachButton.innerHTML;
        rickRollButton.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        rickRollButton.classList.add("rickroll");
        eachButton.appendChild(rickRollButton);
        eachButton.removeChild(eachButton.firstElementChild);
    }
}

function removeRickrolls(){
    rickrollActivated = false;
    let noStrangersToLove = (screenText.classList.contains("weAreNoStrangersToLove")) ? true : false;
    if (noStrangersToLove)return;
    if (!noStrangersToLove && BODY.classList.contains("angry")) {
        BODY.classList.remove("angry");
        screenText.classList.remove("angry-text");
    }
    const rickRollButtons = document.querySelectorAll(".rickroll");
    if (rickRollButtons[1]){
        for (let rickroll of rickRollButtons){
            let button = rickroll.parentNode;
            button.innerHTML = rickroll.innerHTML;
            rickroll.remove();
        }
    }
}

function deleteAndPrepareRickrolls(){
    if (screenText.innerText[screenText.innerText.length - 1] === ".") allowPoint = true;
        deleteLastInScreen();
        if (screenText.innerText===""){
            screenText.innerText = "0";
            initialZero = true;
        }
        let check = checkDivisionByZero();
        if (check) {
            if (!rickrollActivated) addRickrolls()
            return;
        }
        removeRickrolls();        
}

function operate(operator, num1, num2){
    switch(operator){
        case "+":
            return add(num1, num2);
        case "-":
            return substract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        case "%":
            return module(num1, num2);
    }
}

function writeToScreen(value){
    //operands input after a rickroll shouldn't be written on screen
    if (screenText.innerHTML === "We're no strangers to love, <br>you know the rules and so do I..." && operandSymbols.includes(value)) return;
    // Make sure that the point is only used once
    if (value !== "." || allowPoint) screenText.innerText += value;
    if (value === ".") allowPoint = false;
    if (value === "rickroll") screenText.innerHTML = "We're no strangers to love, <br>you know the rules and so do I...";
}    

function doCalculations(button){
    // if button is a string, due to being a keyboard input, get the type of button and convert said button to an object.
    if (typeof button === "string"){
        button = getTypeOfButton(button);
        if (button === "invalid key") return;    
    }
    else{
        getTypeOfButton(button);
    }

    if(isEqualButton || isOperandButton){
        if(rickrollActivated){
            screenText.classList.add("weAreNoStrangersToLove");
            window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }
    }

    // replace the initial zero on screen with the current button value as long as it's either a number, decimal point, or minus.
    if (initialZero){
        if (isOperandButton && button.value !== "-"){
            return;
        }
        if(!isEqualButton){
            clearScreen();
            initialZero = false;
        }
    }
    // After giving a result, if the user inputs a new number it should replace the previous result. 
    //If the user inputs, an operand, or a decimal point instead, it should let the user keep working with the previous result.
    if (resultGiven){
        if(isNumButton)clearScreen();
        resultGiven = false;
    }
    // if the last thing in screen is an operand, and the user tries to input another one, remove the former one.
    let lastInScreen =  screenText.innerText.slice(screenText.innerText.length - 1, screenText.innerText.length);
    if (isOperandButton && operandSymbols.includes(lastInScreen)){
        screenText.innerText = screenText.innerText.slice(0, screenText.innerText.length - 1);
    }
    // if the button isn't the equal button, print it to the screen.
    if(!isEqualButton){
        writeToScreen(button.value);
    }

    // If the the user is trying to divide by zero, all operand buttons, and the equal button, turn into links.
    let check = checkDivisionByZero();
    if (check){
        if (!rickrollActivated) addRickrolls();
    }
    else{
        removeRickrolls();
    }

    if (isOperandButton || isEqualButton){
        allowPoint = true;
        // split operation when there is an operand and store each of the numbers into an array.
        let operation = screenText.innerText.replaceAll("+", "@").replaceAll("-", "@").replaceAll("x", "@").replaceAll("÷", "@").replaceAll("%", "@");
        operation = operation.split("@");
        // if there is only one element within the array, store it for future calculations.
        if(!operation[1]){
            result = Number(operation[0]);
            if (isEqualButton){
                return;
            }
            operandChosen = button.value;
            operationLength = operation.length;
            return;
        }
        else{
            // Allow user to change operand.
            if (isOperandButton && (operationLength === operation.length)){
                operandChosen = button.value;
                return;
            }
            // There needs to be a different index number because when an operand is input, there is an extra empty element within the operation array (see lines 161 and 162).
            let lastNumber = (isOperandButton) ? Number(operation[operation.length - 2]) : Number(operation[operation.length - 1]);
            // disable equal button when the result was already shown.
            if (operandChosen === "="){return;}
            result = Number(operate(operandChosen, result, lastNumber));
            // Don't let user divide by 0.
            if (operandChosen === "÷" && lastNumber === 0){
                result = "rickroll";
                screenText.classList.add("weAreNoStrangersToLove");
            }
            resultGiven = true;
            clearScreen();
            writeToScreen(result);
            //update operandChosen and operationLength.
            operandChosen = button.value;
            operationLength = operation.length;
            // if button is an operand, keep working with the last result and add the operand after it.
            if (isOperandButton) {
                resultGiven = false;
                doCalculations(button.value);
            }
        }
    }
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

        if(button.classList.contains("num") || button.classList.contains("operand") || button.classList.contains("point") || button.classList.contains("equal")){ 
            button.addEventListener("click", ()=>{doCalculations(button)});
        }

        // clear button 
        if (button.classList.contains("clear")){
            button.addEventListener("click", ()=>{
                clearScreen();
                screenText.innerText = "0"
                initialZero = true;
            });
        }
        // delete button
        if (button.classList.contains("delete")){
            button.addEventListener("click", ()=>{deleteAndPrepareRickrolls()});
        }
        rowOfButtons.appendChild(button);
    } 
}
// Update calculator's screen
const calculatorScreen = document.querySelector(".screen");
const screenText = document.querySelector(".screenText");
screenText.innerText = "0";

// Keyboard support
window.addEventListener("keydown", function(e){
    if (e.key === "Escape"){
        clearScreen();
        screenText.innerText = "0"
        initialZero = true;
        if (rickrollActivated) rickrollActivated = false;
        return;
    }
    if (e.key === "Backspace"){
        deleteAndPrepareRickrolls();
        return;
    }
    doCalculations(e.key);
});