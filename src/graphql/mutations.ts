// tslint:disable
// this is an auto generated file. This will be overwritten

export const createNewTodo = `mutation CreateNewTodo(
  $input: CreateNewTodoInput!
  $condition: ModelNewTodoConditionInput
) {
  createNewTodo(input: $input, condition: $condition) {
    userId
    name
    description
  }
}
`;
export const updateNewTodo = `mutation UpdateNewTodo(
  $input: UpdateNewTodoInput!
  $condition: ModelNewTodoConditionInput
) {
  updateNewTodo(input: $input, condition: $condition) {
    userId
    name
    description
  }
}
`;
export const deleteNewTodo = `mutation DeleteNewTodo(
  $input: DeleteNewTodoInput!
  $condition: ModelNewTodoConditionInput
) {
  deleteNewTodo(input: $input, condition: $condition) {
    userId
    name
    description
  }
}
`;
