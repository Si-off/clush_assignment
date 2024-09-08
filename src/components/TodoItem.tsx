import { Card } from 'antd';
import { Todo } from '../store/useTodoStore';

type Props = Todo;

const TodoItem = ({ title, content, date, isComplete }: Props) => {
  return (
    <Card title={title} style={{ width: '300px' }} hoverable>
      <p>{content}</p>
      <p>{date.format('YYYY-MM-DD')}</p>
      <p>{isComplete}</p>
    </Card>
  );
};

export default TodoItem;
