// @ts-check

const path = require('path'),
  HtmlWebPackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: [
            "./src/client/index.tsx",
            './src/client/index.scss'
        ]
    },
    
    output: {
        filename: "bundle.js",
        path: `${__dirname}./../../dist`
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: { 
            "@common":     path.resolve(__dirname, "../common"),
            "@components": path.resolve(__dirname, "components"),
            "@reducers":   path.resolve(__dirname, "reducers"),
            "@actions":    path.resolve(__dirname, "actions"),
            "@theme":      path.resolve(__dirname, "theme"),
            "@configs":    path.resolve(__dirname, "configs"),
            "@containers": path.resolve(__dirname, "containers"),
            "@services":   path.resolve(__dirname, "services")
        },
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader?configFileName=./src/client/tsconfig.json" 
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                    }, 
                    {
                        loader: 'postcss-loader',
                        options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                    }, 
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new HtmlWebPackPlugin({
            template: path.join(__dirname, "./index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // We want to avoid bundling all of React into the same file, since this 
    // increases compilation time and browsers will typically be able to cache 
    // a library if it doesn’t change.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};