'use strict';
var gulp = require('gulp'),
     sass = require("gulp-sass"),
    inject = require('gulp-inject'),
     concat = require('gulp-concat'),
     minify = require('gulp-minify-css'),
     uglify = require('gulp-uglify'),
     ngAnnotate = require('gulp-ng-annotate'),
     watch = require('gulp-watch');


gulp.task('index', function() {
    var ComponentsCss = gulp.src('scss/**/*.scss').pipe(sass()),
        DemoCss = gulp.src('assets/css/**/*.scss').pipe(sass());
        gulp.src('layouts/home.html')
            .pipe(inject(ComponentsCss,DemoCss))
            .pipe(gulp.dest('dist'))

});
