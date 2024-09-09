import { Calendar as AntdCalendar, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import DateSelect from './DateSelect';
import useTodoStore from '../store/useTodoStore';
import TodoBadge from './TodoBadge';

const Calendar = () => {
  //** states */
  const [selected, setSelected] = useState<Dayjs>(dayjs());

  //** stores */
  const { todoList } = useTodoStore();

  //** handlers */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    let newDate = selected;
    if (e.deltaY < 0) {
      // up
      newDate = newDate.subtract(1, 'month').set('date', 1);
    } else {
      // down
      newDate = newDate.add(1, 'month').set('date', 1);
    }
    setSelected(newDate);
  };

  const dateCellRender = (value: Dayjs) => {
    return (
      <S.CellList
        onWheel={(e) => {
          e.stopPropagation();
        }}>
        {todoList.get(selected.format('YYYY-MM'))?.map((todo) => {
          if (value.format('YYYY-MM-DD') !== todo.date.format('YYYY-MM-DD')) return;

          return (
            <li
              key={todo.id}
              style={{ opacity: value.month() !== todo.date.month() ? '40%' : undefined }}>
              <TodoBadge isComplete={todo.isComplete} data={todo} />
            </li>
          );
        })}
      </S.CellList>
    );
  };

  return (
    <>
      {/** 날짜 변경 헤더 */}
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

      {/** 달력 */}
      <div onWheel={handleWheel}>
        <AntdCalendar
          defaultValue={selected}
          value={selected}
          headerRender={() => <></>}
          onChange={(date) => {
            setSelected(date);
          }}
          cellRender={dateCellRender}
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
  CellList: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    cursor: auto;
    overflow-x: hidden;
  `,
};
