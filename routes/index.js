const express = require('express');
const path = require("path");
const api = require('../common/axios');
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

router.get('/record', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'record.html'));
});

router.get('/record/list', (req, res) => {
    await api.get('/record/list');
    debugger;
});

module.exports = router;
