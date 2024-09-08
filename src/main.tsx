import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import './index.css';

import koKR from 'antd/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { BrowserRouter } from 'react-router-dom';

dayjs.locale('ko');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={koKR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
