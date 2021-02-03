const gulp = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");
const ghPages = require("gulp-gh-pages");

const cssFiles = [
  "./src/css/base.css",
  "./src/css/index.css",
  "./src/css/game.css",
  "./src/css/end.css",
  "./src/css/highlight.css",
];
const jsFiles = [
  "./src/js/game.js",
  "./src/js/end.js",
  "./src/js/highscore.js"
];

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(concat("style.css"))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat("script.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(
      uglify({
        toplevel: true,
      })
    )
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.stream());
}

function clean() {
  return del(["build/*"]);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./src/css/**/*.css", styles);
  gulp.watch("./src/js/**/*.js", scripts);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("del", clean);
gulp.task("watch", watch);
gulp.task("build", gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task("dev", gulp.series("build", "watch"));
gulp.task("deploy", function () {
  return gulp.src("./build/**/*").pipe(ghPages());
});
