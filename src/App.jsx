import React from 'react'
import "./App.css"
import Home from "./pages/Home"
import About from "./pages/About"
import Country from "./pages/Country"
import Contact from "./pages/Contact"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Applayout from './components/Layouts/Applayout'
import ErrorPage from './pages/ErrorPage'
import CountryDetail from './pages/CountryDetail'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Applayout/>,
    errorElement:<ErrorPage/>,
    children:[ {
    path:"/",
    element:<Home/>
  },
   {
    path:"/about",
    element:<About/>
  },
   {
    path:"/contact",
    element:<Contact/>
  },
   {
    path:"/country",
    element:<Country/>
  },
 {
    path:"/country/:id",
    element:<CountryDetail/>
  }]
  },
 ]
)
const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
