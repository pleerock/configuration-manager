import {defaultConfigurator} from "../../src/Configurator";
import {Container} from "typedi/Container";

defaultConfigurator.addConfiguration(require('./config.json'));
defaultConfigurator.replaceWithParameters(require('./parameters.json'));

// its important to import car factory after configuration is setup otherwise injector will try to use not loaded configs first
import {CarFactory} from "./CarFactory";
let carFactory = Container.get<CarFactory>(CarFactory);
carFactory.build();