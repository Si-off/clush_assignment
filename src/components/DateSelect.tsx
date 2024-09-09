import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Select as AntdSelect } from 'antd';
import { DefaultOptionType } from 'antd/es/cascader';
import dayjs from 'dayjs';

type Unit = 'year' | 'month';

interface Props {
  type: Unit;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const DateSelect = ({ type, defaultValue, value, onChange }: Props) => {
  const createSelectOptions = (unit: Unit): DefaultOptionType[] => {
    const options: DefaultOptionType[] = [];

    switch (unit) {
      case 'year': {
        const now = dayjs();
        const start = now.get('year') - 10;
        const end = now.get('year') + 10;

        for (let i = start; i <= end; i++) {
          options.push({ value: i, label: i });
        }
        break;
      }
      case 'month': {
        for (let i = 0; i < 12; i++) {
          options.push({ value: i, label: i < 9 ? `0${i + 1}` : i + 1 });
        }
        break;
      }
      default:
        break;
    }
    return options;
  };

  //** variables */
  const options = useMemo(() => createSelectOptions(type), [type]);

  //** states */
  const [selected, setSelected] = useState(options[0].value);

  //** handlers */
  const handleChange = (value: unknown) => {
    if (typeof value !== 'number') return;

    if (onChange) {
      onChange(value);
    } else {
      setSelected(value);
    }
  };

  return (
    <Select
      options={options}
      defaultValue={defaultValue ? defaultValue : selected}
      value={value ? value : selected}
      variant='borderless'
      onChange={handleChange}
      suffixIcon={null}
    />
  );
};

export default DateSelect;

const Select = styled(AntdSelect)`
  width: fit-content;
  height: fit-content;

  & .ant-select-selection-item {
    font-size: 36px;
    font-weight: 900;
  }
`;
