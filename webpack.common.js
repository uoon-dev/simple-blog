const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const distDir = path.resolve(__dirname, 'app/dist');
const srcDir = path.resolve(__dirname, 'app/src');

module.exports = {
  entry: { 
    'post/01/common': path.resolve(srcDir, 'post/01/common.js'),
    'post/01/style': path.resolve(srcDir, 'post/01/style.css'),

    'css/main': path.resolve(srcDir, 'css/main.css'),
    'js/main': path.resolve(srcDir, 'js/main.js')
  },
  output: {
    path: distDir,
    filename: '[name].js'
  },
  watch: true,
  module: {
    rules: [
      {parser: {system: false}},
      {
          test: /\.js$/,
          use: [
              'babel-loader',
              // 'eslint-loader',
          ],
          exclude: /node_modules/
      },
      { 
        test: /\.css$/, 
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      { 
        test: /\.html$/, 
        loader: 'html-loader',
        options: {
          interpolate: true,
        }
      },
      {
        test: /\.md$/,
        use: [
            {
                loader: "html-loader"
            },
            {
                loader: "markdown-loader",
            },            
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            // options: {
            //   limit: 8192
            // }
            options: {
              esModule: false,
            },            
          }
        ]
      }
    ]
  },
  plugins: [    
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(srcDir, 'main.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(srcDir, 'post/01/how-to-optimize-font-in-vue.html'),
      filename: 'post/01/how-to-optimize-font-in-vue.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FixStyleOnlyEntriesPlugin(),
    new CopyWebpackPlugin([
      { from: path.resolve(srcDir, 'img'), to: distDir + '/img/' },
    ])
  ],
  resolve: {
    modules: ['node_modules', srcDir],
    alias: {
        'reset-css': path.join(__dirname, '/node_modules/reset-css/reset.css'),
        'md-css': path.join(__dirname, '/node_modules/github-markdown-css/github-markdown.css'),
        'hightlight-js': path.join(__dirname, '/node_modules/hightlight.js/'),
    },
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"]
  }  
};