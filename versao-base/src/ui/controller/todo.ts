import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
  page: number;
}

async function get(params: todoControllerGetParams) {
  // Fazer a lógica de pegar os dados
  return todoRepository.get({ page: params.page, limit: 2 });
}

interface TodoControllerCreateParams {
  content: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (todo: any) => void;
  onError: () => void;
}

function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
  //Se não tiver um conteúdo mostrar o erro na tela do usuário
  if (!content) {
    onError();
    return;
  }

  //Va vir do Repository
  const todo = {
    id: "12345",
    content,
    date: new Date(),
    done: false,
  };
  onSuccess(todo);
  // console.log("controller.content", content);
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
