import {Container} from "typedi";
import Configurator from "./index";

export function Config(name: string, searchFlattened: boolean = true) {
    return function(target: Function, key: string, index: number) {
        Container.registerParamHandler({
            type: target,
            index: index,
            getValue: () => Configurator.get(name, searchFlattened)
        });
    };
}

export function InjectConfig(name: string, searchFlattened: boolean = true) {
    return function(target: any, key: string) {
        Container.registerPropertyHandler({
            target: target,
            key: key,
            getValue: () => Configurator.get(name, searchFlattened)
        });
    };
}
