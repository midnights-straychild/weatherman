

$(document).ready(function () {
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

//        var sensors = {{ get_sensors()|safe }};

//        var data1 = {{ get_sensordata(1)|safe }};

//        var data2 = {{ get_sensordata(2)|safe }};

        var options = {
            series: {
                lines: { show: true },
                points: { show: true }
            },
            xaxis: {
                mode: "time",
                tickSize: [1, "hour"],
                timeformat: "%H:%M %d.%m",
                //min: oneWeekAgo.getTime(),
				//max: (new Date()).getTime()
            },
            yaxis: {
                minTickSize: [10],
                tickFormatter: function(number, object) {
                    return number + '°C';
                }
            }
        };

        $.plot($("#chart"), [data1], options);
        $.plot($("#chart2"), [data2], options);
    });