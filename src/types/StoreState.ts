import { Todo } from './Todo';

export enum TodoFilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface StoreState {
  todos: Todo[];
  allTodos: Todo[];
  filter: SearchState;
}

export interface SearchState {
  search: string;
  status: TodoFilterStatus;
}

export interface SearchFilter {
  type: 'search';
  payload: SearchState;
}

export interface InitFilter {
  type: 'init';
  payload: Todo[];
}

export type Filter = SearchFilter | InitFilter;
