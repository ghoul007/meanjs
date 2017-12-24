var gulp = require('gulp');
var install = require("gulp-install");
var gulpCopy = require('gulp-copy');
var sourceFiles = [ 'server/**/*.*'];
var destination = 'dist/';


gulp.task('npm:install', function() {
    gulp.src(['./package.json', 'server/package.json', 'mock_api/package.json'])
        .pipe(install());
});

gulp.task('copy', function() {
  gulp.src(sourceFiles)
  .pipe(gulp.dest('dist'))

});
