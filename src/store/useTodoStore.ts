import { Dayjs } from 'dayjs';
import { create } from 'zustand';

export type Todo = {
  id: string;
  title: string;
  content: string;
  date: Dayjs;
  isComplete: boolean;
};

interface TodoStore {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
}

/** 초기값 */
const INIT_DATA: Pick<TodoStore, 'todoList'> = {
  todoList: [],
};

const useTodoStore = create<TodoStore>((set) => ({
  todoList: INIT_DATA.todoList,
  addTodo: (todo) => set((state) => ({ todoList: [...state.todoList, todo] })),
  removeTodo: (id) =>
    set((state) => {
      const newTodoList = state.todoList.filter((todo) => todo.id !== id);
      return { todoList: newTodoList };
    }),
}));

export default useTodoStore;
