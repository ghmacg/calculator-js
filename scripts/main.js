const isNode = typeof module !== 'undefined' && module.exports;

let firstNum = '';
let secondNum = '';
let currentOperator = null;
let numSplitted;
let decimalNum;

const display = !isNode ? document.querySelector('#display') : null;
const operandBtns = !isNode ? document.querySelectorAll('.operand') : null;
const operatorBtns = !isNode ? document.querySelectorAll('.operator') : null;
const equalBtn = !isNode ? document.querySelector('#equals') : null;
const clearBtn = !isNode ? document.querySelector('#clear') : null;
const percentageBtn = !isNode ? document.querySelector('#percent') : null;
const signsBtn = !isNode ? document.querySelector('#sign') : null;
const decimalBtn = !isNode ? document.querySelector('#decimal') : null;

// Basic math functions
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
// Evaluate whether or not the user is dividing by 0, in that case return ERROR message 
const divide = (x, y) => y === 0 ? 'ERROR' : x / y;
// Function to split str, used when needed to check length of numbers
const splitString = (str) => str.toString().replace(/[.-]/g, '').split('');

// Function to run basic math function depending on operator inputted
function operate (operator, x, y) {
    firstNum = operator === '+' ? add(x, y) :
        operator === '-' ? subtract(x, y):
            operator === 'x' ? multiply(x, y):
                operator === '÷' ? divide(x, y): '';
    // Use toFixed method to round numbers when larger than 8 decimal spaces
    // + sign drops any "extra" zeroes at the end, converting the string to number once again
    if (firstNum === 'ERROR') {
        secondNum = '';
        currentOperator = null;
        return;
    };

    firstNum = +firstNum.toFixed(8);
    secondNum = '';
    currentOperator = null;
};

// Function to update display with value passed through parameter 
function updateDisplay (value) {
    numSplitted = splitString(value);

    if (value === 'ERROR') {
        firstNum = '';
    } else if (numSplitted.length > 9) {
        value = Number(value).toExponential(0);
    } else {
        // Regular expresion to add commas as thousands separators
        value = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };
    
    display.innerHTML = value;
};

// Function to define first and second number
function inputOperand (operand) {
    numSplitted = currentOperator === null ? splitString(firstNum) :
        currentOperator !== null ? splitString(secondNum) : '';
        
    containsExponential = numSplitted.includes('e');

    if (currentOperator === null) {
        let firstChar = firstNum.toString().charAt(0);
        let secondChar = firstNum.toString().charAt(1);

        if (((firstNum === '') || (firstNum === 0)) && (operand == 0)) {
            return;
        } else if ((numSplitted.length >= 9) || (containsExponential)) {
            return;
        } else if (secondChar == '.') {
            firstNum += operand;
            updateDisplay(firstNum);
            return;
        } else if ((firstChar == 0) && (operand != 0)) {
            firstNum = operand;
            firstChar = firstNum.toString().charAt(0);
            updateDisplay(firstNum);
            return;
        };

        firstNum += operand;
        updateDisplay(firstNum);
    } else if (currentOperator !== null) {
        if (((secondNum === '') || (secondNum === 0)) && (operand == 0)) {
            secondNum = 0;
            updateDisplay(secondNum);
            return;
        } else if ((numSplitted.length >= 9) || (containsExponential)) {
            return;
        };

        secondNum += operand;
        updateDisplay(secondNum);
    };
};

// Function to define current operator and operate when needed
function inputOperator (operator) {
    if (display.innerHTML === 'ERROR') {
        return;
    } else if (currentOperator === null) {
        currentOperator = operator;
    } else if (currentOperator !== null) {
        if (secondNum === '') {
            currentOperator = operator;
            return;
        };

        operate(currentOperator, +firstNum, +secondNum);
        updateDisplay(firstNum);
        currentOperator = operator;
    };
};

// Function to operate when equals button is clicked
function inputEquals () {
    if (secondNum === '') return;

    operate(currentOperator, +firstNum, +secondNum);
    updateDisplay(firstNum);
};

