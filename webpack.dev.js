const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const distDir = path.resolve(__dirname, 'app/dist');

// const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const phase1 = merge.smartStrategy({plugins: 'prepend'})(common, {
  mode: 'development',
  devServer: {
    contentBase: distDir + '/html',
    inline: true,
    hot: true,
    compress: true,
    port: 9000
  },
  plugins: [
    //source-map
    // new webpack.SourceMapDevToolPlugin({
    //   filename: '[file].map[query]',
    // }),
  ]
});

module.exports = merge(phase1, {
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: 'css/[name].css'
  //   }),
    // new BundleAnalyzerPlugin()
  // ]
});
