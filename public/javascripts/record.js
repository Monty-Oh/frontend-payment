if (typeof record === "undefined") {
    const record = {
        functions: {
            //  결제 이력 테이블 초기화
            init: function () {
                const table = new Tabulator("#paymentHistoryTable", {
                    layout: "fitColumns",
                    pagination: "local",
                    paginationSize: 5,
                    columns: [
                        {title: "이름", field: "name"},
                        {title: "나이", field: "age"},
                        {title: "직업", field: "job"}
                    ],
                    data: [
                        {name: "철수", age: 25, job: "개발자"},
                        {name: "영희", age: 30, job: "디자이너"},
                        {name: "민수", age: 27, job: "기획자"},
                        {name: "지수", age: 22, job: "마케터"},
                        {name: "태현", age: 29, job: "PM"},
                        {name: "은지", age: 26, job: "QA"}
                    ]
                });
            }
        }
    }
    record.functions.init();
}