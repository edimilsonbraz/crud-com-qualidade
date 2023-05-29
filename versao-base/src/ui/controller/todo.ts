import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
  page: number;
}

async function get(params: todoControllerGetParams) {
  // Fazer a lógica de pegar os dados
  return todoRepository.get({ page: params.page, limit: 2 });
}

function filterTodosByContent<Todo>(
  todos: Array<Todo & { content: string }>,
  search: string
): Array<Todo> {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLocaleLowerCase();
    const contentNormalized = todo.content.toLocaleLowerCase();
    return contentNormalized.includes(searchNormalized);
  });

  return homeTodos;
}

export const todoController = {
  get,
  filterTodosByContent,
};

// CAMADA CONTROLLER BUSCA A INFORMAÇÃO DO REPOSITORY DE MULTIPLOS JEITOS
