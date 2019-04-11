const webpack = require('webpack')
const b = require('./assets/banner')
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'korok-react',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: 'korok-react.map',
    globalObject: 'this'
  },
  externals: {
    'korok-core': {
      root: 'Korok',
      commonjs2: 'korok-core',
      commonjs: 'korok-core',
      amd: 'korok-core'
    }
  },
  mode: 'development',
  plugins: [
    new webpack.BannerPlugin({
      banner: b.banner
    })
  ]
}