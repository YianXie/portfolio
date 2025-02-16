document.addEventListener("DOMContentLoaded", async function () {
    // When the user scrolls down 50px from the top of the document, change the background color of the navbar
    document.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            document.querySelector("nav").classList.add("scroll");
        } else {
            document.querySelector("nav").classList.remove("scroll");
        }
    });

    // Close mobile burger menu when clicked outside
    document.addEventListener("click", function (e) {
        if (e.target.id !== "mobile-burger" && e.target.id !== "mobile-burger-menu") {
            document.querySelector("#mobile-burger").classList.remove("active");
        }
    });

    adjustContentSpacing();
    window.addEventListener("resize", adjustContentSpacing);
});

function toggleMobileBurger() {
    document.querySelector("#mobile-burger").classList.toggle("active");
}

function adjustContentSpacing() {
    const navBar = document.querySelector("nav");
    const content = document.querySelector("main");

    if (navBar && content) {
        content.style.marginTop = navBar.offsetHeight + "px";
    }
}