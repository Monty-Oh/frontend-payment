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
    console.log(req.body.merchantData);
    if (req.body && req.body.resultCode === "0000") {
        const requestBody = req.body;
        const merchantDataObject = _parsingMerchantData(requestBody.merchantData);
        const requestBodySavePayment = {
            mid: requestBody.mid,
            orderNo: requestBody.orderNumber,
            authorizationToken: requestBody.authToken,
            idcName: requestBody.idc_name,
            authorizationUrl: requestBody.authUrl,
            netCancelUrl: requestBody.netCancelUrl,
            price: merchantDataObject.price
        }
        const response = await api.post('http://localhost:3000/payment/v1/payments/inicis', requestBodySavePayment);
        console.log(response);
    }

    console.log(req.body);
});

//  전달 받은 추가 정보 파싱
const _parsingMerchantData =  function (merchantDataString) {
    const merchantDataJson = new TextDecoder().decode(
        Uint8Array.from(atob(merchantDataString), c => c.charCodeAt(0))
    );
    return JSON.parse(merchantDataJson);
}

module.exports = router;