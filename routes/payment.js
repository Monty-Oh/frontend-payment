const express = require('express');
const path = require("path");
const api = require('../common/axios');
const router = express.Router();

/**
 * 결제하기
 */
/*  POST 결제하기 */
router.get('/inisys/signature', async (req, res) => {
    const response = await api.get('http://localhost:3000/payment/v1/inisys/signature', req.query);
    if (response.status !== 200) {
        res.status(response.status).json({message: response.data.message});
    }
    res.json(response.data);
});

//  이니시스 결제 취소
router.get('/inisys/result/close', (req, res) => {
   res.sendFile(path.join(__dirname, '..', 'public', 'views', 'inisys', 'close.html'));
});

//  이니시스 인증 결과 수신
router.post('/inisys/result/auth', (req, res) => {
    console.log(req);
})

module.exports = router;