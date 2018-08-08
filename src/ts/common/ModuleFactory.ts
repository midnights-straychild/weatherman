import {Module} from './Module';

export interface ModuleOnLoadEntry {
    selector: string;
    factory: (element: JQuery) => Module;
    instances?: Array<Module>;
}

export class ModuleFactory {
    public static modules: Array<ModuleOnLoadEntry> = [];

    public static register(selector: string, factory: (element: JQuery) => Module): void {
        const instances: Array<Module> = [];
        const module: ModuleOnLoadEntry = {selector, factory, instances};

        console.log('ModuleFactory: Registered Module for selector: "' + selector.toString() + '"');

        ModuleFactory.pushModule(module);
    }

    public static pushModule(module: ModuleOnLoadEntry): void {
        module.instances = [];

        ModuleFactory.modules.push(module);
    }

    public static invokeModules(): void {
        ModuleFactory.modules.forEach((module) => {
            $(module.selector).each(function (): void {
                const moduleInstance = module.factory($(this));

                module.instances.push(moduleInstance);
                console.log('ModuleFactory: Made a instance of: "' + moduleInstance.constructor.name + '"');
            });
        });
    }

    public static getRegisteredModules(): Array<ModuleOnLoadEntry> {
        return ModuleFactory.modules;
    }
}

$(() => ModuleFactory.invokeModules());