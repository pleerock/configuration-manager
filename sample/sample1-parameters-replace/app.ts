import {Configurator} from "../../src/Configurator";

let configurator = new Configurator();
configurator.addConfiguration(require('./config.json'));
configurator.replaceWithParameters(require('./parameters.json'));
console.log('port: ', configurator.get('port'));
console.log('url: ', configurator.get('url'));
console.log('orm: ', configurator.get('orm'));
console.log('all configuration: ', configurator.getAll());