$(document).ready(function () {
    var recover = [];
    var states = [];
    var confirm = [];
    var death = [];
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        var total_active;
        var total_confirmed;
        var total_recovered;
        var total_deaths;

        total_active = data.statewise[0].active;
        total_confirmed = data.statewise[0].confirmed;
        total_recovered = data.statewise[0].recovered;
        total_deaths = data.statewise[0].deaths;
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#confirmed").append(total_confirmed);
        $("#death").append(total_deaths);

        $.each(data.statewise, function (id, obj) {
            recover.push(obj.recovered);
            confirm.push(obj.confirmed)
            death.push(obj.deaths);
            states.push(obj.state);
        });
        states.shift();
        recover.shift();
        confirm.shift();
        death.shift();
        var myChart = document.getElementById("myChart").getContext("2d");
        var chart = new Chart(myChart, {
            type: "line",
            data: {
                labels: states,
                datasets: [
                    {
                        label: "Confirmed",
                        data: confirm,
                        backgroundColor: "#f1c40f",
                        minBarLength: 2,
                    },
                    {
                        label: "Recovered",
                        data: recover,
                        backgroundColor: "#2ecc71",
                        minBarLength: 2,
                    },
                    {
                        label: "Deceased",
                        data: death,
                        backgroundColor: "#e74c3c",
                        minBarLength: 2,
                    },
                ],
            },

        });
    });
});
