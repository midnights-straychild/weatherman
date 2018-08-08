/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import 'flot';
import '../../node_modules/flot/jquery.flot.time';

import '../sass/main.sass';


$(document).ready(function () {
    let oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

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
            tickFormatter: (number: number, object: any) => {
                return number + '°C';
            }
        }
    };

    $.plot($("#chart"), [$("#chart").data('points')], options);
    $.plot($("#chart2"), [$("#chart2").data('points')], options);
});