const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        minimize: true,
        modules: true,
        use: {
          less: { javascriptEnabled: true }
        },
        extract: true
      })
    );
    return config;
  },
};