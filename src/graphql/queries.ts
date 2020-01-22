// tslint:disable
// this is an auto generated file. This will be overwritten

export const getNewTodo = `query GetNewTodo($userId: ID!, $name: String!) {
  getNewTodo(userId: $userId, name: $name) {
    userId
    name
    description
  }
}
`;
export const listNewTodos = `query ListNewTodos(
  $userId: ID
  $name: ModelStringKeyConditionInput
  $filter: ModelNewTodoFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listNewTodos(
    userId: $userId
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      userId
      name
      description
    }
    nextToken
  }
}
`;
