import {registerChart} from './chart/main';
import {registerMqtt} from './mqtt/main';

export function moduleRegister() {
    registerChart();
    registerMqtt();
}