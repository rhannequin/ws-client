var gulp       = require('gulp')
  , plumber    = require('gulp-plumber')
  , jshint     = require('gulp-jshint')
  , concat     = require('gulp-concat')
  , uglify     = require('gulp-uglify')
  , browserify = require('gulp-browserify')
  , paths      = require('./paths')

module.exports = function() {
  return gulp.src(paths.sources.scripts + 'main.js')
    .pipe(plumber())
    .pipe(browserify(
      opts.minify ? {transform : ['uglifyify']} : {}
    ))
    .pipe(gulp.dest(paths.dist.scripts))
}
