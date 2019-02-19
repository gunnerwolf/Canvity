module.exports = {
    entry: './bin/js/MyApp/RunMyApp.js',
    devtool: 'inline-source-map',
    mode: 'production',
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'Canvity.js'
    }
}