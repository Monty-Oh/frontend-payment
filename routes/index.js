const express = require('express');
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/nicepay', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'nicepay.html'));
});

router.get('/inisys', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'inisys.html'));
});

router.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'history.html'));
});

module.exports = router;
