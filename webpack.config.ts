import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const net = require('net');
// 获取端口
function getPort(port: number = 9000): Promise<number> {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);
  return new Promise<number>((resolve, reject) => {
    server.on('listening', () => {
      server.close();
      resolve(port);
    });

    server.on('error', (err:any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(getPort(port + 1));// 注意这句，如占用端口号+1
      } else {
        reject(err);
      }
    });
  });
}

// 服务端口号
let serverPort: number;

getPort().then((port) => {
  serverPort = port;
});

interface Configuration extends WebpackConfiguration {
  devServer ?: WebpackDevServerConfiguration;
}
const config: Configuration[] = [{
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? 'cheap-module-source-map' : 'cheap-module-source-map',
  entry: {
    Drag: './src/Drag.ts',
    'Drag.min': './src/Drag.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    module: true,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: serverPort,
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
    new HtmlWebpackPlugin({
      title: 'drag',
      template: './src/index.html',
    }),
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
},
];

export default config;
