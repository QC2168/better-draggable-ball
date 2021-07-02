import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer ?: WebpackDevServerConfiguration;
}
const outputConfig: Configuration[] = [
  {
    output: {
      path: path.resolve(__dirname, 'dist/commonjs'),
      filename: '[name].js',
      clean: true,
      library: {
        name: 'betterDraggableBall',
        type: 'commonjs',
        export: 'default',
      },
    },
  },
  {
    output: {
      path: path.resolve(__dirname, 'dist/umd'),
      filename: '[name].js',
      clean: true,
      library: {
        name: 'betterDraggableBall',
        type: 'umd',
        export: 'default',
      },
    },
  },
  {
    output: {
      path: path.resolve(__dirname, 'dist/module'),
      filename: '[name].js',
      clean: true,
      module: true,
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
  },
];
const baseConfig: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-source-map',
  entry: {
    'better-draggable-ball': './src/Drag.ts',
    'better-draggable-ball.min': './src/Drag.ts', // 压缩版本
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    inline: true,
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
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      exclude: '/node_modules/',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        include: /\.min\.js$/,
        terserOptions: {
          format: {
            comments: false,
          },
        },
        test: /\.js(\?.*)?$/i,
        extractComments: false,
      }),
    ],
  },
};

const config: Configuration[] & Configuration | [] | any = [];
for (let i: number = 0; i < outputConfig.length; i += 1) {
  config[i] = Object.assign(outputConfig[i], baseConfig);
}
config.parallelism = outputConfig.length;
export default config;
