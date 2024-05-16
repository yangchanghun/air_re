import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { FlightInfoProvider } from './context/FlightInfoContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider, LoadingContext } from './context/LoadingContext';
import Loading from './pages/Loading';
import { useContext, useState, useEffect } from 'react';
import { routers } from './router'; // 라우터 데이터를 가져옵니다

const AppContent = () => {
  const { loading } = useContext(LoadingContext);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 로딩 페이지 본 적 있는지 확인
    const hasSeenLoadingPage = localStorage.getItem('hasSeenLoadingPage');

    if (hasSeenLoadingPage) {
      setIsInitialLoading(false);
    } else {
      if (!loading) {
        setTimeout(() => {
          setIsInitialLoading(false);
          localStorage.setItem('hasSeenLoadingPage', 'true'); // 로딩 페이지 본 적 있음으로 설정
        }, 1000); // 로딩 상태가 완료된 후 1초 대기
      }
    }
  }, [loading]);

  return isInitialLoading ? <Loading /> : <RouterProvider router={routers} />;
};

function App() {
  return (
    <AuthProvider>
      <FlightInfoProvider>
        <LoadingProvider>
          <Layout>
            <AppContent />
          </Layout>
        </LoadingProvider>
      </FlightInfoProvider>
    </AuthProvider>
  );
}

export default App;
