import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Menu, MenuProps } from 'antd';

import { CalendarOutlined, CheckSquareOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  { icon: <CalendarOutlined />, key: 'calendar', label: '달력' },
  { icon: <CheckSquareOutlined />, key: 'todos', label: '내 할일' },
];

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    navigate(key);
  };

  return (
    <>
      <S.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['calendar']}
          items={items}
          onSelect={({ key }) => handleSelect(key)}
        />
      </S.Sider>
      <Outlet />
    </>
  );
};

export default SideNav;

const S = {
  Sider: styled(Sider)`
    padding: 16px 0px;
  `,
};
