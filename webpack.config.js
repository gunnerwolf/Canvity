module.exports = {
    entry: './bin/js/MyApp/RunMyApp.js',
    devtool: 'source-map',
    mode: 'production',
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'Canvity.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        }
      ]
    }
}