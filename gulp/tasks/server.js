import { notify } from "browser-sync";
import browserSync from "browser-sync";

// Иніціалізація BrowserSync
//const server = browserSync.create();

export const serve = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`,
      /* baseDir: "dist", */
    },
    notify: false,
    port: 3000,
  });
  done();
};
