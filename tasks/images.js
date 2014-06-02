var gulp     = require('gulp')
  , imagemin = require('gulp-imagemin')
  , cache    = require('gulp-cache')
  , paths    = require('./paths')

module.exports = function() {
  return gulp.src(paths.sources.images + '**/*')
    .pipe(cache(imagemin({
        optimizationLevel: 5
      , progressive: true
      , interlaced: true
    })))
    .pipe(gulp.dest(paths.dist.images))
}
