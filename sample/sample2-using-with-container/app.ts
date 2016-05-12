import Configurator from "../../src/index";
import {Container} from "typedi/Container";
import {CarFactory} from "./CarFactory";

// add configuration and parameters right from files
// note: we use specific paths because of the build specifics
Configurator.addConfiguration(require("../../../../sample/sample2-using-with-container/config.json"));
Configurator.replaceWithParameters(require("../../../../sample/sample2-using-with-container/parameters.json"));

// its important to import car factory after configuration is setup otherwise injector will try to use not loaded configs first
let carFactory = Container.get(CarFactory);
carFactory.build();