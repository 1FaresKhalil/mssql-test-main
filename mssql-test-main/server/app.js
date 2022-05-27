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

const port = 5000;
app.listen(port, ()=>{
    console.log(`Listening at port ${port}...`);
});