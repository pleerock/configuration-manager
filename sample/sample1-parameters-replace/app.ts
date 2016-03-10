import {Configurator} from "../../src/Configurator";

let config = {
    orm: {
        connection: {
            database: "localhost",
            port: 3000,
            username: "%orm::connection::username%",
            password: "%orm::connection::password%"
        }
    },
    port: "%port%",
    url: "%url%",
    path: "%path%"
};

let parameters = {
    port: 3000,
    url: "http://google.com",
    path: "./bin",
    orm: {
        connection: {
            username: "pleerock",
            password: "*****"
        }
    }
};

let configurator = new Configurator();
configurator.addConfiguration(config);
configurator.replaceWithParameters(parameters);
console.log("port: ", configurator.get("port"));
console.log("url: ", configurator.get("url"));
console.log("orm: ", configurator.get("orm"));
console.log("all configuration: ", configurator.getAll());