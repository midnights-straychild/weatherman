import 'flot';
import '../../../../node_modules/flot/jquery.flot.time';
import { Module } from '../../common/Module';
import { SensorData } from '../../@types/sensor';

export class Chart extends Module {
    public static SELECTOR: string = '.chart';

    constructor(context: JQuery) {
        super(context);
    }

    public static instance(context: JQuery): Chart {
        return new Chart(context);
    }

    public init() {
        $.plot(this.getContext(), [this.getData().map(x => {return [ x.timestamp, x.value]; })], this.getOptions());
    }

    public getOptions(): jquery.flot.plotOptions {
        const oneWeekAgo = new Date();
        oneWeekAgo.setFullYear(2017);

        const options: jquery.flot.plotOptions = {
            series: {
                lines: {show: true},
                points: {show: true}
            },
            xaxis: {
                mode: 'time',
                tickSize: [1, 'month'],
                timeformat: '%b %y',
                min: oneWeekAgo.getTime(),
                max: (new Date()).getTime()
            },
            yaxis: {
                minTickSize: [10],
                tickFormatter: (number: number, object: jquery.flot.axis) => {
                    return number + '°C';
                }
            }
        };

        return options;
    }

    public getData(): Array<SensorData> {
        return this.getContext().data('points') as Array<SensorData>;
    }
}
