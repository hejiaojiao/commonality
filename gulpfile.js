'use strict';
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
     sass = require("gulp-sass"),
    connect = require('gulp-connect'),
    inject = require('gulp-inject'),
    series = require('stream-series'),
    usemin = require('gulp-usemin'),
    del = require('del');

// 清理打包目录
gulp.task('clean', function () {
    return del(['dist']);
});
// 复制 html 除home.html外
gulp.task('html', function () {
    gulp
        .src([
            '!src/**/home.html',
            'src/**/*.html'
        ])
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

// 复制 js
gulp.task('js', function () {
    gulp
        .src('src/**/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});

// 复制 css
gulp.task('sass', function () {
    gulp
        .src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});
//复制imges
gulp.task('images',function(){
    gulp
        .src('src/**/images/*')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});
/*复制home页面把js、css注入进去并且合并第三方包*/
gulp.task('usemin', function() {
    var ComponentsJs = gulp.src(['src/script/*.js','src/assets/**/*.js']);
    var ComponentsCss = gulp.src(['src/scss/*.scss','src/assets/css/*.scss']).pipe(sass());
        gulp.src(['src/**/home.html'])
            .pipe(inject(series(ComponentsJs),{relative: true}))
            .pipe(inject(series(ComponentsCss),{relative: true}))
            .pipe(usemin())
            .pipe(gulp.dest('dist'))
            .pipe(connect.reload())

});
// 监听文件变化
gulp.task('watch', function () {
    gulp.watch(['src/**/*.html', '!src/layouts/home.html'], ['html']);
    gulp.watch(['src/**/*.js'], ['js']);
    gulp.watch(['src/**/*.scss'], ['sass']);
    gulp.watch(['src/layouts/home.html'], ['usemin']);
});

gulp.task('default', function () {
    runSequence('clean',['html','sass','images','js'],'usemin','watch')
});
