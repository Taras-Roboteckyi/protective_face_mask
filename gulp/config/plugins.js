import replace from "gulp-replace"; //Пошук і заміна
import plumber from "gulp-plumber"; //Обробка помилок
import notify from "gulp-notify"; //Повідомлення (підказки)
import browserSync from "browser-sync"; //Локальний сервер
import newer from "gulp-newer"; //Перевірка обновлення

//Ескпортуємо обєкт

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
};
