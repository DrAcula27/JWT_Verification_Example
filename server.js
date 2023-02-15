const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

//Initialize our app variable with Express
const app = express();

//Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

//Single endpoint just to test API. Send data to browser
// app.get('/', (req, res) => res.send('API Running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Enviromental Variables
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
