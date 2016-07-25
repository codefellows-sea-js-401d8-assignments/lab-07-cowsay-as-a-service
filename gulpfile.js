const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

'use strict';

var testFiles = ['../test/cowsay_test.js'];
var appFiles = ['../lib/cowsay.js'];
gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint({
      rules: {
        'no-console': 0,
        'indent': [
          2,
          2
        ],
        'quotes': [
          2,
          'single'
        ]
      },

      'env': {
        'es6': true,
        'node': true,
        'browser': true
      },

      'globals': [
        'describe',
        'it',
        'beforeEach',
        'afterEach',
        'before',
        'after'
      ]
    }))
  .pipe(eslint.format());
});

gulp.task('mocha; test', () => {
  gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('files: watch', () => {
  gulp.watch('../test/cowsay_test.js', '../lib/cowsay.js');
});

gulp.task('default', ['lint:app', 'lint:test']);
