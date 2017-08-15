# babel-preset-import-export

> Babel preset only for import and export plugins.

## Install

```sh
npm install --save-dev babel-preset-import-export
yarn add babel-preset-import-export --dev
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["import-export"]
}
```

### Via CLI

```sh
babel script.js --presets import-export
```

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`, defaults to `"commonjs"`.

Enable transformation of ES6 module syntax to another module type.

Setting this to `false` will not transform modules.
