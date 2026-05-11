const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/', productRoutes);


// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'Backend Running'
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Prachi CloudKart Backend Running');
});