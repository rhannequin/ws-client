var gulp  = require('gulp')
  , clean = require('gulp-clean')

module.exports = function() {
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean())
}
