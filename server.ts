import fs from 'fs';
import express from 'express';

const app = express()
app.use(express.json()) 

app.post('/', (req, res) => {
  console.log(req.body.message, 'color: green')
  fs.appendFile('chat.json', req.body.message, err => {
    if (err) { console.error(err); }
  });
  res.sendStatus(200)
})

app.listen(process.env.PORT);
