const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('build', function() {
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('bin'));
});