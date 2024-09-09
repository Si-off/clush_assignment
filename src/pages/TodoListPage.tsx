import { useRef } from 'react';
import styled from 'styled-components';
import { Divider, FloatButton, Tooltip } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import useTodoStore from '../store/useTodoStore';
import TodoItem from '../components/TodoItem';
import { CreateTodoModal } from '../components/modal';
import { ModalImperativeHandle } from '../components/modal/CreateTodoModal';

const TodoListPage = () => {
  const { todoList } = useTodoStore();
  const modalRef = useRef<ModalImperativeHandle>(null);

  const handleOpenModal = () => {
    if (modalRef.current) modalRef.current.openModal();
  };

  return (
    <S.Content>
      {/** 일정 추가 모달 */}
      <CreateTodoModal ref={modalRef} />

      {/** 일정추가 버튼 */}
      {todoList.size === 0 ? (
        <Tooltip title='일정 추가' zIndex={1}>
          <S.CreateButton onClick={handleOpenModal}>
            <PlusOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />
          </S.CreateButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title='일정 추가'>
            <FloatButton type='primary' icon={<PlusOutlined />} onClick={handleOpenModal} />
          </Tooltip>
          {/** 일정 리스트 */}
          <S.Container>
            {Array.from(todoList, ([yearMonth, todos]) => (
              <div key={yearMonth}>
                <Divider orientation='left' style={{ fontSize: '16px', fontWeight: 700 }}>
                  {yearMonth}
                </Divider>
                <S.Ul>
                  {todos.map((todo) => (
                    <li key={todo.id}>
                      <TodoItem {...todo} />
                    </li>
                  ))}
                </S.Ul>
              </div>
            ))}
          </S.Container>
        </>
      )}
    </S.Content>
  );
};

export default TodoListPage;

const S = {
  Content: styled(Content)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background-color: white;
    padding: 24px;
    overflow-y: auto;
  `,
  CreateButton: styled.button`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
  `,
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  `,
  Ul: styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  `,
};
