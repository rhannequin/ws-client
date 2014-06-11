var gulp    = require('gulp')
  , plumber = require('gulp-plumber')
  , paths   = require('./paths')

module.exports = function() {
  return gulp.src(paths.sources.root + '**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist.root))
}
