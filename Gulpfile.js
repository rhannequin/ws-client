var gulp = require('gulp')

gulp.task('clean', require('./tasks/clean'))

gulp.task('html', require('./tasks/html'))

// Generated assets
gulp.task('styles', require('./tasks/styles'))
gulp.task('scripts', require('./tasks/scripts'))
gulp.task('images', require('./tasks/images'))

gulp.task('dist', ['clean'], function() {
  gulp.start('html', 'styles', 'scripts', 'images')
})

gulp.task('default', ['dist'])
