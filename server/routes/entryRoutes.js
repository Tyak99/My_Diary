import express from 'express';
import EntryService from '../services/entryServices';

const router = express.Router();
const entryServices = new EntryService();

router.get('/', (req, res) => {
  const entries = entryServices.getAll();
  res.send({
    status: 200,
    data: entries,
  });
});

router.get('/:id', (req, res) => {
  const Entryid = req.params.id;
  const foundEntry = entryServices.get(Entryid);
  if (!foundEntry) {
    return res.send({
      status: 400,
      data: {
        message: 'Sorry, no entry with that id found',
      },
    });
  }
  return res.send({
    status: 200,
    data: foundEntry,
  });
});

router.post('/', (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.send({
      status: 400,
      data: {
        message: 'Sorry, all fields must be present',
      },
    });
  }
  const data = {
    title,
    body,
    createdAt: Date(),
    updatedAt: Date(),
  };
  const newData = entryServices.setEntry(data);
  return res.send({
    status: 201,
    data: newData,
  });
});

router.put('/:id', (req, res) => {
  const entry = entryServices.get(req.params.id);
  if (!entry) {
    return res.send({
      status: 400,
      data: {
        message: 'Sorry, no entry with that id found',
      },
    });
  }
  const editedEntry = entryServices.editEntry(req.params.id, req.body);
  return res.send({
    status: 200,
    data: editedEntry,
  });
});

router.delete('/:id', (req, res) => {
  const entry = entryServices.get(req.params.id);
  if (!entry) {
    return res.send({
      status: 400,
      data: {
        message: 'Sorry, no entry with that id found',
      },
    });
  }
  entryServices.deleteEntry(req.params.id);
  return res.send({
    status: 200,
    data: {
      message: 'Entry deleted successfully',
    },
  });
});

export default router;
