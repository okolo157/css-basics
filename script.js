const Calculator = (() => {
  // Private Elements
  const elements = {
    display: document.querySelector(".display"),
    buttonContainer: document.querySelector(".btn-container"),
  };

  // Configuration
  const COLOR_SCHEMES = [
    { background: "#f0f0f0", buttons: "#4CAF50", textColor: "black" },
    { background: "#333", buttons: "#FF5722", textColor: "white" },
    { background: "#fff", buttons: "#2196F3", textColor: "black" },
  ];

  // State Management
  const state = {
    currentInput: "0",
    previousInput: null,
    operator: null,
    isResult: false,
    colorIndex: 0,
  };

  // Display Update
  function updateDisplay(value = state.currentInput) {
    elements.display.textContent = value;
  }

  // Calculation Utility
  function calculate(num1, num2, operator) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    const operations = {
      "+": () => a + b,
      "-": () => a - b,
      "*": () => a * b,
      "/": () => {
        if (b === 0) throw new Error("Division by zero");
        return a / b;
      },
    };

    try {
      const result = operations[operator]();
      return Number.isFinite(result) ? result.toFixed(2) : "Error";
    } catch (error) {
      handleError(error.message);
      return "Error";
    }
  }

  // Error Handling
  function handleError(message) {
    console.error(`Calculator Error: ${message}`);
    alert(message);
  }

  // Number Input Handler
  function handleNumberInput(buttonText) {
    state.currentInput = state.isResult
      ? buttonText
      : state.currentInput === "0"
      ? buttonText
      : state.currentInput + buttonText;

    state.isResult = false;
    updateDisplay();
  }

  // Operator Input Handler
  function handleOperatorInput(buttonText) {
    if (state.previousInput === null) {
      state.previousInput = state.currentInput;
    } else if (state.operator) {
      try {
        state.currentInput = String(
          calculate(state.previousInput, state.currentInput, state.operator)
        );
        updateDisplay();
        state.previousInput = state.currentInput;
      } catch (error) {
        handleError(error.message);
      }
    }

    state.operator = buttonText;
    state.isResult = false;
  }

  // Equals Handler
  function handleEquals() {
    if (state.operator && state.previousInput !== null && !state.isResult) {
      try {
        state.currentInput = String(
          calculate(state.previousInput, state.currentInput, state.operator)
        );
        updateDisplay();
        state.previousInput = null;
        state.operator = null;
        state.isResult = true;
      } catch (error) {
        handleError(error.message);
      }
    }
  }

  // Theme Management
  function applyColorScheme() {
    const scheme = COLOR_SCHEMES[state.colorIndex];

    elements.buttonContainer.style.backgroundColor = scheme.background;

    const buttons = elements.buttonContainer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.backgroundColor = scheme.buttons;
      button.style.color = scheme.textColor;
    });
  }

  // Event Handler
  function initializeEventHandlers() {
    elements.buttonContainer.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") return;

      const buttonText = event.target.textContent;

      const handlers = {
        number: () => !isNaN(buttonText) && handleNumberInput(buttonText),
        operator: () =>
          ["+", "-", "*", "/"].includes(buttonText) &&
          handleOperatorInput(buttonText),
        equals: () => buttonText === "=" && handleEquals(),
        clear: () => buttonText === "C" && (state.currentInput = "0"),
        "clear-all": () => buttonText === "CA" && resetCalculator(),
        color: () => buttonText === "COLOR" && cycleColorScheme(),
      };

      // Explicitly check and execute handlers
      Object.entries(handlers).forEach(([type, handler]) => {
        handler();
      });

      updateDisplay();
    });
  }

  // Reset Calculator
  function resetCalculator() {
    state.currentInput = "0";
    state.previousInput = null;
    state.operator = null;
    updateDisplay();
  }

  // Cycle Color Scheme
  function cycleColorScheme() {
    state.colorIndex = (state.colorIndex + 1) % COLOR_SCHEMES.length;
    applyColorScheme();
  }

  // Public Interface
  return {
    init() {
      initializeEventHandlers();
      applyColorScheme();
    },
  };
})();

// Initialize the calculator when DOM is loaded
document.addEventListener("DOMContentLoaded", Calculator.init);
