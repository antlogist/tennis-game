let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist/js');
mix.minify(['dist/js/app.js']);
