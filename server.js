


const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());
const path = require('path');

// Import routes
const violationRoutes = require('./routes/violationRoutes');

app.use(express.static(path.join(__dirname, 'public')));
// Middleware to parse JSON bodies
app.use(express.json());

// Use violation routes
app.use('/api/violations', violationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
