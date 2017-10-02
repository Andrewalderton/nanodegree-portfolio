
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    minifyinline = require('gulp-minify-inline'),
    copy = require('gulp-copy'),
    htmlReplace = require('gulp-html-replace'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyhtml = require('gulp-htmlmin');

var critical = require('critical').stream;

var bowerSrc = ['bower_components/**(!sizzle)/dist/*.js', 'bower_components/bootstrap/dist/**/*.js', '!**/**/npm.*', '!**/**/*.slim.*', '!**/**/*.debug.*', '!**/**/*.min.*'];

var bowerCss = ['bower_components/**(!sizzle)/dist/*.css', 'bower_components/bootstrap/dist/**/*.css', '!**/**/npm.*', '!**/**/*.slim.*', '!**/**/*.debug.*', '!**/**/*.min.*', '!**/**/bootstrap-theme.*'];

// Copy Bower Components
gulp.task('copy', function(done) {
  return [
    gulp.src(['bower_components/bootstrap/fonts/*'])
    .pipe(copy('src/fonts', {prefix: 3})),

    gulp.src(bowerSrc)
    .pipe(copy('src/js', {prefix: 4})),

    gulp.src(bowerCss)
    .pipe(copy('src/css', {prefix: 4})),
    done()
  ];
});

// Copy to 'dist' folder
gulp.task('distCopy', function(done) {
  return [
    gulp.src('src/favicon.png')
    .pipe(copy('dist', {prefix: 1})),

    gulp.src('src/fonts/*')
    .pipe(copy('dist/fonts', {prefix: 2})),
    done()
  ];
});

// HTML minifier
gulp.task('mini-html', function(done) {
  gulp.src('src/*.html')
  .pipe(htmlReplace({js: 'js/vendor.min.js', js2: 'js/main.min.js', css: 'css/vendor.min.css', css2: 'css/main.min.css', css3: 'css/badges.min.css'}))
  .pipe(critical({base: 'src/tmp', inline: true, minify: true, css: ['src/css/main.css', 'src/css/badges.css'] }))
  .pipe(minifyhtml({collapseWhitespace: true}))
  .pipe(plumber())
  .pipe(gulp.dest('dist/'));
  done();
});

gulp.task('mini-inline', function(done) {
  gulp.src('*.html')
    .pipe(minifyinline())
    .pipe(gulp.dest('dist'));
    done();
});

// Delete leftover temp files from 'critical' plugin
gulp.task('del', function(done) {
  del([ 'src/tmp/**', '!src/tmp' ]);
  done();
});

var jsFiles = ['src/js/codewars.js', 'src/js/reportcard.js'];

// JavaScript  minifier
gulp.task('mini-js', function(done) {
  [ gulp.src(jsFiles)
      .pipe(plumber())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify( {mangle: false}))
      .pipe(gulp.dest('dist/js')),

    gulp.src(bowerSrc)
      .pipe(plumber())
      .pipe(concat('vendor.min.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest('dist/js')),

    done()
  ];
});

// CSS minifier
gulp.task('mini-css', function(done) {
  [ gulp.src('src/css/main.css')
      .pipe(plumber())
      .pipe(minifycss({compatibility: 'ie8'}))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/css')),

    gulp.src('src/css/badges.css')
      .pipe(plumber())
      .pipe(minifycss({compatibility: 'ie8'}))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/css')),

    gulp.src(bowerCss)
      .pipe(plumber())
      .pipe(concat('vendor.min.css'))
      .pipe(gulp.dest('dist/css'))
      .pipe(minifycss({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/css'))

  ];
  done();
});

// Optimize Images
gulp.task('optimize-image', function(done) {
    gulp.src('src/img/*')
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{
              removeViewBox: false
          }],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/img'));
    done();
});

// Image compress
gulp.task('compress-image', function(done) {
  gulp.src('src/img/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
    done();
});

// Watch Files For Changes
gulp.task('watch', function(done) {
  gulp.watch('src/*.html', gulp.series('mini-html'));
  gulp.watch('src/js/*.js', gulp.series('mini-js'));
  gulp.watch('src/css/*.css', gulp.series('mini-css'));
  gulp.watch('src/img/*', gulp.series('compress-image'));
  done();
});

gulp.task('default', gulp.series('del', 'distCopy', 'mini-html', 'mini-js', 'mini-css', 'compress-image', 'watch'));
