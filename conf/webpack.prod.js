/**
 * @description - webpack production mode
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

// dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bourbon = require('bourbon');
const { DefinePlugin, optimize: { UglifyJsPlugin } } = require('webpack');

module.exports = {
  entry: {
    application: ['./src/main.js'],
  },

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].[chunk].chunk.js'
  },

  // 文件寻址
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    },
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
        test: /\.js$/,
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
      // external stylesheet
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
              includePaths: [...bourbon.includePaths]
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
            minimize: true,
            root: path.resolve(process.cwd(), 'src')
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|mp3|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src', 'index.html'),
      title: 'preact seed',
      chunksSortMode: 'dependency',
      favicon: path.join(process.cwd(), 'src', 'favicon.ico')
    })
  ],

  node: {
    global: true,
    Buffer: false,
    crypto: false,
    process: true,
    clearImmediate: false,
    setImmediate: false
  }
};
