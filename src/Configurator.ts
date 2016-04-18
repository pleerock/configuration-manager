import {ConfiguratorUtils} from "./ConfiguratorUtils";

export class Configurator {

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private configuration: any = {};

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    loadConfiguration(baseDir: string, filename: string) {
        this.addConfiguration(require(baseDir + "/" + filename), baseDir);
    }
    
    addConfiguration(configuration: any, baseDir?: string) {
        if (baseDir)
            this.replaceIncludes(configuration, baseDir);
        configuration = this.replace(configuration, process.env, value => "%" + value + "%");
        Object.keys(configuration).forEach(c => this.configuration[c] = configuration[c]);
    }

    get(key: string, searchFlattened: boolean = true): any {
        let config = searchFlattened ? ConfiguratorUtils.flatten(this.configuration) : this.configuration;
        let value = Object.keys(config).reduce((found, configKey) => key === configKey ? config[key] : found, undefined);
        if (value && value instanceof Object)
            return ConfiguratorUtils.deepClone(value);

        return value;
    }

    /**
     * Returns a copy of the configuration.
     */
    getAll() {
        return ConfiguratorUtils.deepClone(this.configuration);
    }

    replaceWithParameters(parameters: any): any {
        parameters = this.replace(parameters, process.env, value => "%" + value + "%");
        this.configuration = this.replace(this.configuration, parameters, value => "$" + value + "$");
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private replaceIncludes(configuration: any, baseDir: string) {
        Object.keys(configuration).forEach(key => {
            if (configuration[key] instanceof Array) {
                configuration[key].forEach((config: any) => this.replaceIncludes(config, baseDir));

            } else if (configuration[key] instanceof Object) {
                this.replaceIncludes(configuration[key], baseDir);

            } else if (typeof configuration[key] === "string" && configuration[key].substr(0, 2) === "#/") {
                configuration[key] = require(baseDir + "/" + configuration[key].substr(2));
                this.replaceIncludes(configuration[key], baseDir);
            }
        });
    }
    
    private replace(configuration: any, params: any, replaceCallback: (value: any) => any) {
        let flattenConfig = ConfiguratorUtils.flatten(configuration);
        let flattenParams = ConfiguratorUtils.flatten(params);
        Object.keys(flattenConfig).forEach(key => {
            Object.keys(flattenParams).forEach(paramKey => {
                let conf = replaceCallback(paramKey);
                if (flattenConfig[key] === conf) {
                    flattenConfig[key] = flattenParams[paramKey];

                } else if (typeof flattenConfig[key] === "string" && flattenConfig[key].indexOf(conf) !== -1) {
                    flattenConfig[key] = flattenConfig[key].replace(conf, flattenParams[paramKey]);
                    flattenConfig[key] = this.normalizeType(flattenConfig[key], flattenParams[paramKey]);
                }
            });
        });

        return ConfiguratorUtils.unflatten(flattenConfig);
    }

    private normalizeType(value: string, originalValue: any): any {
        let type = typeof originalValue;
        switch (type) {
            case "boolean":
                return !!value;
            case "number":
                return +value;
        }

        return value;
    }
}