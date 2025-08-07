import axios from "axios";

const inisys = {
    data: {
        //  테스트용 Sign Key (MID: INIpayTest)
        signKey: "SU5JTElURV9UUklQTEVERVNfS0VZU1RS"
    },
    functions: {
        //  이니시스 페이지 초기화
        init: function () {
            const timestamp = Date.now();
            document.getElementById("timestamp").value = timestamp;
            document.getElementById("oid").value = `DemoTest_${timestamp}`;
        },
        //  이니시스 결제
        inisysPay: async function () {
            const signature = await inisys.functions._createSignature();
            const verification = await inisys.functions._createVerification();
            const mKey = await inisys.functions._createMKey();
            document.getElementById("signature").value = signature;
            document.getElementById("verification").value = verification;
            document.getElementById("mKey").value = mKey;
            INIStdPay.pay('paymentForm');
        },
        //  verification 생성
        _createVerification: async function () {
            const oid = document.getElementById("oid").value;
            const price = document.getElementById("price").value;
            const timestamp = document.getElementById("timestamp").value;
            const plainText = `oid=${oid}&price=${price}&signKey=${inisys.data.signKey}&timestamp=${timestamp}`
            return await inisys.functions._sha256(plainText)
        },
        //  signature 생성
        _createSignature: async function () {
            const oid = document.getElementById("oid").value;
            const price = document.getElementById("price").value;
            const timestamp = document.getElementById("timestamp").value;
            const plainText = `oid=${oid}&price=${price}&timestamp=${timestamp}`;
            return await inisys.functions._sha256(plainText)
        },
        //  mKey 생성
        _createMKey: async function () {
            return await inisys.functions._sha256(inisys.data.signKey);
        },
        //  SHA-256 암호화
        _sha256: function (str) {
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
            });
        },
        //  inisys 인증 정보 획득
        _requestInisysPaymentAuthInfo: async function() {
            const result = await axios.get("http://localhost:8080/payment/v1/inisys/auth/info")
            console.log(result);
        }
    }
}

inisys.functions.init();