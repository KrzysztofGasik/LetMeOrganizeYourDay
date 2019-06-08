const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //bez optymalizacji dla większej czytelności kodu
    entry: './src/App.js',
    //watch: true,
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },    
    devServer: {
        open: true
    },
    module: {
        rules: [{
                test: /\.js$/, //typ pliku do przetworzenia
                exclude: /node_modules/, //nie uwzględniaj
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader" // translates CSS into CommonJS
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                    },
                  },
                ],
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/template.html',
            filename: './index.html'
        })
    ]
}