import {connect} from 'mqtt';
import {Module} from '../../common/Module';

export class Mqtt extends Module {
    public static SELECTOR: string = '.mqtt';

    constructor(context: JQuery) {
        super(context);
    }

    public static instance(context: JQuery): Mqtt {
        return new Mqtt(context);
    }

    public init() {
        const client = connect('ws://localhost:1884');

        client.on('connect', () => {
            client.subscribe('presence');
            client.subscribe('button/+');
            client.publish('presence', 'Hello mqtt');
        });

        this.getContext().on('click', '.send-message', (event: JQuery.Event) => {
            console.log('Attempting to send event');
            client.publish('button/clicked', 'Hello again');
        });

        client.on('message', (topic, message) => {
                // message is Buffer
                console.log(message.toString());

                this.getContext().find('.receive-message').append(topic.toString() + ': ' + message.toString() + '<br/>');

                // client.end();
            }
        );
    }
}