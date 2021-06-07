const express = require('express');

const connectDB = require('./config/db')
const app = express();

// connect db
connectDB();
// define routes

//init Middleware
app.use(express.json({extended:false}));

app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))


app.get('/', (req, res) => res.json({msg: 'welcome to the contact'}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>(`SERVER STARTED ON PORT ${PORT}`));