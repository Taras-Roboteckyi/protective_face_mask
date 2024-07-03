import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //Зжимання СSS файлами
import webpcss from "gulp-webpcss"; //Вивід WEBP картинок
import autoprefixer from "gulp-autoprefixer"; //Додавання вендорних префіксів
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Групування медіа запитів

//Робимо виклик з плагіна з передачею компілятора
const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: true })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, "../img/"))
      .pipe(
        sass({
          outputStyle: "expanded",
        })
      )
      .pipe(groupCssMediaQueries())
      .pipe(
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
      .pipe(
        autoprefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
      //Розкоментувати нижній рядок якщо потрібно не сжатий дубль файла стилів
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(cleanCss())
      .pipe(
        rename({
          extname: ".min.css",
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
