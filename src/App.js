import './app.scss';
import { Login} from './auth/Login';
import { Register } from './auth/Register';
import { Bookslot } from './bookslot/Bookslot';
import { Home } from './home/Home';
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import { Navbar } from './home/Navbar';
import { Addcenter } from './addcenter/Addcenter';


function App() {

  const Layout=()=>{
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );
  }

  const router=createBrowserRouter([{
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/bookslot',
        element:<Bookslot/>
      },
      {
        path:'/addcenter',
        element:<Addcenter/>
      }
    ]
  }])

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
