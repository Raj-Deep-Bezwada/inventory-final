
import './App.css'
import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'
import About from './components/about/About'
import UserProfile from './components/user-profile/UserProfile'
import ErrorElement from './ErrorElement'

function App() {
  let browserRouter = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      errorElement : <ErrorElement />,
      children : [
        { 
          path: '',
          element:<Home />
        }
        ,{ 
          path: 'login',
          element:<Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        { 
          path: 'aboutus',
          element:<About />
        },
        {
          path: 'user-profile',
          element: <UserProfile />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={(browserRouter)}>

    </RouterProvider>
  )
}

export default App