import { notify } from "browser-sync";

export const server = (done) => {
  app.plugins.browserSync.init({
    server: {
      baseDir: `${app.path.build.html}`, //Базова папка, з якої запускаєм файли
    },
    notify: false,
    port: 3000,
  });
};
