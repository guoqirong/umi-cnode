import { defineConfig } from 'umi';
import { routes } from './src/router';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const prodGzipList = ['js', 'css'];

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'umi-cnode',
  copy: [
    {
      from: './src/assets/images/favicon.ico',
      to: 'favicon.ico',
    },
  ],
  routes,
  fastRefresh: {},
  chainWebpack(config) {
    if (process.env.UMI_ENV !== 'dev') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                name: 'vendors',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|axios)[\\/]/,
                priority: -10,
              },
              antd: {
                name: 'antd',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](antd|antd-mobile)[\\/]/,
                priority: -11,
              },
            },
          },
        },
      });
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
          algorithm: 'gzip', // 指定生成gzip格式
          test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'), // 匹配哪些格式文件需要压缩
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.6, // 压缩比例，值为0 ~ 1
        }),
      );
    }
  },
  chunks: process.env.UMI_ENV !== 'dev' ? ['vendors', 'antd', 'umi'] : ['umi'],
});
