//Отримуємо імя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
  }, // Папка з результатом програми
  src: {
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`, //** - Провіряємо всі вкладені файли в папці files. *.* - Провіряємо усі файли з любим розширенням
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
  }, //Дивиться за файлами з цього шляху
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
