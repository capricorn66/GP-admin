const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, `./assets/` + templateDir));
    return templateFiles.map((item) => {
        const parts = item.split('.');
        const name = parts[0];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            chunks: templateDir === 'templates' ? ['script', 'vendor', 'style'] : ['scriptIO', 'vendor', 'styleIO'],
            template: `./assets/${templateDir}/${name}.html`,
        });
    });
}

const htmlTemplates = generateHtmlPlugins('templates');
const htmlTemplatesIO = generateHtmlPlugins('templateIO');


module.exports = (env, options) => {

    const devMode = options.mode !== 'production';

    return {

        entry: {
            script: './assets/js/app.js',
            scriptIO: './assets/js/app-io.js',
            style: './assets/scss/app.scss',
            styleIO: './assets/scss/app-io.scss',
        },

        output: {
            // publicPath: "/dist/",
            path: path.resolve(__dirname, 'dist/'),
            filename: devMode ? 'js/[name].js' : 'js/[name].min.js'
        },

        plugins: [
            new CopyPlugin([
                //{ from: './assets/icomoon/fonts', to: 'fonts' },
                { from: './assets/images', to: 'images' },
            ]),
            new MiniCssExtractPlugin({
                filename: devMode ? 'css/[name].css' : 'css/[name].min.css',
                chunkFilename: devMode ? 'css/[id].css' : 'css/[id].min.css',
            }),
        ]
            .concat(htmlTemplates)
            .concat(htmlTemplatesIO),

        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}),
                new UglifyJsPlugin(),
            ],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        enforce: true
                    },
                },
                chunks: 'all',
            }
        },

        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use:  [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [

                        //"style-loader",
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: path.resolve(__dirname, ''),
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.(woff|woff2)$/,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            publicPath: path.resolve(__dirname, 'fonts'),
                            name: "fonts/[name].[ext]?[hash:6]",
                        }
                    }
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            publicPath:  (url, resourcePath, context) => {
                                return `../images/${url}`;
                            },
                            outputPath: (url, resourcePath, context) => {
                                return `images/${url}`;
                            },
                            name:'[name].[ext]'
                        }
                    }
                }
            ]
        },

        devtool: 'source-map',
        //devtool: 'cheap-module-eval-source-map',

    }
};

