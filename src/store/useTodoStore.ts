import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

export type Todo = {
  id: string;
  title: string;
  content: string;
  date: Dayjs;
  isComplete: boolean;
};

interface TodoStore {
  todoList: Map<string, Todo[]>;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  modifyTodo: (updatedTodo: Partial<Todo> & Required<Pick<Todo, 'id'>>) => void;
}

/** 초기값 */
const INIT_DATA: Pick<TodoStore, 'todoList'> = {
  todoList: new Map([
    [
      '2024-09',
      [
        {
          id: '1',
          title: 'Buy groceries',
          content: 'Milk, Eggs, Bread',
          date: dayjs('2024-09-01'),
          isComplete: false,
        },
        {
          id: '2',
          title: 'Meeting with team',
          content: 'Discuss project updates',
          date: dayjs('2024-09-02'),
          isComplete: true,
        },
        {
          id: '02',
          title: 'Meeting with team',
          content: 'Discuss project updates',
          date: dayjs('2024-09-02'),
          isComplete: true,
        },
        {
          id: '002',
          title: 'Meeting with team',
          content: 'Discuss project updates',
          date: dayjs('2024-09-02'),
          isComplete: true,
        },
      ],
    ],
    [
      '2024-10',
      [
        {
          id: '3',
          title: 'Doctor appointment',
          content: 'Routine check-up',
          date: dayjs('2024-10-10'),
          isComplete: false,
        },
        {
          id: '4',
          title: 'Submit report',
          content: 'Monthly progress report',
          date: dayjs('2024-10-15'),
          isComplete: false,
        },
      ],
    ],
    [
      '2024-11',
      [
        {
          id: '6',
          title: 'Client presentation',
          content: 'Prepare slides and data',
          date: dayjs('2024-11-05'),
          isComplete: false,
        },
        {
          id: '7',
          title: 'Car service',
          content: 'Oil change and tire rotation',
          date: dayjs('2024-11-07'),
          isComplete: false,
        },
        {
          id: '8',
          title: 'Team dinner',
          content: 'Celebration for project success',
          date: dayjs('2024-11-15'),
          isComplete: true,
        },
      ],
    ],
    [
      '2024-12',
      [
        {
          id: '9',
          title: 'Holiday shopping',
          content: 'Buy gifts for family',
          date: dayjs('2024-12-10'),
          isComplete: false,
        },
        {
          id: '10',
          title: 'Year-end review',
          content: 'Evaluate personal and work goals',
          date: dayjs('2024-12-31'),
          isComplete: false,
        },
      ],
    ],
  ]),
};

const useTodoStore = create<TodoStore>((set) => ({
  todoList: INIT_DATA.todoList,

  addTodo: (todo) =>
    set((state) => {
      const yearMonth = todo.date.format('YYYY-MM');
      const currentTodos = state.todoList.get(yearMonth) || [];
      return {
        todoList: new Map(state.todoList).set(yearMonth, [...currentTodos, todo]),
      };
    }),

  removeTodo: (id) =>
    set((state) => {
      const newTodoList = new Map(state.todoList);
      newTodoList.forEach((todos, key) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        if (updatedTodos.length > 0) {
          newTodoList.set(key, updatedTodos);
        } else {
          newTodoList.delete(key);
        }
      });
      return { todoList: newTodoList };
    }),

  modifyTodo: (updatedTodo) =>
    set((state) => {
      const yearMonth = updatedTodo.date?.format('YYYY-MM') || '';
      const currentTodos = state.todoList.get(yearMonth) || [];
      const updatedTodos = currentTodos.map((todo) =>
        todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
      );

      return {
        todoList: new Map(state.todoList).set(yearMonth, updatedTodos),
      };
    }),
}));

export default useTodoStore;
