/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                exclude: [path.resolve(__dirname, 'node_modules')],
                test: /\.ts$/,
                use: 'ts-loader',
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader',
            },
        ],
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
};
