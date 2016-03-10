# Configurator.ts

Allows to create and manage configuration files in your project. You can use [gulp-config-parameters][1] plugin
to automate how your configuration is created and managed.

## Installation

1. Install module:

    `npm install configurator.ts --save`

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
import {defaultConfigurator} from "configurator.ts/Configurator";

defaultConfigurator.setConfiguration(require("./config.json"));
console.log("factory name: ", configurator.get("factoryName")); // prints: factory name: BMW
console.log("show engine info?: ", configurator.get("showEngineInfo")); // prints: show engine info?: true
console.log("car engine: ", configurator.get("engine")); // prints: car engine: [Object object]
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
  "factoryName": "%factoryName%",
  "showEngineInfo": "%showEngineInfo%",
  "engine": {
    "version": "%engine::version%",
    "name": "Reactive",
    "description": "%engine::description%"
  }
}
```

Now you can use configuration (with replaced parameters) this way:

```typescript
import {defaultConfigurator} from "configurator.ts/Configurator";

defaultConfigurator.setConfiguration(require("./config.json"));
defaultConfigurator.replaceWithParameters(require("./parameters.json"));
console.log("factory name: ", configurator.get("factoryName")); // prints: factory name: BMW
console.log("show engine info?: ", configurator.get("showEngineInfo")); // prints: show engine info?: true
console.log("car engine: ", configurator.get("engine")); // prints: car engine: [Object object]
```

This allows you to create a common configuration file for your app, and use different parameters on different platforms.
You can use [gulp-config-parameters][1] plugin to automate this process.

###If you are using [typedi][2] you can inject your configuration in your classes

```typescript
import {Service} from "typedi/Service";
import {Config} from "../../src/Annotations";
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
import {Service} from "typedi/Service";
import {Config} from "../../src/Annotations";
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

Take a look on samples in [./sample](https://github.com/pleerock/configurator.ts/tree/master/sample) for more examples
of usage.

## Todos

* cover with tests
* more documentation and samples

[1]: https://github.com/pleerock/gulp-config-parameters
[2]: https://github.com/pleerock/typedi