// Function to wipe out any existing data when AC button is clicked 
function inputAllClear () {
    firstNum = '';
    secondNum = '';
    currentOperator = null;
    updateDisplay(0);
};

// Function to divide the number by 100 when percentage button is clicked
function inputPercentage () {
    if (firstNum === '') {
        return;
    } else if (secondNum !== '') {
        secondNum = +secondNum / 100;
        updateDisplay(secondNum);
        return;
    };

    firstNum = +firstNum / 100;
    updateDisplay(firstNum);
};

// Function to change the sign of the current number when button is clicked
function inputSign () {
    if (firstNum === '') {
        return;
    } else if (secondNum !== '') {
        secondNum = +secondNum * -1; 
        updateDisplay(secondNum);
        return;
    };

    firstNum = +firstNum * -1;
    updateDisplay(firstNum);
};

// Function to add decimal point when button is clicked 
function inputDecimal () {
    let containsDecimal;
    let containsExponential;

    secondNum = firstNum !== '' && secondNum === '' && currentOperator !== null ? 0 : secondNum;
    firstNum = firstNum === '' ? 0 : firstNum;
    numSplitted = secondNum !== '' ? secondNum.toString().split('') : firstNum.toString().split('');
    containsDecimal = numSplitted.includes('.');
    containsExponential = numSplitted.includes('e');
        
    if (containsDecimal || containsExponential) return;

    if ((secondNum !== '') && (secondNum.length !== 9)) {
        secondNum += '.';
        updateDisplay(secondNum);
    } else if (firstNum.length !== 9) {
        firstNum += '.';
        updateDisplay(firstNum);
    };
};

function calculator () {
    // Keyboard support
    document.onkeydown = function(event) {
        var key_press = String.fromCharCode(event.keyCode);
        var key_code = event.keyCode;
    
        // Target each operand and input it when key pressed
        key_press == 1 ? inputOperand(key_press) :
            key_press == 2 ? inputOperand(key_press) :
                key_press == 3 || key_code == 32 ? inputOperand(key_press) :
                    key_press == 4 ? inputOperand(key_press) :
                        key_press == 5 ? inputOperand(key_press) :
                            key_press == 6 && event.shiftKey == false ? inputOperand(key_press) :
                                key_press == 7 ? inputOperand(key_press) :
                                    key_press == 8 && event.shiftKey == false ? inputOperand(key_press) :
                                        key_press == 9 ? inputOperand(key_press) :
                                            key_press == 0 ? inputOperand(key_press) : key_press;
        
        // Target each operator and input it when key pressed
        key_code == 187 && event.shiftKey || key_code == 107 ? inputOperator('+') :
            key_code == 189 || key_code == 109 ? inputOperator('-') :
                key_code == 56 && event.shiftKey || key_code == 106 || key_code == 88 ? inputOperator('x') :
                    key_code == 191 || key_code == 111 ? inputOperator('÷') : key_code;
        
        // Target each action and input it when key pressed 
        key_code == 187 ? inputEquals() : 
            key_code == 190 || key_code == 110 ? inputDecimal() :
                key_code == 53 && event.shiftKey ? inputPercentage() : 
                    key_code == 67 ? inputAllClear() : key_code;
    };

    // Handlers for displayed buttons
    // Operand buttons
    operandBtns.forEach((operand) => {
        let operandId = operand.id;

        operand.addEventListener('click', () => inputOperand(operandId));
    });

    // Operator buttons
    operatorBtns.forEach((operator) => {
        let operatorId = operator.id;

        operator.addEventListener('click', () => inputOperator(operatorId));
    });

    // Equals button
    equalBtn.addEventListener('click', inputEquals);

    // All Clear button
    clearBtn.addEventListener('click', inputAllClear);

    // Percentage button
    percentageBtn.addEventListener('click', inputPercentage);

    // Change number sign from positive to negative or viceversa button
    signsBtn.addEventListener('click', inputSign);

    // Decimal point button
    decimalBtn.addEventListener('click', inputDecimal);
};


// Function calling
if (!isNode) {
    calculator();
}

if (isNode) {
    module.exports = { add, subtract, multiply, divide };
}
