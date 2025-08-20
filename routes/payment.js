const express = require('express');
const path = require("path");
const api = require('../common/axios');
const router = express.Router();

/**
 * 결제하기
 */
/*  POST 결제하기 */
router.get('/inisys/signature', async (req, res) => {
    const response = await api.get('http://localhost:3000/payment/v1/payments/inicis/signature', req.query);
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
router.post('/inisys/result/authentication', async (req, res) => {
    if (req.body && req.body.resultCode === "0000") {
        const requestBody = req.body;
        const requestBodySavePayment = {
            mid: requestBody.mid,
            orderNo: requestBody.orderNumber,
            authorizationToken: requestBody.authToken,
            idcName: requestBody.idc_name,
            authorizationUrl: requestBody.authUrl,
            netCancelUrl: requestBody.netCancelUrl
        }
        const response = await api.post('http://localhost:3000/payment/v1/payments/inicis', requestBodySavePayment);
        console.log(response);
    }

    console.log(req.body);
});

module.exports = router;