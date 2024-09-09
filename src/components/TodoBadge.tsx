import { useRef } from 'react';
import { Button } from 'antd';

import { Todo } from '../store/useTodoStore';
import ModifyTodoModal from './modal/ModifyTodoModal';
import { ModalImperativeHandle } from './modal/CreateTodoModal';

interface Props {
  data?: Todo;
  isComplete?: boolean;
}

const TodoBadge = ({ isComplete, data }: Props) => {
  const modalRef = useRef<ModalImperativeHandle>();

  const handleOpenModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  return (
    <>
      {/** 일정 수정 모달 */}
      <ModifyTodoModal ref={modalRef} data={data} />

      <Button
        type='text'
        onClick={handleOpenModal}
        title={data?.title}
        style={{ padding: '4px', backgroundColor: isComplete ? '#d9f7be' : '#fafafa' }}>
        {data?.title}
      </Button>
    </>
  );
};

export default TodoBadge;
