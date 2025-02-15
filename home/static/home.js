const roles = ["SAS Student", "Game designer", "Programmer", "Web-developer", "Badminton player"];

document.addEventListener("DOMContentLoaded", async function () {
    const role = document.getElementById("dynamic-role");
    for (let c = 0; c < roles.length; c++) {
        // Append the text
        for (let l = 0; l < roles[c].length; l++) {
            role.innerHTML += roles[c][l];
            // role.style.opacity = (1 / roles[c].length * l);
            await sleep(75);
        }

        // Wait for a while
        await sleep(750);

        // Remove the text
        while (role.innerHTML.length > 0) {
            role.innerHTML = role.innerHTML.slice(0, role.innerHTML.length - 1);
            // role.style.opacity = (1 / roles[c].length * role.innerHTML.length);
            await sleep(40);
        }

        // Infinite loop
        if (c === roles.length - 1) {
            c = 0;
            await sleep(500);
        }
    }
});

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}