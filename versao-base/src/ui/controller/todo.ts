import { todoRepository } from "@ui/repository/todo";

interface todoControllerGetParams {
  page: number;
}

async function get(params: todoControllerGetParams) {
  // Fazer a lógica de pegar os dados
  return todoRepository.get({ page: params.page, limit: 2 });
}

export const todoController = {
  get,
};

// CAMADA CONTROLLER BUSCA A INFORMAÇÃO DO REPOSITORY DE MULTIPLOS JEITOS
