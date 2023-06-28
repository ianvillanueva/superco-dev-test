let mix = require('laravel-mix');
mix.webpackConfig({
        stats: {
            children: true,
        },
    })
    .js('src/js/app.js', 'assets')
    .sass('src/scss/app.scss', 'assets')
    
    
    
    