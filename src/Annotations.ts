import {Container} from "typedi/Container";
import {defaultConfigurator} from "./Configurator";

export function Config(name: string) {
    return function(target: Function, key: string, index: number) {

        Container.registerCustomParamHandler({
            type: target,
            index: index,
            getValue: () => defaultConfigurator.get(name)
        });
    }
}

export function InjectConfig(name: string, searchFlattened?: boolean) {
    return function(target: any, key: string) {
        Object.defineProperty(target, key, {
            enumerable: true,
            writable: true,
            configurable: true,
            value: defaultConfigurator.get(name, searchFlattened)
        });
    }
}