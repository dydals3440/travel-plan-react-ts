import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModalProvider from './components/common/ModalProvider';
import './index.css';
import './App.css';

import '@/utils/date';
import RegisterPlace from './pages/admin/RegisterPlace/RegisterPlace';

// 네트워크 트래픽과 리소스 사용을 줄일 수 있음.
const RegisterCity = lazy(
  () => import('./pages/admin/RegisterCity/RegisterCity')
);

const Home = lazy(() => import('./pages/home/Home'));

const RegisterCountry = lazy(
  () => import('@/pages/admin/RegisterCountry/RegisterCountry')
);

const PlanCity = lazy(() => import('@/pages/plan/City'));

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      {/* 라우트 그룹을 관리하는 Routes */}
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='admin'>
              <Route path='register-city' element={<RegisterCity />} />
              <Route path='register-country' element={<RegisterCountry />} />
              <Route path='register-place' element={<RegisterPlace />} />
            </Route>
            <Route path='/plan/:city' element={<PlanCity />} />
          </Routes>
        </Suspense>
        {/* 모달 */}
        <ModalProvider />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
