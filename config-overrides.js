const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const modifyStyle = require('./config/overwrrides-style');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: modifyStyle
    }),
);
