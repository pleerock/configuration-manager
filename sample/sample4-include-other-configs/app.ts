import {Configurator} from "../../src/Configurator";

process.env['CONNECTION_USERNAME'] = 'pleerock';
process.env['CONNECTION_PASSWORD'] = '*****';

const baseDir = __dirname + "/../../../../sample/sample4-include-other-configs";

let configurator = new Configurator();
configurator.loadConfiguration(baseDir, "config.json");
console.log("port: ", configurator.get("port"));
console.log("url: ", configurator.get("url"));
console.log("orm: ", configurator.get("orm"));
console.log("all configuration: ", configurator.getAll());