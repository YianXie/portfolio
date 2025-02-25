let cards;
let scrollSpeed = 0;

document.addEventListener("DOMContentLoaded", function () {
    cards = document.querySelector(".cards");
    cards.dataset.isDragging = false;
    cards.dataset.startX = 0;
    cards.dataset.scrollLeft = 0;
    cards.dataset.velocity = 0;

    // Smooth scroll
    cards.addEventListener("wheel", (e) => {
        e.preventDefault();
        scrollSpeed += e.deltaX * 0.5;
        requestAnimationFrame(smoothScroll);
    });

    // Flip the card when clicked
    cards.querySelectorAll("div").forEach(div => {
        div.dataset.showing = false;
        div.addEventListener("click", () => {
            if (div.dataset.showing === "false") {
                div.classList.add("show");
                div.dataset.showing = true;
            } else {
                div.classList.remove("show");
                div.dataset.showing = false;
            }
        })
    });

    cards.addEventListener("mousedown", (e) => {
        cards.dataset.isDragging = true;
        cards.dataset.startX = e.pageX - cards.offsetLeft;
        cards.dataset.scrollLeft = cards.scrollLeft;
    });
    
    cards.addEventListener("mousemove", (e) => {
        if (cards.dataset.isDragging === "false") return;
        e.preventDefault();
        const x = e.pageX - cards.offsetLeft;
        const walk = x - cards.dataset.startX;
        cards.scrollLeft = cards.dataset.scrollLeft - walk;
    });
    
    cards.addEventListener("mouseup", () => {
        cards.dataset.isDragging = false;
    });
})

function smoothScroll() {
    if (Math.abs(scrollSpeed) < 1) return;

    cards.scrollLeft += scrollSpeed * 0.1;
    scrollSpeed *= 0.9;
    requestAnimationFrame(smoothScroll);
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}