const axios = require("axios");

/**
 * axios 요청 공통 처리
 */
const api = {
    get: async function (uri, params) {
        try {
            const response = await axios.get(uri, {
                params
            });
            return {status: 200, data: response.data};
        } catch (error) {
            console.error(error);
            //  에러의 응답이 존재할 경우
            if (error.response) {
                const message = error.response.message ? error.response.message : "서버 오류 발생";
                if (!error.response.message)
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
        }
    }
}

module.exports = api;