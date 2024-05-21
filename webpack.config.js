import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './main.js', // the entry point of your application
  output: {
    filename: 'bundle.js', // the name of the bundled file
    path: path.resolve(__dirname, 'dist'), // the directory where the bundled file will be saved
  },
  mode: 'production', // the mode can be 'production' or 'development'
  resolve: {
    extensions: ['.js'], // automatically resolve these extensions
  },
};