import createDefaultConfig from '@open-wc/building-rollup/modern-config';
import minifyHTML from 'rollup-plugin-minify-html-literals';

import copy from 'rollup-plugin-copy';

const config = createDefaultConfig({ input: './src/index.html' });
const production = !process.env.ROLLUP_WATCH;

const basePlugins = production ? [...config.plugins.slice(1)] : [...config.plugins]

export default {
  ...config,
  plugins: [
    ...basePlugins,
    production && 
      minifyHTML({
        failOnError: true,
        removeAttributeQuotes: false,
      }),
    copy({
      targets: {
        'assets': 'dist/assets',
        'favicon.ico': 'dist/favicon.ico',
        'site.webmanifest': 'dist/site.webmanifest',
        'browserconfig.xml': 'dist/browserconfig.xml',
        'src/app.css': 'dist/app.css'
      }
    })
  ]
};
