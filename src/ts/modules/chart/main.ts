import {ModuleFactory} from '../../common/ModuleFactory';
import {Module} from '../../common/Module';
import {Chart} from './Chart';

export function registerChart(selector: string = Chart.SELECTOR) {
    ModuleFactory.register(
        selector,
        (element: HTMLElement): Module => {
            const instance: Chart = Chart.instance(element);

            instance.init();

            return instance;
        }
    );
}