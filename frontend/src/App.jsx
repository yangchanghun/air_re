import './App.css';
import { routers } from './router';
import { Layout } from './layouts/Layout';
import { RouterProvider } from 'react-router-dom';
import { FlightInfoProvider } from './context/FlightInfoContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <FlightInfoProvider>
        <Layout>
          <RouterProvider router={routers} />
        </Layout>
      </FlightInfoProvider>
    </AuthProvider>
  );
}

export default App;
