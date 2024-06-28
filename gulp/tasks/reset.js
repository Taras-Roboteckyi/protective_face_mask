import { deleteAsync } from "del";

//Функція видаляє папку з результатом в dist/files
export const reset = () => {
  return deleteAsync(app.path.clean);
};
