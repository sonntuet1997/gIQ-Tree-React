const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
    //         modifyVars: {
    //             '@primary-color': '#F64E60',
    //             '@link-color': '#F64E60',
    //         },
        },
    }),
);
