import {Container} from "typedi/Container";
import {defaultConfigurator} from "./Configurator";

export function Config(name: string, searchFlattened: boolean = true) {
    return function(target: Function, key: string, index: number) {

        Container.registerParamHandler({
            type: target,
            index: index,
            getValue: () => defaultConfigurator.get(name, searchFlattened)
        });
    }
}

export function InjectConfig(name: string, searchFlattened: boolean = true) {
    return function(target: any, key: string) {
        Object.defineProperty(target, key, {
            enumerable: true,
            writable: true,
            configurable: true,
            value: defaultConfigurator.get(name, searchFlattened)
        });
    }
}