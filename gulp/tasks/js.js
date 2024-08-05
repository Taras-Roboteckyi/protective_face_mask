import webpack from "webpack-stream";

/* const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename"); */

import concat from "gulp-concat";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import connect from "gulp-connect"; // Додаємо для перезавантаження

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: true })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "app.min.js",
        }, //Файл результату
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};

//return app.gulp
//.src("./src/js/**/*.js") // Шлях до ваших JS-файлів
//.pipe(concat("all.js")) // Об'єднання всіх JS-файлів в один
//.on("end", () => console.log("Files concatenated"))
//.pipe(app.gulp.dest("dist/js")) // Збереження об'єднаного файлу
//.on("end", () => console.log("File saved to dist/js"))
// .pipe(rename("all.min.js")) // Перейменування для мінімізованого файлу
// .on("end", () => console.log("File renamed to all.min.js"))
// .pipe(uglify()) // Мінімізація JS-файлів
// .on("end", () => console.log("File minified"))
// .pipe(app.gulp.dest("dist/js")) // Збереження мінімізованого файлу
// .on("end", () => console.log("Minified file saved to dist/js"))
// .pipe(connect.reload()); // Перезавантаження браузера
