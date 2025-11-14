const nicepay = {
    functions: {
        //  나이스페이 페이지 초기화
        init: function () {
            document.getElementById('ReturnURL').value = window.location.origin + "/payments/nicepay/result/authentication"
        },

        //  나이스페이 결제
        nicepayPay: async function () {
            const data = await nicepay.functions._requestNicepayPaymentAuthInfo();
            if (data) {
                document.getElementById("MID").value = data.mid;
                document.getElementById("EdiDate").value = data.ediDate;
                document.getElementById("SignData").value = data.signData;
                const reqReservedObject = {
                    price: document.getElementById("Amt").value
                }
                document.getElementById("ReqReserved").value = this._createMerchantData(reqReservedObject);
            }
            goPay(document.nicepayForm);
        },

        //  nicepay 인증 정보 획득
        _requestNicepayPaymentAuthInfo: async function () {
            //  EdiDate + MID + Amt + MerchantKey
            const amt = document.getElementById('Amt').value;

            const queryParams = new URLSearchParams();
            queryParams.append("price", amt);

            const response = await fetch(`/payments/nicepay/signature?${queryParams.toString()}`);
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
        },
    }
}

//  나이스페이 쪽에서 직접 호출하는 스크립트
nicepaySubmit = async function () {
    await fetch('payments/nicepay/result/authentication', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            resultCode: document.getElementsByName('AuthResultCode')[0].value,
            resultMessage: document.getElementsByName('AuthResultMsg')[0].value,
            orderNo: document.getElementsByName('Moid')[0].value,
            authToken: document.getElementsByName('AuthToken')[0].value,
            signature: document.getElementsByName('Signature')[0].value,
            transactionId: document.getElementsByName('TxTid')[0].value,
            nextApprovalUrl: document.getElementsByName('NextAppURL')[0].value,
            networkCancelUrl: document.getElementsByName('NetCancelURL')[0].value,
            reqReserved: document.getElementsByName('ReqReserved')[0].value
        })
    });
}

//  나이스페이 쪽에서 직접 호출하는 스크립트
function nicepayClose(){
    alert("결제가 취소 되었습니다");
}