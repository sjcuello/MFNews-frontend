import ErrorPage from './components/errorPage';
import Layout from './components/layout'
import Navbar from './components/navbar'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import TrashBin from './components/trashBin';
import News from './components/news';
import Article from './components/article';

const RootLayout = () => {
  return (
    <Layout>
      <Navbar />
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <News />,
      },
      {
        path: ':id',
        element: <Article />,
      },
      {
        path: '/trash-bin',
        element: <TrashBin />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
