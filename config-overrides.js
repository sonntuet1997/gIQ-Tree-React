const {override, fixBabelImports, addLessLoader, overrideDevServer} = require('customize-cra');
//

module.exports = {
    webpack: override(
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
    ),
    devServer: override(overrideDevServer(config => {
        return {
            ...config,   hot: false,
            inline: false,
            liveReload: false,
            injectClient: false,
        }
    }))
}
