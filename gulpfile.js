/* jshint node: true */
'use strict'
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


gulp.task('styles', function () {
  return gulp.src('assets/main.css')
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,assets}'});

  return gulp.src('**/*.hbs')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.hbs', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'));
});


gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('assets/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('*.hbs')
    .pipe(wiredep())
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['html', 'images', 'fonts'], function() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
