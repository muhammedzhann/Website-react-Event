import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from "./routes/routes";  
import "./App.css";

const router = createBrowserRouter(routes, {
  basename: "/Website-react-Event",
});

function App() {
  return (
    <>
      <RouterProvider router={router} /> 
    </>
  );
}

export default App;
