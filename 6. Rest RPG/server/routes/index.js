const express = require('express');
const Monster = require('../models/monster');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  // Do a hello world
  res.send('Welcome to RestPG! \nTry checking /monsters, /monsters/:id and monsters/battle/:id');
});

router.get('/monsters', (req, res, next) => {
  res.json(Monster.allInfo());
});

router.get('/monsters/:id', (req, res, next) => {
  const id = req.params['id'];
  const monster = Monster.get(id)
  if (!monster) return
  res.json(monster.info());
});


router.post('/monsters/:id/battle', (req, res, next) => {
  const id = req.params['id'];
  const monster = Monster.get(id)
  if (!monster) return
  res.json(monster.battle());
});

router.put('/monsters/:id/murder/:amount', (req, res, next) => {
  const id = req.params['id'];
  const amount = req.params['amount']
  const monster = Monster.get(id)
  if (!monster) return
  res.json(monster.murder(amount))
});

router.delete('/monsters/:id/destroy/', (req, res, next) => {
  const id = req.params['id'];
  const monster = Monster.get(id)
  if (!monster) return
  res.json(monster.destroy());
});


module.exports = router;