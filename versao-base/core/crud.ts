/* eslint-disable no-console */
import fs from "fs"; //ES6
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

export function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [
    //Lendo os todos já existente e depois grandando os proximos
    ...read(),
    todo,
  ];

  //salvar o content no sistema
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );

  return todo;
}

export function read(): Array<Todo> {
  //Lendo o content no sistema
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.todos) {
    return [];
  }

  return db.todos;
}

export function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;

  //Pegando todas as TODOS(array) e Lendo elas
  const todos = read();

  //Percorrendo o array de TOODS
  todos.forEach((currentTodo) => {
    //Compara se o id recebido pela função é o mesmo id do Todo para atualização
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      //Object.assign recebe o objeto alvo e muda o valor do content
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );

  if (!updatedTodo) {
    throw new Error("Please, provide another ID!");
  }

  return updatedTodo;
}

export function updateContentByid(id: UUID, content: string): Todo {
  return update(id, {
    content,
  });
}

export function deleteById(id: UUID) {
  //Pegando todas as TODOS(array) e Lendo elas
  const todos = read();

  const todosWithoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }

    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos: todosWithoutOne,
      },
      null,
      2
    )
  );
}

export function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//[SIMULATION]
// CLEAR_DB();
// create("Primeira TODO");
// const secondTodo = create("Segunda TODO");

// deleteById(secondTodo.id);

// const thirdTodo = create("Atualizada!!!");
// update(terceiraTodo.id, {
//   content: "Atualizado!",
//   done: true,
// })

// updateContentByid(thirdTodo.id, "Atualizado!!!");

// const todos = read();
// console.log(todos);
// console.log(todos.length);
