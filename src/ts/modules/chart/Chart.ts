import 'flot';
import '../../../../node_modules/flot/jquery.flot.time';
import { Module } from '../Modules';

export class Chart extends Module {
    constructor() {
        super();
    }

    public init() {
        $(document).ready(function () {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 3);

            const options = {
                series: {
                    lines: {show: true},
                    points: {show: true}
                },
                xaxis: {
                    mode: 'time',
                    tickSize: [1, 'hour'],
                    timeformat: '%H:%M %d.%m',
                    // min: oneWeekAgo.getTime(),
                    // max: (new Date()).getTime()
                },
                yaxis: {
                    minTickSize: [10],
                    tickFormatter: (number: number, object: any) => {
                        return number + '°C';
                    }
                }
            };

            $.plot($('#chart'), [$('#chart').data('points')], options);
            $.plot($('#chart2'), [$('#chart2').data('points')], options);
        });
    }
}
