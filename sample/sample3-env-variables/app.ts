import {Configurator} from "../../src/Configurator";

process.env["CONNECTION_USERNAME"] = "pleerock";
process.env["CONNECTION_PASSWORD"] = "*****";
process.env["URL"] = "http://google.com";

let config = {
    orm: {
        connection: {
            database: "localhost",
            port: 3000,
            username: "%CONNECTION_USERNAME%",
            password: "%CONNECTION_PASSWORD%"
        }
    },
    port: "$port$",
    url: "$url$",
    path: "$path$"
};

let parameters = {
    port: 3000,
    url: "%URL%",
    path: "./bin"
};

let configurator = new Configurator();
configurator.addConfiguration(config);
configurator.replaceWithParameters(parameters);
console.log("port: ", configurator.get("port"));
console.log("url: ", configurator.get("url"));
console.log("orm: ", configurator.get("orm"));
console.log("all configuration: ", configurator.getAll());