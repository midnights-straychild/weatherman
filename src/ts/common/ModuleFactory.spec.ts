import {ModuleFactory, ModuleOnLoadEntry} from './ModuleFactory';
import {Module} from './Module';

describe('Module Factory', () => {
    class ExampleModule extends Module {
        public static SELECTOR: string = '.example-module';

        constructor(context: JQuery) {
            super(context);

            // some constructor stuff
        }

        public static instance(context: JQuery): ExampleModule {
            const exampleModule: ExampleModule = new ExampleModule(context);

            exampleModule.init();

            return exampleModule;
        }

        public init(): void {
            // some init stuff
        }
    }

    beforeAll(() => {
        ModuleFactory.modules = [];

        const fixture: JQuery = $('<div class="module-factory-spec"><div class="example-module"></div><div' +
            ' class="example-module"></div></div>');

        $('body').append(fixture);
    });

    afterAll(() => {
        $('module-factory-spec').remove();
    });

    describe('Registering: ', () => {
        it('With selector and callback: ', () => {
            const moduleRegistryEntry: ModuleOnLoadEntry = {
                selector: ExampleModule.SELECTOR,
                factory: (element: JQuery): Module => {
                    return ExampleModule.instance($(element));
                },
                instances: []
            };

            ModuleFactory.register(moduleRegistryEntry.selector, moduleRegistryEntry.factory);

            expect(ModuleFactory.getRegisteredModules()[0]).toEqual(moduleRegistryEntry);
        });

        it('with ModuleOnLoadEntry object:', () => {
            const moduleRegistryEntry: ModuleOnLoadEntry = {
                selector: ExampleModule.SELECTOR,
                factory: (element: JQuery): Module => {
                    return ExampleModule.instance($(element));
                }
            };

            ModuleFactory.pushModule(moduleRegistryEntry);

            expect(ModuleFactory.getRegisteredModules()[1]).toEqual(moduleRegistryEntry);
        });
    });

    describe('invoke registered Modules', () => {
        it('should load all registered Modules and store the instances: ', () => {
            ModuleFactory.modules = [];

            ModuleFactory.register(ExampleModule.SELECTOR, (element: JQuery): Module => {
                return ExampleModule.instance($(element));
            });

            ModuleFactory.invokeModules();

            expect(ModuleFactory.getRegisteredModules()[0].instances.length).toEqual(2);
        });

        it('should load all registered Modules and store the instances via push method: ', () => {
            ModuleFactory.modules = [];

            const moduleRegistryEntry: ModuleOnLoadEntry = {
                selector: ExampleModule.SELECTOR,
                factory: (element: JQuery): Module => {
                    return ExampleModule.instance($(element));
                }
            };

            ModuleFactory.pushModule(moduleRegistryEntry);

            ModuleFactory.invokeModules();

            expect(ModuleFactory.getRegisteredModules()[0].instances.length).toEqual(2);
        });
    });
});