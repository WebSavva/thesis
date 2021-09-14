const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const pages = [
  {
    id: "index",
    name: "Главная Страница"
  },
  {
    id: "presentation",
    name: "Презентация"
  },
  {
    id: "panel",
    name: "Итоги"
  },
];

module.exports = {
  entry: pages.reduce((config, page) => {
    config[page.id] = `./frontend/src/scripts/${page.id}.js`;
    return config;
  }, {}),
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "frontend/dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
        new TerserPlugin({
            terserOptions: {
                keep_classnames: true,
                keep_fnames: true
            }
          })
        ]
  },
  devtool: 'eval',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ORIGIN': JSON.stringify('https://econ-thesis-api.herokuapp.com')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './frontend/src/media',
          to: 'media'
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./frontend/src/templates/${page.id}.html`,
          filename: `${page.id}.html`,
          favicon: './frontend/src/media/spikes.png',
          chunks: [page.id],
          title: `${page.name} | ВКР ПРОКОФЬЕВ САВВА `,
        })
    )
  ),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
};