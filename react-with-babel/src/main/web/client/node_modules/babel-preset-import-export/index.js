"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _babelPluginTransformEs2015ModulesCommonjs = require("babel-plugin-transform-es2015-modules-commonjs");

var _babelPluginTransformEs2015ModulesCommonjs2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesCommonjs);

var _babelPluginTransformEs2015ModulesSystemjs = require("babel-plugin-transform-es2015-modules-systemjs");

var _babelPluginTransformEs2015ModulesSystemjs2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesSystemjs);

var _babelPluginTransformEs2015ModulesAmd = require("babel-plugin-transform-es2015-modules-amd");

var _babelPluginTransformEs2015ModulesAmd2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesAmd);

var _babelPluginTransformEs2015ModulesUmd = require("babel-plugin-transform-es2015-modules-umd");

var _babelPluginTransformEs2015ModulesUmd2 = _interopRequireDefault(_babelPluginTransformEs2015ModulesUmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preset(context) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
    var loose = false;
    var modules = "commonjs";

    if (opts !== undefined) {
        if (opts.loose !== undefined) loose = opts.loose;
        if (opts.modules !== undefined) modules = opts.modules;
    }

    if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
    if (modules !== false && moduleTypes.indexOf(modules) === -1) {
        throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\n" + "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
    }

    return {
        plugins: [modules === "commonjs" && [_babelPluginTransformEs2015ModulesCommonjs2.default, { loose: loose }], modules === "systemjs" && [_babelPluginTransformEs2015ModulesSystemjs2.default, { loose: loose }], modules === "amd" && [_babelPluginTransformEs2015ModulesAmd2.default, { loose: loose }], modules === "umd" && [_babelPluginTransformEs2015ModulesUmd2.default, { loose: loose }]].filter(Boolean)
    };
}

var oldConfig = preset({});
exports.default = oldConfig;


Object.defineProperty(oldConfig, "buildPreset", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: preset
});

