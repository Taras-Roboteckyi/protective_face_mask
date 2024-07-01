import fileinclude from "gulp-file-include";

//Створюємо функцію, щоб отримати файли html і перенести файли по заданому шляху
export const html = () => {
  return app.gulp
    .src(app.path.src.html)
    .pipe(fileinclude())
    .pipe(app.gulp.dest(app.path.build.html));
};
