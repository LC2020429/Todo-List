import axios from "axios";

const apiTodo = axios.create({
  baseURL: "http://127.0.0.1:3005/todo-api/to-do",
  timeout: 9000,
});

export const getTasks = async () => {
  try {
    return await apiTodo.get("/");
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const addTask = async (task) => {
  try {
    return await apiTodo.post("/add", task);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const deleteTask = async (id) => {
  try {
    return await apiTodo.delete(`/delete/${id}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const editTask = async (id, updatedTask) => {
  try {
    return await apiTodo.put(`/edit/${id}`, updatedTask);
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const findByImportance = async (importance) => {
  try {
    return await apiTodo.get(`/importance/${importance}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
};
