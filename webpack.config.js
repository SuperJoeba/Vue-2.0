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
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                        scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }

            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: "style-loader"
                  },
                  {
                    loader: "css-loader",
                    options: {
                        importLoaders: 2 // 处理@import
                    }
                  },
                //   {
                //     loader: "postcss-loader",
                //     options: {
                //         plugins: [
                //           require('autoprefixer')({browsers: ['last 5 versions']}),
                //         ]
                //       }
                //   },
                  {
                    loader: "px2rem-loader",
                    options: {
                        remUnit: 75,
                        remPrecision: 8
                    }
                  },
                  'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                  {
                    loader: "px2rem-loader",
                    options: {
                      remUnit: 75,
                      remPrecision: 8
                    }
                  },
                  'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                  {
                    loader: "px2rem-loader",
                    options: {
                      remUnit: 75,
                      remPrecision: 8
                    }
                  },
                  'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg|eot)$/,
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
        // historyApiFallback: {
        //     index: './index.html'
        // },
        hot: true,
        compress: true,
        host: '127.0.0.1',
        port: 8090,
        overlay: {
            errors: true
        },
        open: true,
        openPage: 'home',
        proxy: {
            "/api": {
              target: "https://apis.map.qq.com/ws/district/v1/list",
              changeOrigin: true, // 必填配置，否则无法正确代理
              pathRewrite: {"^/api" : ""}
            }
        }
    };

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
} else {
    config.output.publicPath = './'
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
                    mangle: {
                        safari10: true
                    }
                },
                sourceMap: true
            })
        ]
    }

}

module.exports = config;

