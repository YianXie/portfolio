google.charts.load('current', { 'packages': ['corechart'] });

document.addEventListener("DOMContentLoaded", function () {
    const DjangoURL = "api/github-repo-langs/";
    const repos = document.querySelectorAll('.repo');

    repos.forEach(repo => {
        const langURL = repo.getAttribute("language");

        try {
            fetch(DjangoURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: langURL }),
            })
                .then(res => res.json())
                .then(data => {
                    displayChart(data, repo);
                })
        }
        catch (err) {
            console.error("Error fetching repo langs:", err);
        }
    });
});

function displayChart(data, element) {
    let chartArray = [["Language", "amount"]];

    for (const lang in data) {
        chartArray.push([lang, data[lang]]);
    }

    var chartData = google.visualization.arrayToDataTable(chartArray);
    var options = {
        pieHole: 0.4,
        chartArea: {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
        },
        backgroundColor: {
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 0,
        },
        tooltip: {
            showColorCode: true,
        },
        height: 150,
        width: 150,
        fontSize: 10,
        legend: {
            position: "none",
        }
    }

    var chart = new google.visualization.PieChart(element.querySelector("#language-chart"));
    chart.draw(chartData, options);
}