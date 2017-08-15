import transformES2015ModulesCommonJS from "babel-plugin-transform-es2015-modules-commonjs";
import transformES2015ModulesSystemJS from "babel-plugin-transform-es2015-modules-systemjs";
import transformES2015ModulesAMD from "babel-plugin-transform-es2015-modules-amd";
import transformES2015ModulesUMD from "babel-plugin-transform-es2015-modules-umd";

function preset(context, opts = {}) {
    const moduleTypes = ["commonjs", "amd", "umd", "systemjs"];
    let loose = false;
    let modules = "commonjs";

    if (opts !== undefined) {
        if (opts.loose !== undefined) loose = opts.loose;
        if (opts.modules !== undefined) modules = opts.modules;
    }

    if (typeof loose !== "boolean") throw new Error("Preset es2015 'loose' option must be a boolean.");
    if (modules !== false && moduleTypes.indexOf(modules) === -1) {
        throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\n" +
            "or a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");
    }

    return {
        plugins: [
            modules === "commonjs" && [transformES2015ModulesCommonJS, {loose}],
            modules === "systemjs" && [transformES2015ModulesSystemJS, {loose}],
            modules === "amd" && [transformES2015ModulesAMD, {loose}],
            modules === "umd" && [transformES2015ModulesUMD, {loose}]
        ].filter(Boolean)
    };
}

const oldConfig = preset({});
export default oldConfig;

Object.defineProperty(oldConfig, "buildPreset", {
    configurable: true,
    writable: true,
    enumerable: false,
    value: preset
});