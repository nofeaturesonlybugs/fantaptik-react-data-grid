const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

const fantaptikWebpack = require( '@fantaptik/webpack-config' );

const fantaptikSource = config => {
    const rootPath = path.resolve( __dirname, '..' );
    const loader = [
        path.resolve( rootPath, 'core/src' ),
        path.resolve( rootPath, 'react-material/src' ),
    ];
    const aliases = {
        '@fantaptik/core$' : path.resolve( rootPath, 'core/src' ),
        '@fantaptik/react-material$' : path.resolve( rootPath, 'react-material/src' ),
    };

    config.resolveLoader.modules = [ ...config.resolveLoader.modules, ...loader ];
    config.resolve.alias = { ...config.resolve.alias, ...aliases };
    return config;
}

const singleReact = config => {
    const rootPath = path.resolve( __dirname, "node_modules/" );
    const aliases = {
        'materialize-css' : path.resolve( rootPath, "materialize-css" ),

        'prop-types' : path.resolve( rootPath, "prop-types" ),

        'react' : path.resolve( rootPath, "react" ),
        'react-dom' : path.resolve( rootPath, "react-dom" ),

        'redux' : path.resolve( rootPath, "redux" ),
        'react-redux' : path.resolve( rootPath, "react-redux" ),
    };
    config.resolve.alias = { ...config.resolve.alias, ...aliases };
    return config;
}

const makeConf = () => {
    let config = {
        entry : "./src/index.js",
        stats : {
            ...fantaptikWebpack.stats,
        },
        externals : {
            ...fantaptikWebpack.externals,
        },
        output : {
            filename : "index.js",
            path : path.resolve( __dirname, "dist" ),
            library : "FantaptikReactDataGrid",
            libraryTarget : "umd",
        },
        devtool : "eval-source-map",
        plugins : [
            // Clean dist for every build.
            new CleanWebpackPlugin(),
        ],
        module : {
            rules : [
                {
                    test : /\.css$/,
                    use : [ 'style-loader', 'css-loader' ],
                },
                {
                    test : /\.js$/,
                    exclude : /[\\/]node_modules[\\/]/,
                    use : {
                        loader: 'babel-loader',
                        options : {
                            plugins : [ '@babel/plugin-proposal-class-properties' ],
                            presets : [ '@babel/preset-env', '@babel/preset-react' ],
                        },
                    },
                },
            ],
        },
        resolveLoader : {
            modules : [
                "node_modules",
            ],
        },
        resolve : {
            symlinks : false,
            alias : {},
        },
    };

    config = fantaptikSource( config );
    config = singleReact( config );

    return config;
}

module.exports = makeConf();
