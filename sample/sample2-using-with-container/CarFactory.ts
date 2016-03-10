import {Service} from "typedi/Decorators";
import {Config} from "../../src/Decorators";
import {EngineFactory} from "./EngineFactory";

@Service()
export class CarFactory {

    private engineFactory: EngineFactory;
    private factoryName: string;
    private showEngineInfo: boolean;

    constructor(engineFactory: EngineFactory,
                @Config("factoryName") factoryName: string,
                @Config("showEngineInfo") showEngineInfo: boolean) {

        this.engineFactory = engineFactory;
        this.factoryName = factoryName;
        this.showEngineInfo = showEngineInfo;
    }

    build() {
        console.log("Building car in " + this.factoryName + " factory...");
        if (this.showEngineInfo)
            this.engineFactory.build();

        console.log("Build finished");
    }

}
