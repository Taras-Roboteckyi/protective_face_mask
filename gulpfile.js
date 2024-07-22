//Основний модуль
//import gulp from "gulp";

//Імпорт шляхів
//import { path } from "./gulp/config/path.js";

//Імпорт загальних плагінів
//import { plugins } from "./gulp/config/plugins.js";

//Передаєм значення в глобальну змінну
/* global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
}; */

//Імпорт задач
/* import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { serve } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
 */
//Спостережувальна функція за змінами в файлах
/* function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images); //1 параметр - Вказуєм шлях за яким потрібно дивитися і другий параметр - дії які потрібно виконати
} */

//Послідовна обробка шрифтів
/* const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle); */

//Основні задачі
/* const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
); */

//Побудова сценаріїв виконання задач
/* const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, serv)); */

//Виконання сценарію по замовчуванню
/* gulp.task("default", dev); */

// Экспорт задач
//const build = gulp.series(gulp.parallel(minifyHtml, optimizeImages));
/* const watch = gulp.parallel(watcher, serve);

export default gulp.series(build, watch);
 */

import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import plumber from "gulp-plumber";
import fileInclude from "gulp-file-include";
import browserSync from "browser-sync";

// Путь к исходным и выходным файлам
const paths = {
  html: {
    src: "src/**/*.html",
    dest: "dist/",
  },
  images: {
    src: "src/images/**/*.{jpg,jpeg,png,svg,gif}",
    dest: "dist/images/",
  },
};

// Инициализация BrowserSync
const server = browserSync.create();

// Задача для минификации HTML
function minifyHtml() {
  return gulp
    .src(paths.html.src)
    .pipe(plumber()) // Предотвращение остановки на ошибке
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(server.stream());
}

// Задача для оптимизации изображений
function optimizeImages() {
  return gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(
      imagemin(/* [
        mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ] */)
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(server.stream());
}

// Наблюдение за изменениями в файлах
function watchFiles() {
  gulp.watch(paths.html.src, minifyHtml);
  gulp.watch(paths.images.src, optimizeImages);
}

// Задача для запуска сервера
function serve(done) {
  server.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
  done();
}

// Экспорт задач
const build = gulp.series(gulp.parallel(minifyHtml, optimizeImages));
const watch = gulp.parallel(watchFiles, serve);

export default gulp.series(build, watch);
