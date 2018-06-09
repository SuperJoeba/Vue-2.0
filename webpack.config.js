// webpack 配置文件

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

const config = {

    target: "web",

    entry: [
        path.resolve(__dirname, './src/build/entry.js')
    ],

    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist'),
        // publicPath: "http://deploy.com:8081/#/home"
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        scss: 'vue-style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }

            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 1024
                    }
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isDev ? '"development"' : '"production"',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/build/index.html'),
            inject: true
        })
    ],

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },

};

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        overlay: {
            errors: true
        },
        open: true,
        openPage: '#/home'
    };

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else {
    config.optimization = {

        // 代码丑化
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    }

}

module.exports = config;

