import { Layout } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SideNav } from './components';
import { CalendarPage, TodoListPage } from './pages';

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        <Route path='/' element={<Navigate to='/calendar' />} />
        <Route element={<SideNav />}>
          {/** 달력 */}
          <Route path='/calendar' element={<CalendarPage />} />

          {/** 할일 */}
          <Route path='/todos' element={<TodoListPage />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
