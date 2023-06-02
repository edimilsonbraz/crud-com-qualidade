const BASE_URL = "http://localhost:3000";
describe("/ - Todos feed", () => {
  it("whem load, renders the page", () => {
    cy.visit(BASE_URL);
  });
  it.only("when create a new todo, it must appears in the screen", () => {
    //0 - Interceptações/Interceptação
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "027ef3dc-c30a-4d19-a6d9-9e8a337b70c8",
            date: "2023-06-01T17:43:06.547Z",
            content: "Teste todo com cypress",
            done: false,
          },
        },
      });
    });
    //1 - Abrir a página
    cy.visit(BASE_URL);
    //2 - Selecionar o input de criar nova todo
    const $inputAddTodo = cy.get("input[name='add-todo']");
    //3 - Digitar no input de criar nova todo
    $inputAddTodo.type("Teste todo com cypress");
    //4 - Clicar no botão
    const $btnAddTodo = cy.get("[aria-label='Adicionar novo item']");
    $btnAddTodo.click();
    //5 - Checar se a página surgiu um novo elemento
    cy.contains("Teste todo com cypress");
  });
});
