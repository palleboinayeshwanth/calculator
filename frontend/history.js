const STORAGE_KEY = 'team-calculator-history';
const MAX_HISTORY_ITEMS = 10;

export function getHistory() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // The calculator should still work when browser storage is unavailable.
    return [];
  }
}

export function addHistoryEntry(entry) {
  const history = getHistory();
  history.unshift({ ...entry, id: `${Date.now()}-${Math.random()}` });

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS))
    );
  } catch {
    // Ignore storage errors; displaying the current result still works.
  }

  return getHistory();
}

export function clearHistory() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
