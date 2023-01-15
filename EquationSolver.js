import {Stack} from "./Stack.js";

export function EquationSolver(stmt) {
  this.result;
  this.error = false;
  try {
    this.result = this.evaluatePostfix(this.infixToPostfix(stmt));
  } catch (e) {
    this.error = true;
  }
}

/**
 * This function converts an infix notation to postfix notation
 * @param {string} infix - the infix notation to convert
 * @return {string} postfix - the postfix notation
 */
EquationSolver.prototype.infixToPostfix = function (infix) {
  // remove whitespaces from the infix notation
  infix = infix.replace(/\s/g, "");
  // define the precedence of operators
  const precedence = { "*": 3, "/": 3, "+": 2, "-": 2, "^": 4 };
  // create a stack to hold operators
  const stack = new Stack();
  // initialize the postfix notation as an empty string
  let postfix = "";
  let prev = "";
  // initialize a variable to keep track of the number of open parenthesis
  let openParenthesis = 0;
  // iterate through the infix notation
  for (let i = 0; i < infix.length; i++) {
    let char = infix[i];
    // if the character is a number, add it to the postfix notation
    if (!isNaN(char)) {
      postfix += char;
      if (!isNaN(prev)) postfix;
      prev = char;
      // if the character is an operator
    } else if (char in precedence) {
      // while the stack is not empty and the current operator has lower or equal precedence to the operator at the top of the stack
      while (!stack.isEmpty() && precedence[char] <= precedence[stack.peek()]) {
        // pop the operator at the top of the stack and add it to the postfix notation
        postfix += " " + stack.pop();
      }
      // add a space after the operator
      postfix += " ";
      // push the current operator onto the stack
      stack.push(char);
      prev = char;
      // if the character is an open parenthesis
    } else if (char === "(") {
      // increment the openParenthesis counter
      openParenthesis++;
      // push the parenthesis onto the stack
      stack.push(char);
      prev = char;
      // if the character is a close parenthesis
    } else if (char === ")") {
      // decrement the openParenthesis counter
      openParenthesis--;
      // if the openParenthesis counter is less than 0, throw an error
      if (openParenthesis < 0) {
        throw new Error(`Mismatched Parentheses in infix expression`);
      }
      // while the stack is not empty and the top of the stack is not an open parenthesis
      while (!stack.isEmpty() && stack.peek() !== "(") {
        // pop the operator at the top of the stack and add it to the postfix notation
        postfix += " " + stack.pop();
      }
      //pop the open parenthesis
      stack.pop();
      prev = char;
      // if the character is not a number, operator or parenthesis
    } else {
      // throw an error with the invalid character
      throw new Error(`Invalid character ${char} in infix expression`);
    }
  }
  // if the openParenthesis counter is not 0, throw an error
  if (openParenthesis !== 0) {
    throw new Error(`Mismatched Parentheses in infix expression`);
  }
  // while the stack is not empty
  while (!stack.isEmpty()) {
    // pop the operator at the top of the stack and add it to the postfix notation
    postfix += " " + stack.pop();
  }
  // return the postfix notation
  return postfix;
};

/**
 * This function evaluates the postfix notation and returns the result
 * @param {string} postfix - the postfix notation to evaluate
 * @return {number} result - the evaluated result
 */
EquationSolver.prototype.evaluatePostfix = function (postfix) {
  // split the postfix notation into an array of strings
  postfix = postfix.split(" ");
  // create a stack to hold operands
  const stack = new Stack();

  // iterate through the postfix array
  for (let i = 0; i < postfix.length; i++) {
    let char = postfix[i];
    // if the character is a number, push it onto the stack
    if (!isNaN(char)) {
      stack.push(char);
    } else {
      // if the character is an operator, pop the last two operands from the stack
      let operand1 = stack.pop();
      let operand2 = stack.pop();
      // parse the operands as floats
      operand1 = parseFloat(operand1);
      operand2 = parseFloat(operand2);
      // perform the operation based on the operator
      switch (char) {
        case "+":
          stack.push(operand2 + operand1);
          break;
        case "-":
          stack.push(operand2 - operand1);
          break;
        case "*":
          stack.push(operand2 * operand1);
          break;
        case "/":
          stack.push(operand2 / operand1);
          break;
        case "^":
          stack.push(Math.pow(operand2, operand1));
          break;
      }
    }
  }
  // return the result which is the last element of the stack
  return stack.pop();
};
