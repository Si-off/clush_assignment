import { Layout } from 'antd';
import styled from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SideNav, Calendar } from './components';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path='/' element={<Navigate to='/calendar' />} />
        <Route element={<SideNav />}>
          {/** 달력 */}
          <Route
            path='/calendar'
            element={
              <Layout>
                <S.Content>
                  <Calendar />
                </S.Content>
              </Layout>
            }
          />

          {/** 할일 */}
          <Route
            path='/todo'
            element={
              <Layout>
                <S.Content>
                  <Calendar />
                </S.Content>
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;

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
