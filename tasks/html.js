var gulp  = require('gulp')
  , paths = require('./paths')

module.exports = function() {
  return gulp.src(paths.sources.root + '**/*.html')
    .pipe(gulp.dest(paths.dist.root))
}
