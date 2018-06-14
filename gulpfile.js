var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    watch = require('gulp-watch');

gulp.task('sass', function() {
     gulp.src("scss/*.css")
        .pipe(minify())
        .pipe(concat("all.css"))
        .pipe(gulp.dest('dist/css/'))
});
gulp.task('js', function() {
    gulp.src("script/*.js")
        .pipe(ngAnnotate())
        .pipe(uglify({
            ie8:true
        }))
        .pipe(concat("all.js"))
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('watch',function () {
   gulp.watch('./scss/**/*.css',['sass']);
   gulp.watch('./script/**/*.js',['js']);
});