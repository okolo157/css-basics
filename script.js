const display = document.querySelector(".display-text");
const numberButtons = document.querySelectorAll(".number-btn");
const operatorButtons = document.querySelectorAll(".operator-btn");
const equalsButton = document.querySelector(".equals-btn");
const clearButton = document.querySelector(".clear-btn");
const clearAllButton = document.querySelector(".clear-all-btn");
const bgimage = document.getElementById("bgimage");
const colors = ["black", "white"];

// let currentInput = "";
// let previousInput = "";
let expression = "";
let index = 0;

// Handle number button clicks
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    expression += button.textContent;
    display.textContent = expression;
  });
});

// Handle operator button clicks
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lastChar = expression[expression.length - 1]; // Get the last character of the expression
    if (
      expression &&
      lastChar !== "+" &&
      lastChar !== "-" &&
      lastChar !== "*" &&
      lastChar !== "/"
    ) {
      expression += " " + button.textContent + " ";
      display.textContent = expression;
    }
  });
});

// Handle equals button click
equalsButton.addEventListener("click", () => {
  // Clean the expression to remove spaces
  const cleanedExpression = expression.replace(/\s/g, ""); // Remove all spaces

  // Check if the expression is non-empty and valid
  if (cleanedExpression) {
    // Evaluate the expression using eval
    const result = eval(cleanedExpression);

    // Display the result
    display.textContent = result;
    expression = result.toString(); // Store the result for further calculations
  } else {
    // If the expression is empty or invalid, reset and show error
    display.textContent = "Error";
    expression = ""; // Reset expression
  }
});

// Handle clear button click (clear last entry)
clearButton.addEventListener("click", () => {
  expression = expression.slice(0, -1).trim();
  display.textContent = expression || "0";
});

// Handle clear-all button click (reset calculator)
clearAllButton.addEventListener("click", () => {
  expression = "";
  display.textContent = "0";
});
