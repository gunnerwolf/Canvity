module.exports = {
    entry: './src/Canvity/Main.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
            }
        ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'Canvity.js'
    }
}