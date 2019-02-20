import express from 'express';
import 'dotenv/config';
import entryRoutes from './routes/entryRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/entry', entryRoutes);

app.get('/', (req, res) => {
  res.send('welcome to my app');
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});

module.exports = app;