const history = {
    data: {
        paymentHistoryTable: null
    },
    functions: {
        //  결제 이력 테이블 초기화
        init: function () {
            history.data.paymentHistoryTable = new Tabulator("#paymentHistoryTable", {
                layout: "fitColumns",
                pagination:true,
                paginationMode:"remote",
                paginationSize: 50,
                ajaxURL: "/payments",
                columns: [
                    {title: "순번", field: "index"},
                    {title: "주문번호", field: "orderNo"},
                    {title: "금액", field: "amount"},
                    {title: "결제상태", field: "paymentStatus"},
                    {title: "승인일시", field: "approvalDateTime"},
                    {title: "PG타입", field: "paymentServiceProviderType"},
                    {
                        title: "결제취소",
                        formatter: function (cell) {
                            const rowData = cell.getRow().getData();
                            return `<button class="cancel-btn" onclick="history.functions.onClickCancelButton(${rowData})">취소</button>`;
                        },
                        hozAlign: "center",
                        // cellClick: function (e, cell) {
                        //     const rowData = cell.getRow().getData();
                        //     console.log("취소 요청 데이터:", rowData);
                        //
                        //     // // 예: AJAX 호출로 취소 처리
                        //     // fetch(`/payments/${rowData.orderNo}/cancel`, {
                        //     //     method: "POST"
                        //     // }).then(res => res.json())
                        //     //     .then(result => {
                        //     //         alert("취소 완료!");
                        //     //         history.data.paymentHistoryTable.replaceData(); // 새로고침
                        //     //     });
                        // }
                    }
                ],
            });
        },
        onClickCancelButton: function (rowData) {
            console.log("취소 요청 데이터:", rowData);
            debugger
        }
    }
}

