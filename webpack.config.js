import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: "development",

  entry: {
    main: "./main.js",
    createAccount: "./src/public/js/createAccount.js",
    editContact: "./src/public/js/editContact.js",
  },

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].bundle.js",
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  watch: true,
};

export default config;
