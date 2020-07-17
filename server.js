const express =  require('express');
const connectDB = require('./config/db');
const path = require('path');

// api require routes
const users = require('./routes/users')
const auth = require('./routes/auth')
const books = require('./routes/books')

const app = express();

// connet db
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json ({ msg: 'Hello ReadingCom'}));

// backk end api difiinitions
app.use('/api/users', users );
app.use('/api/auth', auth );
app.use('/api/books', books );

// Serve static assets in production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}
  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));