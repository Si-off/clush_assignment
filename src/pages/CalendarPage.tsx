import { Content } from 'antd/es/layout/layout';
import styled from 'styled-components';
import { Calendar } from '../components';

const CalendarPage = () => {
  return (
    <S.Content>
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
