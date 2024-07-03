//Основний модуль
import gulp from "gulp";

//Імпорт шляхів
import { path } from "./gulp/config/path.js";

//Імпорт загальних плагінів
import { plugins } from "./gulp/config/plugins.js";

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
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";

//Спостережувальна функція за змінами в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss); //1 параметр - Вказуєм шлях за яким потрібно дивитися і другий параметр - дії які потрібно виконати
}

//Основні задачі
const mainTasks = gulp.parallel(copy, html, scss);

//Побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

//Виконання сценарію по замовчуванню
gulp.task("default", dev);
