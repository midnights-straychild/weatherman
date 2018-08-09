import {connect} from 'mqtt';
import {Module} from '../Modules';

export class Mqtt extends Module {
    constructor(context: JQuery) {
        super(context);

        this.init();
    }

    public init() {
        const client = connect('ws://localhost:1884');

        client.on('connect', () => {
            client.subscribe('presence');
            client.publish('presence', 'Hello mqtt');
        });

        this.getContext().on('click', '.send-message', (event: JQuery.Event) => {
            console.log('Attempting to send event');
            client.publish('button/clicked', 'Hello again');
        });

        client.on('message', (topic, message) => {
                // message is Buffer
                console.log(message.toString());

                this.getContext().find('.receive-message').html(topic.toString() + ': ' + message.toString());

                // client.end();
            }
        );
    }
}

$(document).ready(() => {
    $('.mqtt').each((i: number, element: HTMLElement): void => {
        new Mqtt($(element));
    });
});