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
    //  다음 URL
    let nextPath = path.join(__dirname, '..', 'public', 'views', 'inisys', 'success.html');

    if (req.body && req.body.resultCode === "0000") {
        const requestBody = req.body;
        const merchantData = _decodeMerchantData(requestBody.merchantData);
        const requestBodySavePayment = {
            mid: requestBody.mid,
            orderNo: requestBody.orderNumber,
            authToken: requestBody.authToken,
            idcCode: requestBody.idc_name,
            approvalUrl: requestBody.authUrl,
            networkCancelUrl: requestBody.netCancelUrl,
            price: merchantData.price
        }
        const responseCreatePayment = await api.post('http://localhost:3000/payment/v1/payments/inicis', requestBodySavePayment);
        if (responseCreatePayment) {
            if (responseCreatePayment.status === 200 && responseCreatePayment.data && responseCreatePayment.data.paymentNo) {
                const responseApprovalPayment = await api.post(`http://localhost:3000/payment/v1/payments/${responseCreatePayment.data.paymentNo}/approval`);
                if (!responseApprovalPayment || responseApprovalPayment.status !== 200) {
                    nextPath = path.join(__dirname, '..', 'public', 'views', 'inisys', 'error.html');
                }
            } else {
                nextPath = path.join(__dirname, '..', 'public', 'views', 'inisys', 'error.html');
            }
        }
    } else {
        nextPath = path.join(__dirname, '..', 'public', 'views', 'inisys', 'error.html');
    }
    res.sendFile(nextPath);
});

const _decodeMerchantData = function (encoded) {
    // Base64 → 문자열 (중간에 UTF-8 디코딩 필요)
    const decodedStr = new TextDecoder().decode(
        Uint8Array.from(atob(encoded), c => c.charCodeAt(0))
    );

    // 문자열 → 객체
    return JSON.parse(decodedStr);
}

module.exports = router;