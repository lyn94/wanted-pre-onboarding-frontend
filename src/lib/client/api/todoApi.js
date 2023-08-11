import clientApi from "./clientApi";

export const createTodo = async (data) => {
  return await clientApi({
    method: "post",
    url: "/todos",
    data,
  });
};

export const getTodos = async () => {
  return await clientApi({
    method: "get",
    url: "/todos",
  });
};

export const updateTodo = async ({ id, isCompleted, todo }) => {
  return await clientApi({
    method: "put",
    url: `/todos/${id}`,
    data: { isCompleted, todo },
  });
};

export const deleteTodo = async (id) => {
  return await clientApi({
    method: "delete",
    url: `/todos/${id}`,
  });
};
