const path = require('path')
const webpack = require('webpack')
const dotenv = require('dotenv').config({ path: __dirname + '/.env' })


module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.FOURSQUARE_PLACES_API_KEY': JSON.stringify(process.env.FOURSQUARE_PLACES_API_KEY),
            'process.env.FOURSQUARE_PLACES_API_BASE_URL': JSON.stringify(process.env.FOURSQUARE_PLACES_API_BASE_URL),
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
        extensions: ['.ts', '.js']
    },
    output: {
        publicPath: 'public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
}