/**
 * Performs one basic arithmetic operation.
 * Throws an Error with a user-readable message for invalid input.
 */
function calculate({ a, b, operator } = {}) {
  if (typeof a !== 'number' || !Number.isFinite(a)) {
    throw new Error('The first number must be a valid number.');
  }

  if (typeof b !== 'number' || !Number.isFinite(b)) {
    throw new Error('The second number must be a valid number.');
  }

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('You cannot divide by zero.');
      }
      return a / b;
    default:
      throw new Error('Please choose a supported operator (+, -, *, /).');
  }
}

module.exports = { calculate };
