const gulp = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');

const webpack = require('webpack-stream');
const webpackConf = require('./webpack.config.js');

function build() {
    var tsProject = ts.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(tsProject()).js
        .pipe(gulp.dest('bin'));

    return tsResult;
};

function pack() {
    return gulp.src('bin/js/**/*.js')
        .pipe(webpack(webpackConf))
        .pipe(gulp.dest('bin/pack'));
};

function clean(done) {
    rimraf.sync('./bin');
    done();
}

exports.build = build;
exports.pack = pack;
exports.clean = clean;
exports.default = gulp.series(clean, build, pack);