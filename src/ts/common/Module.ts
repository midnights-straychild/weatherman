import { ContextAware } from './ContextAware';

export class Module implements ContextAware {
    private context: JQuery;

    constructor(context: JQuery) {
        this.context = context;
    }

    public getContext(): JQuery {
        return this.context;
    }
}