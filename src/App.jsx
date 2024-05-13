import { useState } from 'react'
import Room from './assets/pages/Room'
import {BrowserRouter,RouterProvider,Router,Route,Routes,createBrowserRouter,createRoutesFromElements} from 'react-router-dom'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import PrivateRoutes from './components/PrivateRoutes'
import {AuthProvider} from '../src/utils/Usercontext'
function App() {
  const [count, setCount] = useState(0)
  // const router = createBrowserRouter(
  //   createRoutesFromElements(
      
  //       <Route>
  //           <Route path='/login' element={<Login/>}>
  //         </Route>
  //         <Route element={<PrivateRoutes/>}>
  //           <Route path='/' element={<Room/>}>
  //           </Route>
  //         </Route>
  //       </Route>

  //   )
  // )

  return (
    //  <AuthProvider>
    //   <RouterProvider router={router}>
    //   </RouterProvider>
    //   </AuthProvider>
    // 
    <BrowserRouter>
      <AuthProvider >

      
        <Routes>
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/register' element={<Register/>}>
          </Route>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Room/>}>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
