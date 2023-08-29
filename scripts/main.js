let firstNum = null;
let secondNum = null;
let firstOp = null;
let secondOp = null;
let displayValue = 0;

const add = (x, y) => x + y;
const substract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

function operate (operator, x, y) {
    operator == '+' ? add(x, y) :
        operator == '-' ? substract(x, y) :
            operator == 'x' ? multiply(x, y) :
                operator == '÷' ? divide(x, y) : operator;
};

function updateDisplay () {
    const display = document.querySelector('#display');
    display.innerText = displayValue;
};
