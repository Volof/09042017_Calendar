var gulp = require("gulp");
var less = require("gulp-less");
var nano = require("gulp-cssnano");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var gulpIf = require("gulp-if");
var autoprefixer = require("gulp-autoprefixer");
var sync = require("browser-sync").create();


var isDevelopment = true;

gulp.task("js:vendor", function () {
    return gulp.src([
        "node_modules/jquery/dist/jquery.js"
    ])
        .pipe(concat("vendor.js"))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("js:own", function () {
    return gulp.src([
        "src/js/main.js"
    ])
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
});

gulp.task("css:own", function () {
    return gulp.src("src/css/main.less")
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(less())
        .pipe(autoprefixer("last 2 versions"))
        .pipe(nano())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest("dist/css"))
        .pipe(sync.stream());
});

gulp.task("html", function () {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});
gulp.task("css", ["css:own"]);
gulp.task("js", ["js:own", "js:vendor"]);

gulp.task("watch", ["build"], function () {
    sync.init({
        server: "dist"
    });
    gulp.watch("src/css/**/*.less", ["css:own"]);// слухач на зміни
    gulp.watch("src/js/*.js", ["js:own"]);
    gulp.watch("dist/js/*.js").on("change", sync.reload); // перезагружаєм браузер
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", sync.reload);
});

gulp.task("build", ["html", "css", "js"]);
gulp.task("default", ["build", "watch"]);