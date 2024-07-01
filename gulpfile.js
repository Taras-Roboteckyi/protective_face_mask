//Основний модуль
import gulp from "gulp";

//Імпорт шляхів
import { path } from "./gulp/config/path.js";

//Передаєм значення в глобальну змінну
global.app = {
  path: path,
  gulp: gulp,
};

//Імпорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";

//Спостережувальна функція за змінами в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html); //1 параметр - Вказуєм шлях за яким потрібно дивитися і другий параметр - дії які потрібно виконати
}

const mainTasks = gulp.parallel(copy, html);

//Побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, watcher);

//Виконання сценарію по замовчуванню
gulp.task("default", dev);
