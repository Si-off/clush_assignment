import { Calendar as AntdCalendar, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import DateSelect from './DateSelect';

const Calendar = () => {
  //** states */
  const [selected, setSelected] = useState<Dayjs>(dayjs());

  //** handlers */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      // up
      const newDate = selected.add(1, 'month').set('date', 1);
      setSelected(newDate);
    } else {
      // down
      const newDate = selected.subtract(1, 'month').set('date', 1);
      setSelected(newDate);
    }
  };

  return (
    <>
      <S.Header>
        <DateSelect
          type='year'
          defaultValue={selected.get('year')}
          value={selected.get('year')}
          onChange={(value) => setSelected(selected.set('year', value))}
        />
        <DateSelect
          type='month'
          defaultValue={selected.get('month')}
          value={selected.get('month')}
          onChange={(value) => setSelected(selected.set('month', value))}
        />
        <Button onClick={() => setSelected(dayjs())}>오늘</Button>
      </S.Header>
      <div onWheel={handleWheel}>
        <AntdCalendar
          defaultValue={selected}
          value={selected}
          headerRender={() => <></>}
          onChange={(date) => {
            setSelected(date);
          }}
          onSelect={(date) => {
            console.log(dayjs(date).format('YY-MM-DD'));
          }}
        />
      </div>
    </>
  );
};

export default Calendar;

const S = {
  Header: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
  `,
};
