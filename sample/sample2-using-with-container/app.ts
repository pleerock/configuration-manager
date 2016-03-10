import {defaultConfigurator} from "../../src/Configurator";
import {Container} from "typedi/Container";
import {CarFactory} from "./CarFactory";

// add configuration and parameters right from files
// note: we use specific paths because of the build specifics
defaultConfigurator.addConfiguration(require("../../../../sample/sample2-using-with-container/config.json"));
defaultConfigurator.replaceWithParameters(require("../../../../sample/sample2-using-with-container/parameters.json"));

// its important to import car factory after configuration is setup otherwise injector will try to use not loaded configs first
let carFactory = Container.get<CarFactory>(CarFactory);
carFactory.build();