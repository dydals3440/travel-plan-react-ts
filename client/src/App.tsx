import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './components/common/Loading';

// 네트워크 트래픽과 리소스 사용을 줄일 수 있음.
const RegisterCity = lazy(
  () => import('./pages/admin/RegisterCity/RegisterCity')
);

const Home = lazy(() => import('./pages/home/Home'));

function App() {
  return (
    <BrowserRouter>
      {/* 라우트 그룹을 관리하는 Routes */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='admin'>
            <Route path='register-city' element={<RegisterCity />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
