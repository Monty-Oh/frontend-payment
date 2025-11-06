const history = {
    data: {
        paymentHistoryTable: null,
        paymentLogTable: null
    },
    functions: {
        //  결제 이력 테이블 초기화
        paymentHistoryTableInit: function () {
            history.data.paymentHistoryTable = new Tabulator("#paymentHistoryTable", {
                layout: "fitDataFill",
                pagination: true,
                paginationMode: "remote",
                paginationSize: 50,
                ajaxURL: "/payments",
                columns: [
                    {title: "순번", field: "index"},
                    {title: "결제번호", field: "paymentNo"},
                    {title: "주문번호", field: "orderNo"},
                    {title: "금액", field: "amount"},
                    {title: "취소금액", field: "cancelAmount"},
                    {title: "결제상태", field: "paymentStatus"},
                    {title: "승인일시", field: "approvalDateTime"},
                    {title: "PG타입", field: "paymentServiceProviderType"},
                    {title: "생성날짜", field: "createdAt"},
                    {
                        title: "결제취소",
                        formatter: function (cell) {
                            const rowData = cell.getRow().getData();
                            return `<button class="cancel-btn" onclick="history.functions.onClickCancelButton('${rowData.paymentNo}')">취소</button>`;
                        },
                        hozAlign: "center",
                    }
                ],
            });

            history.data.paymentHistoryTable.on("rowClick", function(e, row){
                const paymentNo = row.getData().paymentNo;
                history.functions.onClickPaymentLogButton(paymentNo);
            });
        },

        //  결제 취소 버튼 클릭 이벤트
        onClickCancelButton: async function (paymentNo) {
            if (!confirm("정말로 취소하시겠습니까?")) return;
            const response = await fetch(`/payments/${paymentNo}/cancel`, {method: 'POST'});
            const responseJson = await response.json();
            if (response.ok) {
                alert("결제 취소가 완료되었습니다.");
                history.functions.paymentHistoryTableInit();
                history.functions.paymentLogTableInit();
            } else {
                alert(responseJson.message);
            }
        },

        //  결제 로그 테이블 초기화
        paymentLogTableInit: function () {
            history.data.paymentLogTable = new Tabulator("#paymentLogTable", {
                layout: "fitDataFill",
                pagination: true,
                paginationMode: "local",
                paginationSize: 50,
                columns: [
                    {title: "순번", field: "index"},
                    {title: "생성일자", field: "createdAt"},
                    {title: "결제상태", field: "paymentStatus"},
                    {title: "메시지", field: "message"},
                ],
            });
        },

        //  결제 로그 확인 클릭 이벤트
        onClickPaymentLogButton: async function (paymentNo) {
            const response = await fetch(`/payments/${paymentNo}/paymentLogs`);
            const responseJson = await response.json();
            history.data.paymentLogTable.setData(responseJson.data);
        }
    }
}

