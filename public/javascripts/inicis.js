const inicis = {
    functions: {
        //  이니시스 페이지 초기화
        init: function(){
            document.getElementById('returnUrl').value = window.location.origin + "/payments/inicis/result/authentication"
            document.getElementById('closeUrl').value = window.location.origin + "/views/inicis/result/close"
        },
        //  이니시스 결제
        inicisPay: async function () {
            const data = await inicis.functions._requestInicisPaymentAuthInfo();
            if (data) {
                document.getElementById("signature").value = data.signature;
                document.getElementById("verification").value = data.verification;
                document.getElementById("mKey").value = data.mKey;
                document.getElementById("mid").value = data.mid;
                document.getElementById("timestamp").value = data.timestamp;
                const merchantDataObject = {
                    price: document.getElementById("price").value
                };
                document.getElementById("merchantData").value = this._createMerchantData(merchantDataObject);
                INIStdPay.pay('paymentForm');
                INIStdPay.close();
            }
        },
        //  inicis 인증 정보 획득
        _requestInicisPaymentAuthInfo: async function () {
            const oid = document.getElementById("oid").value;
            const price = document.getElementById("price").value;

            const queryParams = new URLSearchParams();
            queryParams.append("oid", oid);
            queryParams.append("price", price);

            const response = await fetch(`/payments/inicis/signature?${queryParams.toString()}`);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }

            return data;
        },
        //  결제 단순 전달 데이터 생성용 함수
        _createMerchantData: function (merchantDataObject) {
            const merchantDataJson = JSON.stringify(merchantDataObject);
            return btoa(String.fromCharCode(...new TextEncoder().encode(merchantDataJson)));
        }
    }
}
