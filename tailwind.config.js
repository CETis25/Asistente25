module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    mode: 'all',
    content: ['./public/index.html', './src/**/*.svelte'],
  },
  theme: {
    fontFamily: {
      'oswald': 'Oswald'
    },
    colors: {
      'dgeti': '#00266d',
      'typing': '#1a1a1a',
      'json': '#fcba03'
    },
    extend: {
        backgroundImage: theme => ({
         'cetis-texture': "url('/img/bgcetis.jpg')",
        })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
