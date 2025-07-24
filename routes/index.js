const express = require('express');
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/card-options', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'card-options.html'));
});

router.get('/easy-options', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'easy-options.html'));
});

module.exports = router;
