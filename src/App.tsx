import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { MainPage } from './pages/MainPage';
import { FunnelPage } from './pages/FunnelPage';
import { LoadingPage } from './pages/LoadingPage';
import { ResultPage } from './pages/ResultPage';

const router = createBrowserRouter([
  {
    element: <PageLayout />,
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
        element: (
          <ResultPage
            menuName="냉면"
            menuDescription="오늘은 시원하게\n새콤한 냉면"
            onRetry={() => console.log('다시하기')}
            onFindRestaurant={() => console.log('식당 찾아보기')}
          />
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
