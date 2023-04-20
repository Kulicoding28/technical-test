import axios from "axios";
import { BASE_URL } from "./config";

export const getAllTodos = async (activityGroupId) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/todo-items?activity_group_id=${activityGroupId}`,
    });

    return res.data;
  } catch (error) {
    console.log("error getAllTodos", error);
    return error;
  }
};

export const getTodoById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}/todo-items/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log("error getTodoById", error);
    return error;
  }
};

export const createNewTodo = async ({ activity_group_id, title, priority }) => {
  try {
    const res = await axios({
      method: "post",
      url: `${BASE_URL}/todo-items`,
      data: { activity_group_id, title, priority },
    });
    return res.data;
  } catch (error) {
    console.log("error createNewTodo", error);
    return error;
  }
};

export const updateTodoById = async ({ id, ...restValue }) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${BASE_URL}/todo-items/${id}`,
      data: { ...restValue },
    });

    return res.data;
  } catch (error) {
    console.log("error updateTodoById", error);
    return error;
  }
};

export const deleteTodoById = async (id) => {
  try {
    await axios({
      method: "delete",
      url: `${BASE_URL}/todo-items/${id}`,
    });

    return true;
  } catch (error) {
    console.log("error deleteTodoById", error);
    return error;
  }
};
