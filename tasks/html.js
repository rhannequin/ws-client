var gulp  = require('gulp')

module.exports = function() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'))
}
