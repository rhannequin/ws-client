var gulp     = require('gulp')
  , imagemin = require('gulp-imagemin')
  , cache    = require('gulp-cache')

module.exports = function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
}
