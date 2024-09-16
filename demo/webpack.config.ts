import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
import { resolve } from 'path';
import * as webpack from 'webpack';
import { webpackIgnore } from '../config/webpack-utils';

const VERSION = JSON.stringify(require('../package.json').version);
const REVISION = JSON.stringify(
  require('child_process').execSync('git rev-parse --short HEAD').toString().trim(),
);

function root(filename) {
  return resolve(__dirname + '/' + filename);
}

export default (env: { playground?: boolean; bench?: boolean; fixed?: boolean } = {}) => ({
  entry: [
    root('../src/polyfills.ts'),
    root(
      env.fixed
        ? 'playground/fixed.tsx'
        : env.playground
          ? 'playground/hmr-playground.tsx'
          : env.bench
            ? '../benchmark/index.tsx'
            : 'index.tsx',
    ),
  ],
  target: 'web',
  output: {
    filename: env.fixed ? 'docs-bundle.js' : 'redoc-demo.bundle.js',
    path: root('dist'),
    globalObject: 'this',
  },

  devServer: {
    static: __dirname,
    port: 9090,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
  stats: {
    children: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      http: false,
      fs: false,
      os: false,
    },
  },

  performance: false,

  externals: {
    esprima: 'esprima',
    'node-fetch': 'null',
    'node-fetch-h2': 'null',
    yaml: 'null',
    'safe-json-stringify': 'null',
  },

  module: {
    rules: [
      { test: [/\.eot$/, /\.gif$/, /\.woff$/, /\.svg$/, /\.ttf$/], use: 'null-loader' },
      {
        test: /\.(tsx?|[cm]?js)$/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015',
          tsconfigRaw: require('../tsconfig.json'),
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              minify: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __REDOC_VERSION__: VERSION,
      __REDOC_REVISION__: REVISION,
      'process.env': '{}',
      'process.platform': '"browser"',
      'process.stdout': 'null',
      'process.cwd': '() => "/"',
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template:
        env.playground || env.fixed
          ? 'demo/playground/index.html'
          : env.bench
            ? 'benchmark/index.html'
            : 'demo/index.html',
    }),
    // new HtmlInlineScriptPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new ForkTsCheckerWebpackPlugin({ logger: { infrastructure: 'silent', issues: 'console' } }),
    webpackIgnore(/js-yaml\/dumper\.js$/),
    webpackIgnore(/json-schema-ref-parser\/lib\/dereference\.js/),
    webpackIgnore(/^\.\/SearchWorker\.worker$/),
    new CopyWebpackPlugin({
      patterns: ['demo/spec.json'],
    }),
  ],
});
