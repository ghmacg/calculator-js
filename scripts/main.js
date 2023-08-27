let firstNum;
let secondNum;
let operator;

const add = (num1, num2) => num1 + num2;
const substract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

function operate (operator, num1, num2) {
    operator == '+' ? add(num1, num2) :
        operator == '-' ? substract(num1, num2) :
            operator == 'x' ? multiply(num1, num2) :
                operator == '÷' ? divide(num1, num2) : operator;
}