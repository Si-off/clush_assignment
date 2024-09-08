import { Todo } from '../store/useTodoStore';

type Props = Todo;

const TodoItem = (props: Props) => {
  return (
    <div>
      <p>{props.title}</p>
      <p>{props.content}</p>
      <p>{props.date.format('YYYY-MM-DD')}</p>
      <p>{props.isComplete}</p>
    </div>
  );
};

export default TodoItem;
