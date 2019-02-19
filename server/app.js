import express from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req, res) => {
  res.send('welcome to my app');
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});
