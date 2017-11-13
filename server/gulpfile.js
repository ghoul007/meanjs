var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('**/*.js', ['scripts']);
});

gulp.task('scripts', function() {
    return gulp.src('public/js/*.js')
        .pipe(livereload());
});


gulp.task('server', function() {
    nodemon({
        'script': 'bin/www',
    });
});

gulp.task('serve', ['server', 'watch']);