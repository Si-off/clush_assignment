import { Card } from 'antd';
import { Todo } from '../store/useTodoStore';
import { useRef } from 'react';
import { ModalImperativeHandle } from './modal/CreateTodoModal';
import { ModifyTodoModal } from './modal';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

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
      <Card
        key={id}
        title={title}
        style={{ width: '300px' }}
        onClick={handleOpenModal}
        extra={
          isComplete ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : <CheckCircleOutlined />
        }
        hoverable>
        <p>{content}</p>
        <p>{date.format('YYYY-MM-DD')}</p>
        <p>{isComplete}</p>
      </Card>
    </>
  );
};

export default TodoItem;
