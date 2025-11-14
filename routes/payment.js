const express = require('express');
const api = require('../common/axios');
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;

//  결제 내역 조회
router.get('/', async (req, res) => {
    const response = await api.get(`${API_BASE_URL}/api/payment/v1/payments`, req.query);
    const returnData = {
        "last_page": response.data.totalPages,
        "data": response.data.paymentList.map((payment, index) => ({
            index: index + 1,
            ...payment
        }))
    }
    res.json(returnData);
});

//  결제 로그 조회
router.get('/:paymentNo/paymentLogs', async (req, res) => {
    const {paymentNo} = req.params;
    const response = await api.get(`${API_BASE_URL}/api/payment/v1/payments/${paymentNo}/paymentLogs`);
    const returnData = {
        "last_page": response.data.totalPages,
        "data": response.data.paymentLogList.map((paymentLog, index) => ({
            index: index + 1,
            ...paymentLog
        }))
    }
    res.json(returnData);
});

//  결제 취소
router.post('/:paymentNo/cancel', async (req, res) => {
    const {paymentNo} = req.params;
    const body = { cancelReason: "WEB 결제 취소"}
    const response = await api.post(`${API_BASE_URL}/api/payment/v1/payments/${paymentNo}/cancel`, body);
    res.status(response.status).json(response.data);
});

module.exports = router;