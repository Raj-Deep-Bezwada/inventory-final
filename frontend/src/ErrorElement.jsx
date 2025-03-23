import React from 'react'
import { useRouteError } from 'react-router-dom'
function ErrorElement() {
    let err = useRouteError();
  return (
    <div className='text-center'>
        <h1 className='text-danger'>status: {err.status}</h1>
        <h3>{err.data}</h3>
    </div>
  )
}
export default ErrorElement