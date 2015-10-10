import {Resolve} from "typedi/Resolve";
import {Config} from "../../src/Annotations";
import {EngineFactory} from "./EngineFactory";

@Resolve()
export class CarFactory {

    private engineFactory: EngineFactory;
    private factoryName: string;
    private showEngineInfo: boolean;

    constructor(engineFactory: EngineFactory,
                @Config('factoryName') factoryName: string,
                @Config('showEngineInfo') showEngineInfo: boolean) {

        this.engineFactory = engineFactory;
        this.factoryName = factoryName;
        this.showEngineInfo = showEngineInfo;
    }

    build() {
        console.log('Building car in ' + this.factoryName + ' factory...');
        if (this.showEngineInfo)
            this.engineFactory.build();

        console.log('Build finished');
    }

}
