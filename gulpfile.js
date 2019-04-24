var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

var paths = {
    styles: {
        src: 'src/assets/css/**/*.scss',
        dest: 'dist/assets/css/'
    },

    scripts: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/assets/js/'
    }
};

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))

    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;