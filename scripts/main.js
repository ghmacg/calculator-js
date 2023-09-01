let firstNum = '';
let secondNum = '';
let currentOperator = null;

const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => y == 0 ? 'ERROR: Cannot divide by 0' : x / y;

function operate (operator, x, y) {
    firstNum = operator === '+' ? add(x, y) :
        operator === '-' ? substract(x, y):
            operator === 'x' ? multiply(x, y):
                operator === '÷' ? divide(x, y): operator;
    
    secondNum = '';
};

function updateDisplay (value) {
    const display = document.querySelector('#display');
    display.innerHTML = value;
};

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