import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
import { Calendar } from '../components';
import { useRef } from 'react';
import { CreateTodoModal } from '../components/modal';
import { ModalImperativeHandle } from '../components/modal/CreateTodoModal';
import { Tooltip, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CalendarPage = () => {
  const modalRef = useRef<ModalImperativeHandle>(null);

  const handleOpenModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  return (
    <S.Content>
      {/** 일정 추가 모달 */}
      <CreateTodoModal ref={modalRef} />

      <Tooltip title='일정 추가'>
        <FloatButton type='primary' icon={<PlusOutlined />} onClick={handleOpenModal} />
      </Tooltip>

      <Calendar />
    </S.Content>
  );
};

export default CalendarPage;

const S = {
  Content: styled(Content)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    background-color: white;
    padding: 0px 24px;
  `,
};
