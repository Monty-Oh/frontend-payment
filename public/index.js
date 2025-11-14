document.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-tabs")) {
        document.querySelectorAll(".nav-item").forEach(tab => tab.classList.remove("active"));
        e.target.classList.add("active");
    }
});