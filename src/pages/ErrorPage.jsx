import React from 'react'
import { NavLink, useRouteError } from 'react-router'

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error)
  return (
    <>
   <h1>Oops! Something went wrong</h1>
   {error && <p>{error?.data}</p>}
   <NavLink href="/"><button>Go Home</button></NavLink>
    </>
  )
}

export default ErrorPage
