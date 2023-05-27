//Algoritmo de Paginação

const page = 100;
const limit = 4; //Quantos itens por exibição

const ALL_TODOS = [
  {
    content: "Primeiro Todo",
  },
  {
    content: "Segundo Todo",
  },
  {
    content: "Terceiro Todo",
  },
  {
    content: "Quarto Todo",
  },
  {
    content: "Quinto Todo",
  },
  {
    content: "Sexto Todo",
  },
  {
    content: "Sétimo Todo",
  },
  {
    content: "Oitavo Todo",
  },
];

const startIndex = (page - 1) * limit;
// console.log(startIndex);

const endIndex = page * limit;
// console.log(endIndex);

const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
// console.log(paginatedTodos);

const totalPages = Math.ceil(ALL_TODOS.length / limit);
// console.log(totalPages);
