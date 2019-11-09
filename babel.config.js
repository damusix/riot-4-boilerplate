const isTest = process.env.NODE_ENV === 'test';

const presetEnv = isTest
    ? ["@babel/preset-env", { targets: { node: 'current' }}]
    : "@babel/preset-env";

module.exports = {

    "presets": [
        presetEnv,
        "@babel/preset-react"
    ]
};
