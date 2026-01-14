import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { MainPage } from './pages/MainPage';
import { FunnelPage } from './pages/FunnelPage';
import { LoadingPage } from './pages/LoadingPage';
import { ResultPage } from './pages/ResultPage';
import { ErrorPage } from './pages/ErrorPage';
import { FunnelGuard } from './components/funnel/FunnelGuard';

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
        path: '/funnel',
        element: <FunnelPage />,
      },
      {
        path: '/loading',
        element: (
          <FunnelGuard>
            <LoadingPage />
          </FunnelGuard>
        ),
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
