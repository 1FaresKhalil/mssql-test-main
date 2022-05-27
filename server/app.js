const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');
app.use(cors());
app.use(express.json());

(async() => {
    try {
      await db.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

app.get('/ping', (req, res) => {
    
    res.send('Hello World!');
});
app.use(require("./routes"))


// global error handler
app.use((err, req, res, next) => {

    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});
const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});