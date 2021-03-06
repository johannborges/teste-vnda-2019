var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

var paths = {
    styles: {
        src: 'src/assets/css/**/*.scss',
        dest: 'dist/assets/css/'
    },

    scripts: {
        src: 'src/assets/js/**/*.js',
        dest: 'dist/assets/js/'
    },

    html: {
        src: 'src/*.html',
        dest: 'dist/'
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

function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
}

var build = gulp.series(gulp.parallel(styles, scripts, html));

exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.watch = watch;
exports.build = build;

exports.default = build;