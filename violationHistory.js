class ViolationHistory {
    constructor() {
      this.history = [];
    }
  
    addViolation(violation) {
      this.history.push(violation);
    }
  
    undoViolation() {
      return this.history.pop();
    }
  
    getHistory() {
      return this.history;
    }
  }
  
  module.exports = ViolationHistory;
  