import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import { store } from "./redux/store";
import Register from "./pages/Auth/Register";
import Layout from "./components/Common/Layout";
import AddProductForm from "./pages/Products/AddProduct";
import RecordsList from "./pages/Products/RecordsList";

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
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/urun-ekle"
            element={
              <Layout>
                <AddProductForm />
              </Layout>
            }
          />
          <Route
            path="/kayitlar"
            element={
              <Layout>
                <RecordsList />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
