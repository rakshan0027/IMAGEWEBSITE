// JavaScript for Dropdown Menu (optional, for mobile support)
document.addEventListener("DOMContentLoaded", function() {
    let dropdown = document.querySelector(".dropdown");
    dropdown.addEventListener("click", function() {
        let menu = this.querySelector(".dropdown-menu");
        menu.classList.toggle("show");
    });
});

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.dropdown a')) {
        let dropdowns = document.querySelectorAll(".dropdown-menu");
        dropdowns.forEach(menu => menu.classList.remove("show"));
    }
};
