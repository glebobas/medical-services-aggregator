require('dotenv').config();
const express = require('express');
const app = express();

// Не забываем настраивать middleware

const PORT = process.env.PORT || 4002;

app.get("/", (req, res) => {
  res.send(`Hello world!`)
})

app.listen(PORT, () => {
  try {
    console.log(`Listening on port: ${PORT}`);
  } catch (error) {
    console.log('!!! ERROR ->>> Server not started', error);
  }
});
