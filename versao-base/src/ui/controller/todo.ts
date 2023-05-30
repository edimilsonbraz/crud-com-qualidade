import { z as schema } from "zod";
import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";

interface todoControllerGetParams {
  page: number;
}

async function get(params: todoControllerGetParams) {
  // Fazer a lógica de pegar os dados
  return todoRepository.get({ page: params.page, limit: 2 });
}

interface TodoControllerCreateParams {
  content?: string;
  onSuccess: (todo: Todo) => void;
  onError: () => void;
}

function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
  //Se não tiver um conteúdo mostrar o erro na tela do usuário
  const parsedParams = schema.string().nonempty().safeParse(content);
  if (!parsedParams.success) {
    onError();
    return;
  }

  todoRepository
    .createByContent(parsedParams.data)
    .then((newTodo) => {
      onSuccess(newTodo);
    })
    .catch(() => {
      onError();
    });
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
  create,
  filterTodosByContent,
};

// CAMADA CONTROLLER BUSCA A INFORMAÇÃO DO REPOSITORY DE MULTIPLOS JEITOS
