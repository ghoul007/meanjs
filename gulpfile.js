var gulp = require('gulp');
var install = require("gulp-install");



gulp.task('npm:install', function() {
    gulp.src(['./package.json', 'server/package.json', 'mock_api/package.json'])
        .pipe(install());

});