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
});

router.get('/:id', (req, res) => {
  const Entryid = req.params.id;
  const foundEntry = entryServices.get(Entryid);
  if (!foundEntry) {
    res.send({
      status: 'error',
      message: 'No entry with this id found',
    });
  } else {
    res.send({
      status: 'success',
      data: foundEntry,
    });
  }
});

export default router;
