// Data access object placeholder
// Replace with real DB logic (e.g., SQLite, MongoDB)

const entries = [];

module.exports = {
  getAll: () => entries,
  add: (entry) => { entries.push(entry); return entry; },
};
