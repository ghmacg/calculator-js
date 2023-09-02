let firstNum = '';
let secondNum = '';
let currentOperator = null;

// Basic math functions
const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
// Evaluate whether or not the user is dividing by 0, in that case return ERROR message 
const divide = (x, y) => y == 0 ? 'ERROR: cannot divide by 0' : x / y;

// Function to run basic math function depending on operator inputted
function operate (operator, x, y) {
    firstNum = operator === '+' ? add(x, y) :
        operator === '-' ? substract(x, y):
            operator === 'x' ? multiply(x, y):
                operator === '÷' ? divide(x, y): '';
    
    // Use toFixed method to round numbers when larger than 8 decimal places
    // + sign drops any "extra" zeroes at the end, converting the string to number once again
    firstNum = +firstNum.toFixed(8);
    secondNum = '';
    currentOperator = null;
};

// Function to update display with value passed through parameter 
function updateDisplay (value) {
    const display = document.querySelector('#display');
    display.innerHTML = value;
};

// Function to define first and second number
function inputOperand () {
    const operandBtns = document.querySelectorAll('.operand');

    operandBtns.forEach((operand) => {
        operand.addEventListener('click', () => {
            if (currentOperator === null) {
                if ((firstNum === '') && (operand.id == 0)) {
                    return;
                };

                firstNum += operand.id;
                updateDisplay(firstNum);
            } else if (currentOperator !== null) {
                if ((secondNum === '') && (operand.id == 0)) {
                    updateDisplay(0);
                    return;
                };

                secondNum += operand.id;
                updateDisplay(secondNum);
            };
        });
    });
};

// Function to define current operator and operate when needed
function inputOperator () {
    const operatorBtns = document.querySelectorAll('.operator');

    operatorBtns.forEach((operator) => {
        operator.addEventListener('click', () => {
            if (currentOperator === null) {
                currentOperator = operator.id;
            } else if (currentOperator !== null) {
                if (secondNum === '') {
                    currentOperator = operator.id;
                    return;
                };

                operate(currentOperator, +firstNum, +secondNum);
                updateDisplay(firstNum);
                currentOperator = operator.id;
            }
        });
    });
};

// Function to operate when equals button is clicked
function inputEquals () {
    const equalBtn = document.querySelector('#equals');

    equalBtn.addEventListener('click', () => {
        if (secondNum === '') {
            return;
        };

        operate(currentOperator, +firstNum, +secondNum);
        updateDisplay(firstNum);
    });
};

// Function to wipe out any existing data when AC button is clicked 
function inputAllClear () {
    const clearBtn = document.querySelector('#clear');

    clearBtn.addEventListener('click', () => {
        firstNum = '';
        secondNum = '';
        currentOperator = null;
        updateDisplay(0);
    });
};

// Function to divide the number by 100 when percentage button is clicked
function inputPercentage () {
    const percentageBtn = document.querySelector('#percent');

    percentageBtn.addEventListener('click', () => {
        if (firstNum === '') {
            return;
        };

        firstNum = +firstNum / 100;
        updateDisplay(firstNum);
    });
};

// Function to change the sign of the current number when button is clicked
function inputSign () {
    const signsBtn = document.querySelector('#sign');

    signsBtn.addEventListener('click', () => {
        if (firstNum === '') {
            return;
        } else if (secondNum !== '') {
            secondNum = +secondNum * -1; 
            updateDisplay(secondNum);
            return;
        };

        firstNum = +firstNum * -1;
        updateDisplay(firstNum);
    });
};

// Function to add decimal point when button is clicked 
function inputDecimal () {
    let decimalNum;
    const decimalBtn = document.querySelector('#decimal');

    decimalBtn.addEventListener('click', () => {
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

        if (secondNum !== '') {
            secondNum += '.';
            updateDisplay(secondNum);
            return;
        };
        
        firstNum += '.';
        updateDisplay(firstNum);
    });
};


inputOperand();
inputOperator();
inputEquals();
inputAllClear();
inputPercentage();
inputSign();
inputDecimal();