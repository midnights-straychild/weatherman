import { ContextAware } from './ContextAware';

export class Module implements ContextAware {
    private context: HTMLElement;

    constructor(context: HTMLElement) {
        this.context = context;
    }

    public getContext(): HTMLElement {
        return this.context;
    }
}