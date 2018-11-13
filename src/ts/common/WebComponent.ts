import {LitElement} from '@polymer/lit-element';
import {TemplateResult, html, DefaultTemplateProcessor} from 'lit-html';
import {Template} from "../@types/template";

export abstract class WebComponent extends LitElement {
    public static defineCustomElement(tagName: string, webComponentClass: Function): void {
        customElements.define(tagName, webComponentClass);
        console.log('ModuleFactory: Registered WebComponent for tag: "' + tagName + '"');
    }

    public abstract getTemplate(): Template;

    public abstract getStyles(): string;

    public render(): TemplateResult {
        console.log('Rendering...');

        const html: ReadonlyArray<string> = ['<style type="text/css">' + this.getStyles() + '</style>', this.getTemplate()()];

        return new TemplateResult(html as TemplateStringsArray, [], 'html', new DefaultTemplateProcessor());
    }
}
