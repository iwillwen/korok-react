/*!
 * Korok React (version 0.0.2) - Configurable Components System
 * 
 * Will Wen Gunn(iwillwen) and other contributors
 * 
 * @license MIT-license
 * @copyright 2019 iwillwen(willwengunn@gmail.com)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("korok-core"));
	else if(typeof define === 'function' && define.amd)
		define("korok-react", ["korok-core"], factory);
	else if(typeof exports === 'object')
		exports["korok-react"] = factory(require("korok-core"));
	else
		root["korok-react"] = factory(root["Korok"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_korok_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var korok_core_1 = __webpack_require__(/*! korok-core */ "korok-core");
var util_1 = __webpack_require__(/*! ./util */ "./src/util.ts");
function registerKorok(key) {
    function decorate(component) {
        var target = component.prototype || component;
        var korok = new korok_core_1.default(key);
        Object.defineProperty(target, 'korok', {
            get: function () {
                return korok;
            }
        });
        util_1.patch(target, 'componentWillMount', function () {
            var _this = this;
            korok.setProps(this.props);
            korok.compose(function () {
                _this.forceUpdate();
            });
        });
        util_1.patch(target, 'componentDidMount', function () {
            korok.dispatch();
        });
        korok_core_1.default.register(key, component);
        return component;
    }
    return decorate;
}
exports.registerKorok = registerKorok;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copy from mobx-react
Object.defineProperty(exports, "__esModule", { value: true });
var symbolId = 0;
function createSymbol(name) {
    if (typeof Symbol === "function") {
        return Symbol(name);
    }
    var symbol = "__$korok-react " + name + " (" + symbolId + ")";
    symbolId++;
    return symbol;
}
var createdSymbols = {};
function newSymbol(name) {
    if (!createdSymbols[name]) {
        createdSymbols[name] = createSymbol(name);
    }
    return createdSymbols[name];
}
exports.newSymbol = newSymbol;
var korokMixins = newSymbol("patchMixins");
var korokPatchedDefinition = newSymbol("patchedDefinition");
function getMixins(target, methodName) {
    var mixins = (target[korokMixins] = target[korokMixins] || {});
    var methodMixins = (mixins[methodName] = mixins[methodName] || {});
    methodMixins.locks = methodMixins.locks || 0;
    methodMixins.methods = methodMixins.methods || [];
    return methodMixins;
}
function wrapper(realMethod, mixins) {
    var _this = this;
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls
    mixins.locks++;
    try {
        var retVal = void 0;
        if (realMethod !== undefined && realMethod !== null) {
            retVal = realMethod.apply(this, args);
        }
        return retVal;
    }
    finally {
        mixins.locks--;
        if (mixins.locks === 0) {
            mixins.methods.forEach(function (mx) {
                mx.apply(_this, args);
            });
        }
    }
}
function wrapFunction(realMethod, mixins) {
    var fn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
    };
    return fn;
}
function patch(target, methodName) {
    var mixinMethods = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        mixinMethods[_i - 2] = arguments[_i];
    }
    var mixins = getMixins(target, methodName);
    for (var _a = 0, mixinMethods_1 = mixinMethods; _a < mixinMethods_1.length; _a++) {
        var mixinMethod = mixinMethods_1[_a];
        if (mixins.methods.indexOf(mixinMethod) < 0) {
            mixins.methods.push(mixinMethod);
        }
    }
    var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);
    if (oldDefinition && oldDefinition[korokPatchedDefinition]) {
        // already patched definition, do not repatch
        return;
    }
    var originalMethod = target[methodName];
    var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : undefined, mixins, originalMethod);
    Object.defineProperty(target, methodName, newDefinition);
}
exports.patch = patch;
function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
    var _a;
    var wrappedFunc = wrapFunction(originalMethod, mixins);
    return _a = {},
        _a[korokPatchedDefinition] = true,
        _a.get = function () {
            return wrappedFunc;
        },
        _a.set = function (value) {
            if (this === target) {
                wrappedFunc = wrapFunction(value, mixins);
            }
            else {
                // when it is an instance of the prototype/a child prototype patch that particular case again separately
                // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
                // e.g. the method for super might not be the same as the method for the prototype which might be not the same
                // as the method for the instance
                var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
                Object.defineProperty(this, methodName, newDefinition);
            }
        },
        _a.configurable = true,
        _a.enumerable = enumerable,
        _a;
}


/***/ }),

/***/ "korok-core":
/*!*****************************************************************************************************!*\
  !*** external {"root":"Korok","commonjs2":"korok-core","commonjs":"korok-core","amd":"korok-core"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_korok_core__;

/***/ })

/******/ });
});
//# sourceMappingURL=korok-react.map