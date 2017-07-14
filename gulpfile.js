var gulp = require('gulp'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gulpsync = require('gulp-sync')(gulp);

// 定义解析es6的任务
gulp.task('compile-es6', function() {
    return gulp.src('src/**/*')
        .pipe(babel({
            presets: ['es2015','stage-0']
        }))
        .pipe(gulp.dest('dist/packages/'));
});

// 将解析出来的js打包
gulp.task('pack-js', function() {
    return gulp.src('dist/packages/index.js')
        .pipe(browserify())
        .pipe(rename('helper.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename('helper.min.js'))
        .pipe(gulp.dest('dist/'));
});

// 定义监听任务
gulp.task('watch', function() {
    gulp.watch('./src/**/*', gulpsync.sync(['compile-es6', 'pack-js']));
})

//启动服务端口3000
gulp.task('server', gulpsync.sync(['compile-es6', 'pack-js', 'watch']), function() {
    connect.server({
        root: './',
        port: 3000,
        livereload: true
    });
});
