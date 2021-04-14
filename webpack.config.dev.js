const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    //filename: "main.js",
    ////como la parte del contenthash para que nos muestre eso
    filename: '[name].[contenthash].js',
    //De forma predeterminada, los asset/resourcemódulos emiten con [hash][ext][query]nombre de archivo al directorio de salida
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  mode: 'development',
  watch: true,
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  },
  module: {
      rules: [
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.js$/,
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
                loader: "babel-loader"
            }
          },
          {
            test: /\.(css|styl)$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'stylus-loader'
            ],
          },
          {
            test: /\.png/,
            type: 'asset/resource'
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                // limit => limite de tamaño
                limit: 10000,
                // Mimetype => tipo de dato
                mimetype: "application/font-woff",
                // name => nombre de salida
                name: "[name].[contenthash].[ext]",
                // outputPath => donde se va a guardar en la carpeta final
                outputPath: "./assets/fonts/",
                publicPath: "../assets/fonts/",
                esModule: false,
              },
            }
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          inject: true,
          template: './public/index.html',
          filename: './index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].[contenthash].css'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'assets/images'),
            to: 'assets/images'
          }
        ]
      }),
      new Dotenv(),
  ],
  //Cuando nombremos en la configuración de webpack es importante usar [contenthash] para evitar problemas con la cache
}