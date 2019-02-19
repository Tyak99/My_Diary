import express from 'express';
import EntryService from '../services/entryServices';

const router = express.Router();
const entryServices = new EntryService();

router.get('/', (req, res) => {
  const entries = entryServices.getAll();
  res.send({
    status: 'success',
    data: entries,
  });
  //   res.send('you are here');
});

export default router;
