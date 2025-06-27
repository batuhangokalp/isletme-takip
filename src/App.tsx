import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import { store } from './redux/store'
import Register from './pages/Auth/Register'

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const isLoggedIn = false // redux store'dan gerçek login durumunu alacağız sonra
  if (isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
