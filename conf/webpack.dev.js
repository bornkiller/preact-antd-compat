/**
 * @description - webpack develop mode
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const bourbon = require('bourbon');
const {
  DefinePlugin,
  HotModuleReplacementPlugin,
} = require('webpack');

module.exports = {
  entry: {
    application: ['webpack-dev-server/client?http://localhost:8100', 'webpack/hot/dev-server', './src/main.js'],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  // 文件寻址
  resolve: {
    extensions: ['.jsx', '.js', '.html', '.scss', '.css'],
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'src', 'app')
    ]
  },

  // transform code
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve(process.cwd(), 'src'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              root: path.resolve(process.cwd(), 'src')
            }
          }]
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              root: path.resolve(process.cwd(), 'src'),
              modules: true,
              camelCase: 'only',
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              // includePaths: [...bourbon.includePaths]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: path.resolve(process.cwd(), 'src', 'index.html'),
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src'],
            root: path.resolve(process.cwd(), 'src')
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|mp3|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src', 'index.html'),
      title: 'wechat seed',
      chunksSortMode: 'dependency',
      favicon: path.join(process.cwd(), 'src', 'favicon.ico')
    }),
    new HotModuleReplacementPlugin()
  ],

  node: {
    global: true,
    Buffer: false,
    crypto: false,
    process: true,
    clearImmediate: false,
    setImmediate: false
  },

  devtool: 'source-map',

  devServer: {
    contentBase: './dist/',
    quiet: false,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8100,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: 'minimal'
  }
};
