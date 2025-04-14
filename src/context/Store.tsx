import React from 'react';
import { Todo } from '../types/Todo';

type Filter =
  | { type: 'search'; payload: string }
  | { type: 'status'; payload: 'all' | 'active' | 'completed' };

type Props = {
  children?: React.ReactNode;
};

interface State {
  todos: Todo[];
}

function reducer(state: State, filter: Filter) {
  switch (filter.type) {
    case 'search':
      return {
        ...state,
        todos: state.todos.filter(todo =>
          todo.title
            .toLocaleUpperCase()
            .includes(filter.payload.trim().toLocaleUpperCase()),
        ),
      };

    case 'status':
      if (filter.payload === 'all') {
        return { ...state };
      }

      return {
        ...state,
        todos: state.todos.filter(todo =>
          filter.payload === 'active' ? !todo.completed : todo.completed,
        ),
      };

    default:
      return { ...state };
  }
}

const initialState: State = {
  todos: [],
};

export const StateContext = React.createContext<State>(initialState);

export const StateProvider: React.FC<Props> = ({ children }) => {
  return (
    <StateContext.Provider value={initialState}>
      {children}
    </StateContext.Provider>
  );
};
