import { addHistoryEntry, clearHistory, getHistory } from './history.js';

const form = document.querySelector('#calculator-form');
const firstNumberInput = document.querySelector('#first-number');
const secondNumberInput = document.querySelector('#second-number');
const operatorInput = document.querySelector('#operator');
const calculateButton = document.querySelector('#calculate-button');
const resultValue = document.querySelector('#result-value');
const statusMessage = document.querySelector('#status-message');
const historyList = document.querySelector('#history-list');
const clearHistoryButton = document.querySelector('#clear-history-button');

const operatorSymbols = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷'
};

function renderHistory() {
  const entries = getHistory();
  historyList.replaceChildren();

  if (entries.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-history';
    emptyItem.textContent = 'No calculations yet.';
    historyList.append(emptyItem);
    return;
  }

  for (const entry of entries) {
    const item = document.createElement('li');
    item.textContent = `${entry.a} ${operatorSymbols[entry.operator] ?? entry.operator} ${entry.b} = ${entry.result}`;
    historyList.append(item);
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusMessage.textContent = '';

  const a = Number(firstNumberInput.value);
  const b = Number(secondNumberInput.value);
  const operator = operatorInput.value;

  calculateButton.disabled = true;
  calculateButton.textContent = 'Calculating…';

  try {
    const response = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b, operator })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'The calculation could not be completed.');
    }

    resultValue.textContent = String(data.result);
    addHistoryEntry({ a, b, operator, result: data.result });
    renderHistory();
  } catch (error) {
    statusMessage.textContent = error.message || 'Could not connect to the server.';
  } finally {
    calculateButton.disabled = false;
    calculateButton.textContent = 'Calculate';
  }
});

clearHistoryButton.addEventListener('click', () => {
  clearHistory();
  renderHistory();
});

renderHistory();
