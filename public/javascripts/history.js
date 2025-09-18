const history = {
    data: {
        paymentHistoryTable: null
    },
    functions: {
        //  결제 이력 테이블 초기화
        init: function () {
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
        },

        //  결제 취소 버튼 클릭 이벤트
        onClickCancelButton: async function (paymentNo) {
            if (!confirm("정말로 취소하시겠습니까?")) return;
            const response = await fetch(`/payments/${paymentNo}/cancel`, {method: 'POST'});
            const data = await response.json();
            if (response.ok) {
                alert("결제 취소가 완료되었습니다.");
                history.functions.init();
            } else {
                alert(data.message);
            }
        }
    }
}

