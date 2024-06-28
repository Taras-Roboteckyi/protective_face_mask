//Створюємо функцію, щоб отримати файли і перенести файли по заданому шляху

export const copy = () => {
  return app.gulp
    .src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files));
};
