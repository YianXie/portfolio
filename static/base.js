document.addEventListener("DOMContentLoaded", async function () {
    document.addEventListener("scroll", function () {
        // When the user scrolls down 50px from the top of the document, change the background color of the navbar
        if (window.scrollY > 50) {
            document.querySelector("nav").classList.add("scroll");
        } else {
            document.querySelector("nav").classList.remove("scroll");
        }
    });
});