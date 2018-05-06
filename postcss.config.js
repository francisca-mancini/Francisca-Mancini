module.exports = {
  plugins: [
    require('postcss-import', {root: './'}),
    require('tailwindcss')('./tailwind-config.js'),
    require('autoprefixer')({})
  ]
}