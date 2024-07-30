import webpack from "webpack-stream";

export const js = () => {
  /* return app.gulp
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
    .pipe(app.plugins.browserSync.stream()); */

  return app.gulp
    .src(app.path.src.js)
    .pipe(
      webpack({
        mode: "production",

        entry: {
          index: "./src/js/app.js",
        },

        output: {
          filename: "[name].bundle.js",
        },

        module: {
          rules: [
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
          ],
        },
      })
    )
    .pipe(app.gulp.dest("./dist/js"));
};
