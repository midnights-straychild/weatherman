import {connect} from 'mqtt';
import {WebComponent} from '../../common/WebComponent';
import {Template} from '../../@types/template';

require('../../../../node_modules/text-encoding/lib/encoding.js');
const Buffer = require('buffer/').Buffer;

export class Mqtt extends WebComponent {
    public static is: string = 'wm-mqtt';

    constructor() {
        super();
    }

    public getTemplate(): Template {
        return require('./mqtt.pug');
    }

    public getStyles(): string {
        return require('./mqtt.tscss');
    }

    public uint8arrayToString(array: Uint8Array): string {
        return new TextDecoder('iso-8859-1').decode(array);
    }

    public getInt64Bytes(x: string): number[] {
        const bytes: number[] = [];
        let i = 8;
        do {
            // @ts-ignore
            bytes[--i] = x & (255);
            // @ts-ignore
            x = x >> 8;
        } while (i);

        return bytes;
    }

    public init() {
        const client = connect('ws://192.168.43.211:1884');

        client.on('connect', () => {
            client.subscribe('presence');
            client.subscribe('button/+');
            client.subscribe('sensornode/1/+');
            client.publish('presence', 'Hello mqtt');
        });

        $(this).on('click', '.mqtt--send-message', (event: JQuery.Event) => {
            console.log('Attempting to send event');
            let message: string | number;
            const topic: string = $(event.target).data('topic');
            const value: string = $(event.target).data('value');

            if (value.endsWith('|b')) {
                message = value.substring(-2, value.length - 2);
            } else {
                message = value;
            }

            client.publish(topic, message);
        });

        client.on('message', (topic, message) => {
            console.log(message.toString());
            $(this).find('.mqtt--receive-message')
                .prepend(topic.toString() + ': ' + this.uint8arrayToString(message) + '<br/>');
            // client.end();
        });
    }
}
