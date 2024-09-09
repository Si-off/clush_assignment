import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { DatePicker, Divider, FloatButton, Form, Input, Modal, Tooltip } from 'antd';
import { Content } from 'antd/es/layout/layout';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import useTodoStore from '../store/useTodoStore';
import TodoItem from '../components/TodoItem';

type FormData = { title: string; content: string; date: Dayjs };

const TodoListPage = () => {
  //* states */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  //** stores */
  const { todoList, addTodo } = useTodoStore();

  //** handlers */
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values: FormData) => {
        const { title, content, date } = values;

        addTodo({ id: dayjs().format(), title, content, date, isComplete: false });
        form.resetFields();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.Content>
      {/** 일정 추가 모달 */}
      <Modal
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        zIndex={10}
        title='일정 추가'>
        <Form form={form} layout='vertical' autoComplete='off'>
          <Form.Item label='제목' name='title' rules={[{ required: true }]}>
            <Input placeholder='제목을 입력해주세요.' />
          </Form.Item>
          <Form.Item label='내용' name='content'>
            <TextArea placeholder='내용을 입력해주세요.' autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item label='날짜' name='date' rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

      {/** 일정추가 버튼 */}
      {todoList.size === 0 ? (
        <Tooltip title='일정 추가' zIndex={1}>
          <S.CreateButton onClick={handleOpen}>
            <PlusOutlined style={{ fontSize: '16px', color: '#8c8c8c' }} />
          </S.CreateButton>
        </Tooltip>
      ) : (
        <Tooltip title='일정 추가'>
          <FloatButton type='primary' icon={<PlusOutlined />} onClick={handleOpen} />
        </Tooltip>
      )}

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
