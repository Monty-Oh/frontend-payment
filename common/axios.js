const axios = require("axios");

/**
 * axios 요청 공통 처리
 */
const api = {
    get: async function (url, params) {
        try {
            const response = await axios.get(url, {
                params
            });
            return {status: 200, data: response.data};
        } catch (error) {
            return this._errorHandler(error);
        }
    },
    post: async function (url, body) {
        try {
            const response = await axios.post(url, {
                ...body
            });
            return {status: 200, data: response.data};
        } catch (error) {
            return this._errorHandler(error);
        }
    },
    _errorHandler: function (error) {
        //  에러의 응답이 존재할 경우
        if (error.response) {
            const message = error.response.headers.has("message") ? this._errorMessageDecoder(error.response.headers.get("message")) : "서버 오류 발생";
            return {status: error.response.status, data: {message: message}};
        }
        //  요청의 응답이 오지 않은 경우
        else if (error.request) {
            return {status: 504, message: "서버 응답 없음"};
        }
        //  요청 자체 에러
        else {
            return {status: 500, message: "요청 도중 에러 발생"};
        }
    },
    _errorMessageDecoder: function (encodedMessage) {
        return decodeURIComponent(encodedMessage.replace(/\+/g, " "));
    }
}

module.exports = api;