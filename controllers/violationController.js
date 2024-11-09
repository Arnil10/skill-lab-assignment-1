const fs = require('fs');
const ViolationQueue = require('../violationQueue');
const ViolationHistory = require('../violationHistory');

const violationQueue = new ViolationQueue();
const history = new ViolationHistory();

// Generate the invoice based on the violation's severity and type
function generateInvoice(violation) {
  const invoice = {
    violationType: violation.type,
    description: violation.description,
    fineAmount: violation.severity * 50,  // Fine is based on severity
    date: new Date().toISOString(),
  };

  fs.appendFileSync('invoices.json', JSON.stringify(invoice, null, 2) + ',\n');
  return invoice;
}

// Add a violation to the queue and history, then generate the invoice
function addViolation(req, res) {
  const { type, severity, description } = req.body;
  const violation = { type, severity, description };
  
  violationQueue.addViolation(violation);  // Add to the priority queue
  history.addViolation(violation);  // Add to history stack
  
  const invoice = generateInvoice(violation);  // Generate invoice for the violation
  res.status(201).json({ message: 'Violation added', invoice });
}

// Process the next violation (highest priority)
function processViolation(req, res) {
    const violation = violationQueue.processNextViolation();  // Get the next violation to process

    // Check if a violation was processed
    if (violation) {
      res.json({ message: 'Processed violation', violation });
    } else {
      res.status(404).json({ message: 'No violations to process' });
    }
}

// Undo the last added violation from history
function undoViolation(req, res) {
  const violation = history.undoViolation();
  if (violation) {
    res.json({ message: 'Undid violation', violation });
  } else {
    res.status(404).json({ message: 'No violations to undo' });
  }
}

function getViolations(req, res) {
    try {
      // Access the internal array of violations directly
      const violations = [...violationQueue.queue.queue];  // Use the spread operator to copy the internal queue array
  
      if (violations.length === 0) {
        return res.status(404).json({ message: 'No violations in the queue' });
      }
  
      // Send violations as response in JSON format
      res.status(200).json({ violations });
    } catch (error) {
      console.error('Error fetching violations:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  



module.exports = {
  addViolation,
  processViolation,
  undoViolation,
  getViolations
};
