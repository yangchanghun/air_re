import './App.css';
import { routers } from './router';
import { Layout } from './layouts/Layout';
import { RouterProvider } from 'react-router-dom';
import { FlightInfoProvider } from './context/FlightInfoContext';

function App() {
  return (
    <FlightInfoProvider>
      <Layout>
        <RouterProvider router={routers} />
      </Layout>
    </FlightInfoProvider>
  );
}

export default App;
