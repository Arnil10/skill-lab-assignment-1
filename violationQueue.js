// violationQueue.js

const fastpriorityqueue = require('fastpriorityqueue');

class ViolationQueue {
  constructor() {
    // Initialize the priority queue, where lower severity means higher priority
    this.queue = new fastpriorityqueue((a, b) => b.severity - a.severity);
  }

  // Add a violation to the queue
  addViolation(violation) {
    this.queue.add(violation);
  }

  // Process the next violation (highest priority)
  processNextViolation() {
    return this.queue.poll();
  }

  // Get all violations in the queue (convert the priority queue to an array)
  getAllViolations() {
    return [...this.queue.queue]; // Return an array of violations
  }

  // Optionally, you can implement this method to clear the queue or reset it
  clearQueue() {
    this.queue.clear();
  }
}

module.exports = ViolationQueue;
