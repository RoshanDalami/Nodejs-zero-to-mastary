import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Home from './Pages/Home';
import Test from './Pages/Test';



const router = createBrowserRouter([
  {
    path : '/',
    element: <Home/>,

  },
  {
    path:'/test',
    element:<Test/>,
  },
  {
    path:'/test/:id',
    element:<Test/>,
  },
]);


const App =()=>{
return (
  <>
    <RouterProvider router={router}></RouterProvider>
  </>
)
}

export default App