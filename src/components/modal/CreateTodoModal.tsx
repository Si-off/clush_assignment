import { Form, Modal, Input, DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { forwardRef, useImperativeHandle, useState } from 'react';
import useTodoStore from '../../store/useTodoStore';
import TextArea from 'antd/es/input/TextArea';

type FormData = { title: string; content: string; date: Dayjs };

export interface ModalImperativeHandle {
  openModal: () => void;
  closeModal: () => void;
}

const CreateTodoModal = forwardRef((_, modalRef) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { addTodo } = useTodoStore();

  useImperativeHandle(modalRef, () => ({
    openModal: () => {
      setIsModalOpen(true);
    },
    closeModal: () => {
      setIsModalOpen(false);
    },
  }));

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
  );
});

export default CreateTodoModal;
