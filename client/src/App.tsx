import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 네트워크 트래픽과 리소스 사용을 줄일 수 있음.
const RegisterCity = lazy(
  () => import('./pages/admin/RegisterCity/RegisterCity')
);

const Home = lazy(() => import('./pages/home/Home'));

const RegisterCountry = lazy(
  () => import('@/pages/admin/RegisterCountry/RegisterCountry')
);

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
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
