const express = require('express');
const monsters = require('../repositories');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  // Do a hello world
  res.send('Welcome to RestPG! \nTry checking /monsters, /monsters/:id and monsters/battle/:id');
});

router.get('/monsters', (req, res, next) => {
  res.json(monsters.getAllMonsterInfo());
});

router.get('/monsters/:id', (req, res, next) => {
  const id = req.params['id'];
  res.json(monsters.getMonsterInfo(id));
});


router.post('/monsters/:id/battle', (req, res, next) => {
  const id = req.params['id'];
  res.json(monsters.killAndLootMonster(id));
});

router.put('/monsters/:id/murder', (req, res, next) => {
  const id = req.params['id'];
  res.json(monsters.justKillMonster(id));
});

router.delete('/monsters/:id/absolutelydestroy/', (req, res, next) => {
  const id = req.params['id'];
  res.json(monsters.killMonsterSoKilledThatItsDeletedFromTheDatabase(id));
});


module.exports = router;