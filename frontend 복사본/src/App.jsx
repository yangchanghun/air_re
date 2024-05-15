import './App.css';
import { routers } from './router';
import { Layout } from './layouts/Layout';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <RouterProvider router={routers} />
    </Layout>
  );
}

export default App;
