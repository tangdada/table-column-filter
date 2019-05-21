var gulp = require('gulp');
gulpif = require('gulp-if');
concat = require('gulp-concat');
rename = require('gulp-rename');
uglify = require('gulp-uglify');
clean = require('gulp-clean');
babel = require('gulp-babel'); //支持es6
combiner = require('stream-combiner2');
gutil = require('gulp-util');

gulp.task('clean', function () {
  gulp.src(['dist/*'], { read: false })
    .pipe(clean());
});
//转移js
gulp.task('src-move', function () {
  gulp.src('src/directives/*.js')
    .pipe(gulp.dest('dist/directives'));
});

//压缩js文件
gulp.task('js-min', function () {
  gulp.src('src/directives/*.js')
    .pipe(babel())
    .on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    // .pipe(uglify())
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

//stream
gulp.task('js-min-stream', function () {
  var combined = combiner.obj([
    gulp.src('src/directives/*.js')
    .pipe(babel())
    .pipe(uglify())
    .on('error', function(err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
  ]);

  // 任何在上面的 stream 中发生的错误，都不会抛出，
  // 而是会被监听器捕获
  combined.on('error', console.error.bind(console));

  return combined;
});

gulp.task('default', ['clean', 'js-min']);
// gulp.task('watch', ['clean', 'js-min'], function () {
//   gulp.watch(['src/directives/*.js'], ['clean', 'js-min']);
// });
// gulp.task('default', ['watch']);