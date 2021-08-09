let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

const buttonClick = (value) => {
    if (isNaN(value)) {
        handleOperator(value)
    } else {
        handleNumber(value)
    }
    screen.innerText = buffer;
}

const handleOperator = (operator) => {
    switch (operator) {
        case "C":
            buffer = "0";
            runningTotal = 0; 
            break;
        case "=":
            if (previousOperator === null) {
                return
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break
        case "←":
            try {
                if (buffer.length === 1) {
                    buffer ="0";
                } else {
                    buffer = buffer.substring(0, buffer.length -1)
                }
            } catch (error) {
              console.log("Operation not allowed")  
            }

            break
        case ".":
            inputDecimal(operator)
            break;
        case "+":
        case "−":
        case "×":
        case "÷": 
            handleMath(operator);
            break;
    }
};

const handleMath = (operator) => {
    if (buffer === "0"){
        return
    }
    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = operator ;

    buffer = "0";
};

const inputDecimal = () => {
    if (previousOperator === "0") {
        buffer = "0.";
      return
    } else {
        buffer += "."
    }
  }

const flushOperation = (floatBuffer) => {
    if (previousOperator === "+") {
        runningTotal += floatBuffer;
    } else if (previousOperator === "−"){
        runningTotal -= floatBuffer;
    } else if (previousOperator === "÷"){
        runningTotal /= floatBuffer;
    } else {
        runningTotal *= floatBuffer;
    }
}

const handleNumber = (numberString) => {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString; 
    }
};


// works also without a function

const init = () => {
    document.querySelector(".keys")
        .addEventListener("click", function(e){
            buttonClick(e.target.innerText);
        })
}

init();