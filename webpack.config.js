const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const distDir = path.resolve(__dirname, 'app/dist');
const srcDir = path.resolve(__dirname, 'app/src');
const highlight = require('highlight.js');
// const marked = require("marked");
// marked.setOptions({
//     highlight: function(code) {
//         return highlight.highlightAuto(code).value;
//     }
// });
// const renderer = new marked.Renderer();

module.exports = {
  entry: { 
    'html/post/01/common': path.resolve(srcDir, 'html/post/01/common.js'),
    'html/post/01/style': path.resolve(srcDir, 'html/post/01/style.css'),

    'css/main': path.resolve(srcDir, 'css/main.css'),
    'js/main': path.resolve(srcDir, 'js/main.js')
  },
  output: {
    path: distDir,
    filename: '[name].js'
  },
  devServer: {
    contentBase: distDir + '/html',
    inline: true,
    hot: true,
    compress: true,
    port: 9000
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
            // {
            //     loader: "highlight-loader"
            // },
            {
                loader: "markdown-loader",
                options: {
                  // pedantic: true,
                  // renderer
                }
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
      template: path.resolve(srcDir, 'html/main.html'),
      filename: 'html/index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve(srcDir, 'html/post/01/how-to-optimize-font-in-vue.html'),
      filename: 'html/post/01/how-to-optimize-font-in-vue.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new FixStyleOnlyEntriesPlugin(),
    new CopyWebpackPlugin([
      // { from: path.resolve(srcDir, 'html/post/01/how-to-optimize-font-in-vue.html'), to: distDir + '/html/post/01/how-to-optimize-font-in-vue.html'}
      { from: path.resolve(srcDir, 'img'), to: distDir + '/img/' }
    ])
  ],
  resolve: {
    modules: ['node_modules', srcDir],
    alias: {
        'reset-css': path.join(__dirname, '/node_modules/reset-css/reset.css'),
        'md-css': path.join(__dirname, '/node_modules/github-markdown-css/github-markdown.css'),
    },
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"]
  }  
};