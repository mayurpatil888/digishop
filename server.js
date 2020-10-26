const express = require('express');

const app = express();

const connectDB = require('./config/db');

// Init middleware 
app.use(express.json());

connectDB();

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/products', require('./routes/api/products'));
app.use('/api/auth', require('./routes/api/auth'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log(`Server running at ${PORT}`) });
