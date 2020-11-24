const path = require('path');
const MiniCssExtraPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // 项目入口，webpack从此处开始构建
    entry: {
        main: path.join(__dirname, 'src/index.js'), // 指定入口，可以指定多个。参考webpack文档
    },
    output: {
        path: path.join(__dirname, "dist"), // bundle生成(emit)到哪里
        filename: "js/[name]-[hash].js", // bundle生成文件的名称
        publicPath: '/',
        chunkFilename: 'js/[name]-[hash].js'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre', // loader处理优先级
        use: [{
            loader: 'babel-loader',
        }]
      }, {
        test: /\.(css|less)$/,  // 如果是sass可以配置sass
        exclude: /node_modules/,
        include: /src/, // 所有内容都写在src下
        use: [{
            loader: "style-loader",
        }, {
            loader: "css-loader",
            options: {
                minimize: true, // 是否压缩代码，默认true
                importLoaders: 2,   // 当前loader之后的数量，
                localIdentName: '[name]-[local]-[hash:base64:5].css',
                modules: true
            },
        }, {
            loader: "postcss-loader",
            options: {
                plugins: (loader) => [
                    require('autoprefixer')(),
                ]
            }
        }, {
            loader: "less-loader",
            options: {
                javascriptEnabled: true
            }
        }]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,   // 转为base64编码的大小限制，小于这个会将图片转成dataURI
            name: 'static/img/[name].[hash].[ext]'
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: 'static/fonts/[name].[hash].[ext]'
        }
      }]
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        new MiniCssExtraPlugin({
            filename: '[name]-[local]-[hash:base64:5].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                removeComments: true,   // 清理html中的注释
                collapseWhitespace: false,   // 空格折叠
                removeAttributeQuotes: false,   // 移除双引号
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // inject: 'head',  // 打包的js
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, './src/assets/'), to: 'assets'}
            ]
        })
    ],
    devServer: {
        contentBase: './dist/',
        clientLogLevel: 'warning',
        publicPath: './',
        hot: true,
        progress: true,
        port: 3000,
        host: 'localhost',
    }
}