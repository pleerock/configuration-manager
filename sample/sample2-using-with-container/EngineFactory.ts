import {Resolve} from "typedi/Resolve";
import {InjectConfig} from "../../src/Annotations";

@Resolve()
export class EngineFactory {

    @InjectConfig('engine::version')
    version: number;

    @InjectConfig('engine::name')
    name: string;

    @InjectConfig('engine')
    engine: { version: number, name: string, description: string };

    build() {
        console.log('Engine ' + this.name + ' (v. ' + this.version + '): ');
        console.log(typeof this.version);
        console.log(this.engine);
    }

}