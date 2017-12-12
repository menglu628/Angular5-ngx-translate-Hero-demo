/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const buildUtils = require('./build-utils');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack Constants
 */
function getUglifyOptions (supportES2015) {
    const uglifyCompressOptions = {
        pure_getters: true, /* buildOptimizer */
        // PURE comments work best with 3 passes.
        // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
        passes: 3         /* buildOptimizer */
    };

    return {
        ecma: supportES2015 ? 6 : 5,
        warnings: false,    // TODO verbose based on option?
        ie8: false,
        mangle: true,
        compress: uglifyCompressOptions,
        output: {
            ascii_only: true,
            comments: false
        }
    };
}

module.exports = function (env) {
    const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
    const supportES2015 = buildUtils.supportES2015(buildUtils.DEFAULT_METADATA.tsConfigPath);
    const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8080,
        ENV: ENV,
        HMR: false
    });
    // set environment suffix so these environments are loaded.
    METADATA.envFileSuffix = METADATA.E2E ? 'e2e.prod' : 'prod';
  return webpackMerge(commonConfig({
    env: ENV, metadata: METADATA
  }), {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    // devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].bundle.map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js?[chunkhash]'

    },

    /**
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
        new SourceMapDevToolPlugin({
            filename: '[file].map[query]',
            moduleFilenameTemplate: '[resource-path]',
            fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
            sourceRoot: 'webpack:///'
        }),
      /**
       * Webpack plugin to optimize a JavaScript file for faster initial load
       * by wrapping eagerly-invoked functions.
       *
       * See: https://github.com/vigneshshanmugam/optimize-js-plugin
       */

      // new OptimizeJsPlugin({
      //   sourceMap: false
      // }),
      //   new ExtractTextPlugin('[name].[contenthash].css'),


      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new PurifyPlugin(), /* buildOptimizer */

        new HashedModuleIdsPlugin(),
        new ModuleConcatenationPlugin(),
        /**
         * Plugin: UglifyJsPlugin
         * Description: Minimize all JavaScript output of chunks.
         * Loaders are switched into minimizing mode.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
         */
        // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines

        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: getUglifyOptions(supportES2015)
        }),

      /**
       * Plugin: BundleAnalyzerPlugin
       * Description: Webpack plugin and CLI utility that represents
       * bundle content as convenient interactive zoomable treemap
       *
       * `npm run build:prod -- --env.analyze` to use
       *
       * See: https://github.com/th0r/webpack-bundle-analyzer
       */

    ],

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}
