var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browsersync = require('browser-sync').create();

gulp.task('less', function(done) {
    gulp.src('source/less/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('source/css'))
        .pipe(browsersync.stream());
    done();
});
gulp.task('serve',function (done) {
    browsersync.init({
        server: "source/"
    });
    gulp.watch('source/less/**/*.less', gulp.series('less'));
    gulp.watch('source/*.html').on('change',() =>{
        browsersync.reload();
        done();
    });
    done();
});
gulp.task('default', gulp.series('less','serve'));
/*gulp.task('server', gulp.series('less', function (done) {
    browsersync.init({
        server: "./source"
    });

    gulp.watch('source/less/!**!/!*.less', ['style']);
    gulp.watch('source/!*.html').on('change', browsersync.reload);
    done();
}));*/
/*gulp.task('serve', gulp.series('less', function(done) {

    browsersync.init({

        server: "./source"

    });

    gulp.watch('source/less/!**!/!*.less').on('change', browsersync.reload);

    gulp.watch("source/!*.html").on('change', browsersync.reload);
    done();
}));*/

