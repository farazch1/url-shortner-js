require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortenRouter = require('./routes/shorten');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/shorten', shortenRouter);

app.get('/:code', async (req, res, next) => {
  next();
});

// Connect to MongoDB & start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error('Mongo connection error:', err));
