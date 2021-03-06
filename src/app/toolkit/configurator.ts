import SimpleRestProvider from './data-providers/simple';

/*
* Default datagrid configurations
*/
export class Configurator {
    public static apiUrl: string;

    public static restProvider;

    public static setConfig(options:{}) {
        for (let key in options) {
            Configurator[key] = options[key];
        }
    }

    public static getRestProvider() {
        if (Configurator.restProvider) {
            return Configurator.restProvider;
        }

        return SimpleRestProvider;
    }
}