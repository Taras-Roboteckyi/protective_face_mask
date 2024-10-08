//Основний модуль
import gulp from "gulp";

//Імпорт шляхів
import { path } from "./gulp/config/path.js";

//Імпорт загальних плагінів
import { plugins } from "./gulp/config/plugins.js";
import browserSync from "browser-sync";
//Передаєм значення в глобальну змінну
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//Імпорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { serve } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

//Спостережувальна функція за змінами в файлах
function watcher() {
  gulp.watch(path.watch.files, copy).on("change", browserSync.reload);
  gulp.watch(path.watch.html, html).on("change", browserSync.reload);
  gulp.watch(path.watch.scss, scss).on("change", browserSync.reload);
  gulp.watch(path.watch.js, js).on("change", browserSync.reload);
  gulp.watch(path.watch.images, images).on("change", browserSync.reload); //1 параметр - Вказуєм шлях за яким потрібно дивитися і другий параметр - дії які потрібно виконати
}

//Послідовна обробка шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//Основні задачі
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

//Побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, serve));

//Виконання сценарію по замовчуванню
gulp.task("default", dev);

// Экспорт задач
//const build = gulp.series(gulp.parallel(minifyHtml, optimizeImages));
/* const watch = gulp.parallel(watcher, serve);

export default gulp.series(build, watch); */
