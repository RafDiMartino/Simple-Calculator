let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleOperator(value)
    } else {
        handleNumber(value)
    }
    screen.innerText = buffer;
}

function handleOperator(operator){
    switch (operator) {
        case "C":
            buffer = "0";
            runningTotal = 0; 
            break;
        case "=":
            if (previousOperator === null) {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break
        case "←":
            if (buffer.length === 1) {
                buffer ="0";
            } else {
                buffer = buffer.substring(0, buffer.length -1)
            }
            break
        case "+":
        case "−":
        case "×":
        case "÷": 
            handleMath(operator);
            break;
    }
};

function handleMath(operator) {
    if (buffer === "0"){
        return
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = operator;

    buffer = "0";
};

function flushOperation(intBuffer){
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "−"){
        runningTotal -= intBuffer;
    } else if (previousOperator === "÷"){
        runningTotal /= intBuffer;
    } else {
        runningTotal *= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString; 
    }
};


// works also without a function

function init() {
    document.querySelector(".keys")
        .addEventListener("click", function(e){
            buttonClick(e.target.innerText);
        })

}

init();


