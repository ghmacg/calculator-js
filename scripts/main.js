let firstNum = '';
let secondNum = '';
let currentOperator = null;
let valueSplit;
let decimalNum;

const display = document.querySelector('#display');
const operandBtns = document.querySelectorAll('.operand');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('#equals');
const clearBtn = document.querySelector('#clear');
const percentageBtn = document.querySelector('#percent');
const signsBtn = document.querySelector('#sign');
const decimalBtn = document.querySelector('#decimal');

// Basic math functions
const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
// Evaluate whether or not the user is dividing by 0, in that case return ERROR message 
const divide = (x, y) => y === 0 ? 'ERROR' : x / y;
// Function to split str, used when needed to check length of numbers
const splitString = (str) => str.toString().replace(/[.-]/g, '').split('');

// Function to run basic math function depending on operator inputted
function operate (operator, x, y) {
    firstNum = operator === '+' ? add(x, y) :
        operator === '-' ? substract(x, y):
            operator === 'x' ? multiply(x, y):
                operator === '÷' ? divide(x, y): '';
    // Use toFixed method to round numbers when larger than 8 decimal places
    // + sign drops any "extra" zeroes at the end, converting the string to number once again
    secondNum = '';
    currentOperator = null;
};

// Function to update display with value passed through parameter 
function updateDisplay (value) {
    let valueSplit = splitString(value);

    if (value === 'ERROR') {
        firstNum = '';
    } else if (valueSplit.length > 9) {
        value = Number(value).toExponential(0);
    } else {
        // Regular expresion to add commas as thousands separators
        value = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };
    
    display.innerHTML = value;
};

// Function to define first and second number
function inputOperand (operand) {
    valueSplit = currentOperator === null ? splitString(firstNum) :
        currentOperator !== null ? splitString(secondNum) : '';

    if (currentOperator === null) {
        let firstChar = firstNum.toString().charAt(0);
        let secondChar = firstNum.toString().charAt(1);

        if (((firstNum === '') || (firstNum === 0)) && (operand.id == 0)) {
            return;
        } else if (valueSplit.length >= 9) {
            return;
        } else if (secondChar == '.') {
            firstNum += operand.id;
            updateDisplay(firstNum);
            return;
        } else if ((firstChar == 0) && (operand.id != 0)) {
            firstNum = operand.id;
            firstChar = firstNum.toString().charAt(0);
            updateDisplay(firstNum);
            return;
        };

        firstNum += operand.id;
        updateDisplay(firstNum);
    } else if (currentOperator !== null) {
        if (((secondNum === '') || (secondNum === 0)) && (operand.id == 0)) {
            secondNum = 0;
            updateDisplay(secondNum);
            return;
        } else if (valueSplit.length >= 9) {
            return;
        };

        secondNum += operand.id;
        updateDisplay(secondNum);
    };
};

// Function to define current operator and operate when needed
function inputOperator (operator) {
    if (display.innerHTML === 'ERROR') {
        return;
    } else if (currentOperator === null) {
        currentOperator = operator.id;
    } else if (currentOperator !== null) {
        if (secondNum === '') {
            currentOperator = operator.id;
            return;
        };

        operate(currentOperator, +firstNum, +secondNum);
        updateDisplay(firstNum);
        currentOperator = operator.id;
    };
};

// Function to operate when equals button is clicked
function inputEquals () {
    if (secondNum === '') {
        return;
    };

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
    secondNum = firstNum !== '' && secondNum === '' && currentOperator !== null ? 0 : secondNum;
    firstNum = firstNum === '' ? 0 : firstNum;
    decimalNum = secondNum !== '' ? secondNum.toString().split('') : firstNum.toString().split('');
        
    // Use for loop to check if the number already have a decimal point
    // if thats the case then return
    for (let i = 0; i <= decimalNum.length; i++) {
        if (decimalNum[i] === '.') {
            return;
        };
    };

    if ((secondNum !== '') && (secondNum.length !== 9)) {
        secondNum += '.';
        updateDisplay(secondNum);
    } else if (firstNum.length !== 9) {
        firstNum += '.';
        updateDisplay(firstNum);
    };
};

function calculator () {
    operandBtns.forEach((operand) => {
        operand.addEventListener('click', () => {
            inputOperand(operand);
        });
    });

    operatorBtns.forEach((operator) => {
        operator.addEventListener('click', () => {
            inputOperator(operator);
        });
    });

    equalBtn.addEventListener('click', () => {
        inputEquals();
    });

    clearBtn.addEventListener('click', () => {
        inputAllClear();
    });

    percentageBtn.addEventListener('click', () => {
        inputPercentage();
    });

    signsBtn.addEventListener('click', () => {
        inputSign();
    });

    decimalBtn.addEventListener('click', () => {
        inputDecimal();
    });
};


// Function calling
calculator();