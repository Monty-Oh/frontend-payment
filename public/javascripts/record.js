if (typeof paymentHistory === "undefined") {
    const record = {
        functions: {
            //  결제 이력 테이블 초기화
            init: function () {
                const table = new Tabulator("#paymentHistoryTable", {
                    layout: "fitColumns",
                    ajaxURL: "/record/list", // 외부 API
                    ajaxConfig: "GET",  // 요청 방식
                    ajaxResponse:function(url, params, response){
                        // 서버 응답이 {data:[], last_page:10} 같은 구조라면 매핑 필요
                        debugger;
                        return response.data;
                    },
                    columns: [
                        {title: "순번", field: "index"},
                        {title: "주문번호", field: "orderNo"},
                        {title: "금액", field: "amount"},
                        {title: "결제상태", field: "paymentStatus"},
                        {title: "승인일시", field: "approvalDateTime"},
                        {title: "PG타입", field: "paymentServiceProviderType"},
                    ],
                });
            },
        }
    }
    record.functions.init();
}

