import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { MainPage } from './pages/MainPage';
import { FunnelPage } from './pages/FunnelPage';
import { LoadingPage } from './pages/LoadingPage';
import { ResultPage } from './pages/ResultPage';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/question',
        element: <FunnelPage />,
      },
      {
        path: '/loading',
        element: <LoadingPage />,
      },
      {
        path: '/result',
        element: <ResultPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
