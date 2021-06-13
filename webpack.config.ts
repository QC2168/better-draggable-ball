import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
const config: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-source-map',
  target: false,
  entry: {
    Drag: './src/Drag.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: 'Drag',
    libraryExport: 'default',
    libraryTarget: 'umd',

  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'drag',
      template: './src/index.html',
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      exclude: '/node_modules/',
    }),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         format: {
  //           comments: false,
  //         },
  //       },
  //       test: /\.js(\?.*)?$/i,
  //       extractComments: false,
  //     }),
  //   ],
  // },
};

export default config;
