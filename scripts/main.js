let firstNum = '';
let secondNum = '';
let currentOperator = null;

// Basic math functions
const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => y == 0 ? 'ERROR: cannot divide by 0' : x / y;

// Function to run basic math function depending on operator inputted
function operate (operator, x, y) {
    firstNum = operator === '+' ? add(x, y) :
        operator === '-' ? substract(x, y):
            operator === 'x' ? multiply(x, y):
                operator === '÷' ? divide(x, y): '';
    
    // Use toFixed method to round numbers when larger than 8 decimal places
    // + sign drops any "extra" zeroes at the end
    firstNum = +firstNum.toFixed(8);
    secondNum = '';
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
                firstNum += operand.id;
                updateDisplay(firstNum);
            } else if (currentOperator !== null) {
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

                operate(currentOperator, Number(firstNum), Number(secondNum));
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

        operate(currentOperator, Number(firstNum), Number(secondNum));
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



inputOperand();
inputOperator();
inputEquals();
inputAllClear();