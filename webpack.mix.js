let mix = require('laravel-mix');

//Game One
// mix.js('src/js/app.js', 'dist/js');
// mix.minify(['dist/js/app.js']);

mix.js('src/js/app-2.js', 'dist/js');
mix.minify(['dist/js/app-2.js']);
