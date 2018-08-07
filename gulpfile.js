var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./api/config/config');
var GulpMocha = require('gulp-mocha');

gulp.task('default', function () {
    nodemon({
        script:'index.js',
        ext: 'js',
        env: {
            PORT: 8080,
            DB_URL: config.database.local_url
        },
        ignore: ['./node-modules/**']
    })
    .on('restart', function(){
        console.log('Restarting a server');
    });
});

gulp.task('dev', function () {
    nodemon({
        script:'index.js',
        ext: 'js',
        env: {
            DB_URL: config.database.dev_url
        },
        ignore: ['./node-modules/**']
    })
    .on('restart', function(){
        console.log('Restarting a server');
    });
});


gulp.task('production', function () {
    nodemon({
        script:'index.js',
        ext: 'js',
        env: {
            DB_URL: config.database.dev_url,
            BUCKET_BASE_URI : ''
        },
        ignore: ['./node-modules/**']
    })
    .on('restart', function(){
        console.log('Restarting a server');
    });
});

gulp.task('test', function () {
    gulp.src('api/controller/*.spec.js', {read : false})
        .pipe(GulpMocha());
});