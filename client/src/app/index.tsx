import { useMemo } from 'react';
import RouterBuilder from './RouterBuilder'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
;

const App = () => {
  const routes = useMemo(() => RouterBuilder(), []);

  return <RouterProvider router={createBrowserRouter(routes)} />;
};


export default App
