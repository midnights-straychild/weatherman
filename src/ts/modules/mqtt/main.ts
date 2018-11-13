import {Mqtt} from './Mqtt';

export function registerMqtt() {
    Mqtt.defineCustomElement(Mqtt.is, Mqtt);
}
