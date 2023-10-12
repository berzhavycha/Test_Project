const webpack = require('webpack')
const path = require('path')


module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process',
        }),
        new webpack.EnvironmentPlugin({
            FOURSQUARE_PLACES_API_BASE_URL: 'https://api.foursquare.com/v3/places/search',
            FOURSQUARE_PLACES_API_KEY: 'fsq3C1EEWYk0pgVweHJQ0mELQHwD+jCkfg5zE4y5LV5T/x0=',
        }),
    ],
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            process: "process/browser"
        },
    },
    output: {
        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
}