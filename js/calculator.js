// basic arithmetic functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Thanos snap!";
    }
    return a / b;
}

// generic operate function

function operate(fn, a, b) {
    return fn(a, b);
}

// Global variables

const controls = document.querySelector("#controls");
const numBtns = controls.querySelectorAll(".numeral");
const opBtns = controls.querySelectorAll(".operation");
const evalBtn = controls.querySelector("#equals")
const clearBtn = controls.querySelector("#clear");
const displayPanel = document.querySelector("#digit-display");
const operationPanel = document.querySelector("#operation-display");

let prevNumberVal = null;
let curNumberVal = null;
let curNumber = [];
let curOperation = null;
let curSym = "";
let display = "";
let enteringNext = false;
// Maps
const operationMap = {
    add: [add, "+"],
    subtract: [subtract, "-"],
    multiply: [multiply, "*"],
    divide: [divide, "/"],
}


// Setting up

numBtns.forEach(btn => btn.addEventListener("click", numBtnListener));
opBtns.forEach(btn => btn.addEventListener("click", opBtnListener));
evalBtn.addEventListener("click", evalBtnListener);

let timeoutAttribute = document.createAttribute("data-timeout");
clearBtn.setAttributeNode(timeoutAttribute);
clearBtn.addEventListener("click", clearBtnListener);
clearBtn.addEventListener("mousedown", clearBtnDownListener);
clearBtn.addEventListener("mouseup", clearBtnUpListener);
/*
 * e: Event
 */
function numBtnListener(e) {
    if (enteringNext) {
        enteringNext = false;
        prevNumberVal = curNumberVal;
        curNumberVal = null;
        curNumber = [];
    }
    const digit = this.id;
    curNumber.push(digit);
    updateDisplay();
}

function opBtnListener(e) {
    if (curNumber.length !== 0) {
        curNumberVal = parseInt(curNumber.join(""));
        enteringNext = true;
    }
    evaluate();
    [curOperation, curSym] = operationMap[this.id];
    updateDisplay();
}

function evalBtnListener(e) {
    if (curNumber.length !== 0) {
        curNumberVal = parseInt(curNumber.join(""));
        enteringNext = true;
    }
    evaluate();
    [curOperation, curSym] = [null, null];
    updateDisplay();
}

function clearBtnListener(e) {
    curNumber.pop();
    updateDisplay();
}

function clearBtnDownListener(e) {
    let timeoutFunction = setTimeout(()=>{
        curNumber = [];
        curNumberVal = null;
        updateDisplay();
    }, 2000);
    this.setAttribute("data-timeout", timeoutFunction);
}

function clearBtnUpListener(e) {
    let timeout = this.getAttribute("data-timeout");
    clearTimeout(timeout);
}

function updateDisplay() {
    // console.log(prevNumberVal, curNumberVal, curNumber)
    display = curNumberVal === null ? curNumber.join("") : curNumberVal;
    displayPanel.textContent = display;
    operationPanel.textContent = curSym;
}

function evaluate() {
    // We need 2 operands to perform a binary operation
    if (prevNumberVal === null || curOperation === null) {
        return;
    }

    let leftOperand = prevNumberVal;
    let rightOperand = curNumberVal;
    let result = curOperation(leftOperand, rightOperand);
    if (result === "Thanos snap") {
        curNumberVal = null;
        curNumber = result;
    } else {
        curNumberVal = result;
        curNumber = curNumberVal.toString().split("");
    }
}


 /* Advanced Listeners
function numBtnListener(e) {
    if (curOperation !== null) {
        curEval.push(curOperation);
        curOperation = null;
    }
    const digit = this.id;
    curNumber.push(digit);

}

function opBtnListener(e) {
    if (curNumber.length > 0) {
        curEval.push(curNumber.join(""));
    }
    curOperation = operationMap[this.id];
}
*/
