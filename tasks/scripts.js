var gulp       = require('gulp')
  , jshint     = require('gulp-jshint')
  , concat     = require('gulp-concat')
  , uglify     = require('gulp-uglify')
  , browserify = require('gulp-browserify')
  , paths      = require('./paths')

module.exports = function() {
  return gulp.src(paths.sources.scripts + '**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(browserify(
      opts.minify ? {transform : ['uglifyify']} : {}
    ))
    .pipe(gulp.dest(paths.dist.scripts))
}