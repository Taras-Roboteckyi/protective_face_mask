import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg"; // Створює можливість підключення картинок з розширенням webp
import versionNumber from "gulp-version-number"; //Дозволяє створювати нові версії при заливці на server
import htmlmin from "gulp-htmlmin";

//Створюємо функцію, щоб отримати файли html і перенести файли по заданому шляху
export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(fileInclude())
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    .pipe(webpHtmlNosvg())
    .pipe(
      versionNumber({
        value: "%DT%",
        append: {
          key: "_v",
          cover: 0,
          to: ["css", "js"],
        },
        output: {
          file: "gulp/version.json",
        },
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
