import { useState } from 'react';
import { Button, DatePicker, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dayjs } from 'dayjs';
import { Todo } from '../store/useTodoStore';

type FormData = { title: string; content: string; date: Dayjs };

interface Props {
  data?: Todo;
  isComplate?: boolean;
}

const TodoBadge = ({ isComplate, data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
        console.log(title, content, date);
        form.resetFields();
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        zIndex={10}
        title='일정 추가'>
        <Form form={form} layout='vertical' autoComplete='off'>
          <Form.Item label='제목' name='title' rules={[{ required: true }]}>
            <Input defaultValue={data?.title} placeholder='제목을 입력해주세요.' />
          </Form.Item>
          <Form.Item label='내용' name='content'>
            <TextArea
              defaultValue={data?.content}
              placeholder='내용을 입력해주세요.'
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item label='날짜' name='date' rules={[{ required: true }]}>
            <DatePicker defaultValue={data?.date} />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        type='text'
        onClick={handleOpen}
        title={data?.content}
        style={{ padding: '4px', backgroundColor: isComplate ? '#d9f7be' : '#fafafa' }}>
        {data?.content}
      </Button>
    </>
  );
};

export default TodoBadge;
