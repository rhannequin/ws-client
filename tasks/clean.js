var gulp    = require('gulp')
  , clean   = require('gulp-clean')
  , plumber = require('gulp-plumber')
  , paths   = require('./paths')

module.exports = function() {
  return gulp.src([
        paths.dist.stylesheets
      , paths.dist.scripts
      , paths.dist.images
    ], {read: false})
    .pipe(plumber())
    .pipe(clean())
}
