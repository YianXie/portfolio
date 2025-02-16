google.charts.load('current', {'packages':['corechart']});

document.addEventListener("DOMContentLoaded", function() {
    const repos = document.querySelectorAll('.repo');
    repos.forEach(repo => {
        const url = repo.getAttribute("language");
        fetch(url)
            .then(res => res.json())
            .then(data => {
                displayChart(data);
            })
    });
});

function displayChart(data) {
    console.log(data);
}