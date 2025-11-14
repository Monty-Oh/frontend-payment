const express = require('express');
const api = require('../common/axios');
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;

//  이니시스 결제 정보 획득
router.get('/signature', async (req, res) => {
    const response = await api.get(API_BASE_URL + '/api/payment/v1/payments/inicis/signature', req.query);
    if (response.status !== 200) {
        res.status(response.status).json({message: response.data.message});
    }
    res.json(response.data);
});

//  이니시스 인증 결과 수신
router.post('/result/authentication', async (req, res) => {
    //  다음 URL
    let nextPath = "/views/inicis/success.html";

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
        const responseCreatePayment = await api.post(API_BASE_URL + '/api/payment/v1/payments/inicis', requestBodySavePayment);
        if (responseCreatePayment) {
            if (responseCreatePayment.status === 200 && responseCreatePayment.data && responseCreatePayment.data.paymentNo) {
                const responseApprovalPayment = await api.post(`${API_BASE_URL}/api/payment/v1/payments/${responseCreatePayment.data.paymentNo}/approval`);
                if (!responseApprovalPayment || responseApprovalPayment.status !== 200) {
                    nextPath = "/views/inicis/error.html";
                }
            } else {
                nextPath = "/views/inicis/error.html";
            }
        }
    } else {
        nextPath = "/views/inicis/error.html";
    }
    res.redirect(nextPath);
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