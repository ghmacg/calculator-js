let firstNum = '';
let secondNum = '';
let currentOperator = null;

const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => y == 0 ? 'ERROR: Cannot divide by 0' : x / y;

function operate (operator, x, y) {
    operator === '+' ? firstNum = add(x, y) :
        operator === '-' ? firstNum = substract(x, y):
            operator === 'x' ? firstNum = multiply(x, y):
                operator === '÷' ? firstNum = divide(x, y): operator;
    
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
