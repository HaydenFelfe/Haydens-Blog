const express = require('express');
const session = require('express-session');
const sequelize = require('./config/config'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3009;

const sessionConfig = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // Adjust as needed
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your API routes here
const apiRoutes = require('./Controllers/api/index'); // Adjust the path as needed
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
