var gulp = require('gulp');
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()

gulp.task('sass', function(){
  return gulp.src('views/public/scss/*')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('views/public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'views'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('views/public/scss/styles.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('views/*.html', browserSync.reload);
  gulp.watch('views/public/javascript/**/*.js', browserSync.reload);
  gulp.watch('views/public/css/styles.css', browserSync.reload);
});
