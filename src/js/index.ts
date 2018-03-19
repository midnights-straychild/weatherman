/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import '../../node_modules/jquery/dist/jquery.min.js';
import * as $ from 'jquery';
import '../../node_modules/jquery/dist/jquery.min.map';
import '../node_modules/popper.js/dist/popper.min.js';
import '../node_modules/popper.js/dist/popper.min.js.map';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/flot/jquery.flot.js';
import '../node_modules/flot/jquery.flot.time.js';


$(document).ready(function () {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

//        let sensors = {{ get_sensors()|safe }};
    let data1: any[] = [];
    let data2: any[] = [];
//        let data1 = {{ get_sensordata(1)|safe }};

//        let data2 = {{ get_sensordata(2)|safe }};

    let options = {
        series: {
            lines: {show: true},
            points: {show: true}
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
            tickFormatter: function (number, object) {
                return number + '°C';
            }
        }
    };

    $.plot($("#chart"), [data1], options);
    $.plot($("#chart2"), [data2], options);
});