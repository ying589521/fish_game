var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	del = require('del');
	
gulp.task('uglify',['concat'],function(){
	return gulp.src('tmp/main.js')
		.pipe(uglify())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('build'));
});
gulp.task('concat',function(){
	return gulp.src('js/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('tmp'));
});

gulp.task('del',['uglify'],function(){
	del('tmp');
});

gulp.task('default',['concat','uglify','del']);










