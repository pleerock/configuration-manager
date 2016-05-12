# configuration-manager

Allows to create and manage configuration files in your project. You can use [gulp-config-parameters][1] plugin
to automate how your configuration is created and managed.

## Release Notes

**0.4.0**

* renamed main entry point. Now imports should be made like this: `import ... from "configuration-manager";`

**0.3.0**

* renamed package name from `configurator.ts` to `configuration-manager`
* added new `configuration-manager/configuration-manager/` namespace
* added support of environment variables
* added support of included configurations
* variables names now are `$VARIABLE_NAME$` and environment variable now is `%ENV_VAR_NAME%`

## Installation

1. Install module:

    `npm install configuration-manager --save`

2. Use [typings](https://github.com/typings/typings) to install all required definition dependencies.

    `typings install`

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    if you are building nodejs app, you may want to `require("es6-shim");` in your app.
    or if you are building web app, you man want to add `<script src="path-to-shim/es6-shim.js">` on your page.

## Usage

Create your configuration file, lets say `./config.json`:

```json
{
  "factoryName": "BMW",
  "showEngineInfo": true,
  "engine": {
    "version": 12,
    "description": "Reactive engine for reactive cars"
  }
}
```

Then register your configuration file in configurator and use it to get your configuration properties:

```typescript
import Configurator from "configuration-manager";

Configurator.addConfiguration(require("./config.json"));
console.log("factory name: ", Configurator.get("factoryName")); // prints: factory name: BMW
console.log("show engine info?: ", Configurator.get("showEngineInfo")); // prints: show engine info?: true
console.log("car engine: ", Configurator.get("engine")); // prints: car engine: [Object object]
```

###If you have separate parameters file you can use it this way:
Lets say you have created `./parameters.json`

```json
{
  "factoryName": "BMW",
  "showEngineInfo": true,
  "engine": {
    "version": 12,
    "description": "Reactive engine for reactive cars"
  }
}
```

And your `./config.json` is like this:

```json
{
  "factoryName": "$factoryName",
  "showEngineInfo": "$showEngineInfo$",
  "engine": {
    "version": "$engine::version$",
    "name": "Reactive",
    "description": "$engine::description$"
  }
}
```

Now you can use configuration (with replaced parameters) this way:

```typescript
import Configurator from "configuration-manager";

Configurator.addConfiguration(require("./config.json"));
Configurator.replaceWithParameters(require("./parameters.json"));
console.log("factory name: ", Configurator.get("factoryName")); // prints: factory name: BMW
console.log("show engine info?: ", Configurator.get("showEngineInfo")); // prints: show engine info?: true
console.log("car engine: ", Configurator.get("engine")); // prints: car engine: [Object object]
```

This allows you to create a common configuration file for your app, and use different parameters on different platforms.
You can use [gulp-config-parameters][1] plugin to automate this process.

### You can use environment variables in your configuration this way:

Lets say you have `SOME_ENVIRONMENT_VARIABLE` and `ENGINE_DESCRIPTION_FROM_ENV` environment variables defined,
then you can use them in your configuration (`config.json`) or parameters (`parameters.json`) this way:

```json
{
  "factoryName": "%SOME_ENVIRONMENT_VARIABLE%",
  "showEngineInfo": true,
  "engine": {
    "version": 12,
    "description": "%ENGINE_DESCRIPTION_FROM_ENV%"
  }
}
```
Variables will be replaced with environment variable values then.
Take a look on [this sample](https://github.com/pleerock/configuration-manager/tree/master/sample/sample3-env-variables).

### Using multiple configuration files

Sometimes you configuration is getting huge and you want to split it into multiple files.
To make it easier configuration-manager supports this syntax to include other configuration files:

config.json:

```json
{
  "logging": true,
  "connection": "#/connection.json"
}
```

connection.json:

```json
{
  "database": "localhost",
  "port": 3000,
  "username": "%CONNECTION_USERNAME%",
  "password": "%CONNECTION_PASSWORD%"
}
```

When you are adding you configuration using `addConfiguration` method you need to specify a path to your directory with
configuration files this way:

```typescript
const baseDir = __dirname + "/configurations";
configurator.addConfiguration(require("./configurations/config.json"), baseDir);
```

or you can simply use `loadConfiguration` method:

```typescript
const baseDir = __dirname + "/configurations";
configurator.loadConfiguration("config.json", baseDir);
```

Take a look on [this sample](https://github.com/pleerock/configuration-manager/tree/master/sample/sample4-include-other-configs).

###If you are using [typedi][2] you can inject your configuration in your classes

```typescript
import {Service} from "typedi";
import {Config} from "configuration-manager";
import {EngineFactory} from "./EngineFactory";

@Service()
export class CarFactory {

    private factoryName: string;
    private showEngineInfo: boolean;

    constructor(@Config("factoryName") factoryName: string,
                @Config("showEngineInfo") showEngineInfo: boolean) {

        this.factoryName = factoryName; // gives you "BMW"
        this.showEngineInfo = showEngineInfo; // gives you "true"
    }

}
```

You can also inject right to the properties:

```typescript
import {Service} from "typedi";
import {Config} from "configuration-manager";
import {EngineFactory} from "./EngineFactory";

@Service()
export class CarFactory {

    @InjectConfig("factoryName")
    factoryName: string;  // value is "BMW"
    
    @InjectConfig("showEngineInfo")
    showEngineInfo: boolean; // value is "true"
    
}
```

## Samples

Take a look on samples in [./sample](https://github.com/pleerock/configuration-manager/tree/master/sample) for more examples
of usage.

## Todos

* cover with tests
* add support of more complicated expressions, like default parameters, or fallback parameters

[1]: https://github.com/pleerock/gulp-config-parameters
[2]: https://github.com/pleerock/typedi