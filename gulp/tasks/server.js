import { notify } from "browser-sync";
import browserSync from "browser-sync";

// Иніціалізація BrowserSync
const server = browserSync.create();

export const serve = (done) => {
  server.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
  done();
};
