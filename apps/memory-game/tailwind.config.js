const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/*.{html,ts}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        purple: '#93A4FF',
        yellow: '#F0FD71',
        pink: '#FF9EFF',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
