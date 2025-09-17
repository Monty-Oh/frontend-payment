document.addEventListener("click", function (e) {
    if (e.target.classList.contains("tab")) {
        document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        e.target.classList.add("active");
    }
});