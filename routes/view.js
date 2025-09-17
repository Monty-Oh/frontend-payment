const express = require('express');

const router = express.Router();

//  나이스페이 탭
router.get('/nicepay', (req, res) => {
    res.redirect('/views/nicepay.html')
});

//  이니시스 탭
router.get('/inicis', (req, res) => {
    res.redirect('/views/inicis.html')
});

//  이니시스 결제 취소
router.get('/inicis/result/close', (req, res) => {
    res.redirect('/views/inicis/close.html')
});

//  결제내역 탭
router.get('/history', (req, res) => {
    res.redirect('/views/history.html')
});

module.exports = router;