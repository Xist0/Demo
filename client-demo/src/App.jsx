import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import Reg from './components/Reg'
import Log from './components/auth'
import { useSelector } from 'react-redux'
import MainPage from './MainPage'
import PersonalAccount from './PersonalAccount'
import BookDetals from './BookDetals'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Reg />
  },
  {
    path: '/auth',
    element: <Log />
  },
  ,
  {
    path: '/PersonalAccount',
    element: <Navigate to="/auth" />
  },
  {
    path: '/book/:id',
    element: <BookDetals/>
  }
])

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Navigate to="/" />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  },
  {
    path: '/PersonalAccount',
    element: <PersonalAccount />
  },
  {
    path: '/book/:id',
    element: <BookDetals/>
  }
])

const authRouterAdmin = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/reg',
    element: <Navigate to="/" />
  },
  {
    path: '/auth',
    element: <Navigate to="/" />
  },
  {
    path: 'admin',
    element: <>admin</>
  },
  {
    path: '/PersonalAccount',
    element: <PersonalAccount />
  },
  {
    path: '/book/:id',
    element: <BookDetals/>
  }
])

function App() {

  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)

  console.log(token);


  return (
    token ? role === "ADMIN" ? <RouterProvider router={authRouterAdmin} /> : <RouterProvider router={authRouterAdmin} /> :
      <RouterProvider router={router} />
  )
}

export default App