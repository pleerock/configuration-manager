import {ConfiguratorUtils} from "./ConfiguratorUtils";

export class Configurator {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private configuration: any = {};

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    setConfiguration(configuration: Object) {
        this.configuration = configuration;
    }

    get(key: string, searchFlattened: boolean = false): any {
        let config = searchFlattened ? ConfiguratorUtils.flatten(this.configuration) : this.configuration;
        return Object.keys(config).reduce((found, configKey) => key === configKey ? config[key] : found, null);
    }

    /**
     * Returns a copy of the configuration.
     */
    getAll() {
        return ConfiguratorUtils.deepClone(this.configuration);
    }

    replaceWithParameters(parameters: any): any {
        let flattenConfig = ConfiguratorUtils.flatten(this.configuration);
        let flattenParams = ConfiguratorUtils.flatten(parameters);
        Object.keys(flattenConfig).forEach(key => {
            Object.keys(flattenParams).forEach(paramKey => {
                let conf = '%%' + paramKey + '%%';
                if (typeof flattenConfig[key] === 'string' && flattenConfig[key].indexOf(conf) !== -1) {
                    flattenConfig[key] = flattenConfig[key].replace(conf, flattenParams[paramKey]);
                    flattenConfig[key] = this.normalizeType(flattenConfig[key], flattenParams[paramKey]);
                }
            });
        });
        this.configuration = ConfiguratorUtils.unflatten(flattenConfig);
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private normalizeType(value: string, originalValue: any): any {
        let type = typeof originalValue;
        switch (type) {
            case 'boolean':
                return Boolean(value);
            case 'string':
                return String(value);
            case 'number':
                return Number(value);
        }

        return value;
    }

}

export let defaultConfigurator = new Configurator();