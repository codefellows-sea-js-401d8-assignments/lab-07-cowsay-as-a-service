const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var testFiles = ['test/**/*.js'];
var allFiles = ['test/**/*.js', 'lib/**/*.js', 'gulpfile.js', 'server.js'];

gulp.task('lint:all', () =>{
  gulp.src(allFiles)
  .pipe(eslint)
  .pipe(eslint.format());
});

gulp.task('mocha:test', () =>{
  gulp.src(testFiles)
  .pipe(mocha());
});

gulp.task('watch:files', () =>{
  gulp.watch(testFiles, ['mocha:test']);
  gulp.watch(allFiles, ['lint:all']);
});

gulp.task('default', ['lint:all', 'mocha:test', 'watch:files']);
