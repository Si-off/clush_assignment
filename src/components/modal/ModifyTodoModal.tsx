import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Form, Modal, Input, DatePicker, Checkbox, Button } from 'antd';
import { Dayjs } from 'dayjs';
import TextArea from 'antd/es/input/TextArea';
import useTodoStore, { Todo } from '../../store/useTodoStore';

type FormData = { title: string; content: string; date: Dayjs; isComplete: boolean };

interface Props {
  data: Todo | undefined;
}

const ModifyTodoModal = forwardRef(({ data }: Props, modalRef) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { modifyTodo, removeTodo } = useTodoStore();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        title: data.title,
        content: data.content,
        date: data.date,
        isComplete: data.isComplete,
      });
    }
  }, [data, form]);

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
        const { title, content, date, isComplete } = values;
        if (!data) return;

        modifyTodo({ id: data.id, title, content, date, isComplete });
        form.resetFields();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    if (!data) return;
    removeTodo(data?.id);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
      zIndex={10}
      title='일정 수정'>
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
        <Form.Item label='완료' name='isComplete' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
      </Form>
      <Button type='primary' onClick={handleDelete} danger>
        삭제
      </Button>
    </Modal>
  );
});

export default ModifyTodoModal;
