import { Card } from 'antd';
import { Todo } from '../store/useTodoStore';
import { useRef } from 'react';
import { ModalImperativeHandle } from './modal/CreateTodoModal';
import { ModifyTodoModal } from './modal';

type Props = Todo;

const TodoItem = (props: Props) => {
  const { id, title, content, date, isComplete } = props;
  const modalRef = useRef<ModalImperativeHandle>();

  const handleOpenModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  return (
    <>
      <ModifyTodoModal ref={modalRef} data={props} />
      <Card key={id} title={title} style={{ width: '300px' }} onClick={handleOpenModal} hoverable>
        <p>{content}</p>
        <p>{date.format('YYYY-MM-DD')}</p>
        <p>{isComplete}</p>
      </Card>
    </>
  );
};

export default TodoItem;
