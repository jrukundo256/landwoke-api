const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const quoteRoutes = require('./routes/quoteRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');

const app = express();

// M/W
app.use(express.json());
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'request_logs.txt'), { flags: 'a' })
}));

// Public routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/quotes', authenticateJWT, quoteRoutes);
app.use('/authors', authenticateJWT, authorRoutes);

const PORT = 3500;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;