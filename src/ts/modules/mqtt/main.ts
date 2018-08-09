import {ModuleFactory} from '../../common/ModuleFactory';
import {Module} from '../../common/Module';
import {Mqtt} from './Mqtt';

export function registerMqtt(selector: string = Mqtt.SELECTOR) {
    ModuleFactory.register(
        selector,
        (element: JQuery): Module => {
            const instance: Mqtt = Mqtt.instance($(element));

            instance.init();

            return instance;
        }
    );
}