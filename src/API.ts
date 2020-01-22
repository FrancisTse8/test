/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateNewTodoInput = {
  userId: string,
  name: string,
  description?: string | null,
};

export type ModelNewTodoConditionInput = {
  description?: ModelStringInput | null,
  and?: Array< ModelNewTodoConditionInput | null > | null,
  or?: Array< ModelNewTodoConditionInput | null > | null,
  not?: ModelNewTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateNewTodoInput = {
  userId: string,
  name: string,
  description?: string | null,
};

export type DeleteNewTodoInput = {
  userId: string,
  name: string,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelNewTodoFilterInput = {
  userId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelNewTodoFilterInput | null > | null,
  or?: Array< ModelNewTodoFilterInput | null > | null,
  not?: ModelNewTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateNewTodoMutationVariables = {
  input: CreateNewTodoInput,
  condition?: ModelNewTodoConditionInput | null,
};

export type CreateNewTodoMutation = {
  createNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type UpdateNewTodoMutationVariables = {
  input: UpdateNewTodoInput,
  condition?: ModelNewTodoConditionInput | null,
};

export type UpdateNewTodoMutation = {
  updateNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type DeleteNewTodoMutationVariables = {
  input: DeleteNewTodoInput,
  condition?: ModelNewTodoConditionInput | null,
};

export type DeleteNewTodoMutation = {
  deleteNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type GetNewTodoQueryVariables = {
  userId: string,
  name: string,
};

export type GetNewTodoQuery = {
  getNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type ListNewTodosQueryVariables = {
  userId?: string | null,
  name?: ModelStringKeyConditionInput | null,
  filter?: ModelNewTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListNewTodosQuery = {
  listNewTodos:  {
    __typename: "ModelNewTodoConnection",
    items:  Array< {
      __typename: "NewTodo",
      userId: string,
      name: string,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateNewTodoSubscription = {
  onCreateNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnUpdateNewTodoSubscription = {
  onUpdateNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnDeleteNewTodoSubscription = {
  onDeleteNewTodo:  {
    __typename: "NewTodo",
    userId: string,
    name: string,
    description: string | null,
  } | null,
};
