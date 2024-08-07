import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider, Outlet, redirect} from "react-router-dom"
import Login from './pages/login.jsx'
import Register from './pages/registerPage.jsx'
import NavBar from './components/NavBar.jsx'
import Reminders from './pages/Reminders.jsx'
import Medicine from './pages/MedicinePage.jsx'


const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        return redirect('/reminders');
      }
      return null;
    },
  },
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <Outlet />
      </>
    ),
    loader: () => {
      const token = localStorage.getItem('access_token');
      if (!token) return redirect('/login');
      return null;
    },
    children: [
      {
        index: true,
        element: <Reminders />,
      },
      {
        path: '/reminders',
        element: <Reminders />,
      },
      {
        path: '/reminders/:reminderId/medicine',
        element: <Medicine />,
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
