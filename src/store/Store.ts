/* eslint-disable @typescript-eslint/indent */
import { Filter, StoreState } from '../types/StoreState';
import { Todo } from '../types/Todo';

function applyFilters(state: StoreState): Todo[] {
  return state.allTodos
    .filter(todo => {
      return todo.title
        .toLocaleUpperCase()
        .includes(state.filter.search.trim().toLocaleUpperCase());
    })
    .filter(todo => {
      if (state.filter.status === 'active') {
        return !todo.completed;
      }

      if (state.filter.status === 'completed') {
        return todo.completed;
      }

      return true;
    });
}

export function reducer(state: StoreState, action: Filter): StoreState {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
        todos: applyFilters({
          ...state,
          filter: {
            ...state.filter,
            ...action.payload,
          },
        }),
      };

    case 'init':
      return {
        ...state,
        allTodos: action.payload,
        todos: action.payload,
      };

    default:
      return { ...state };
  }
}
