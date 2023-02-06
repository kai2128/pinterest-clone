import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './components/Login'
import Home from './container/Home'
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="/*" element={<Home></Home>}></Route>
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
