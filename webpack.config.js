import path from 'path';

const __dirname = import.meta.dirname;

const config = {
  mode: "development",

  entry: {
    main: "./frontend/main.js",
    createAccount: './src/public/js/createAccount.js'
  },

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].bundle.js",
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  watch: true
};

export default config;
