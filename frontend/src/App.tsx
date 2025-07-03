import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Auth/Register";
import Layout from "./components/Common/Layout";
import AddProductForm from "./pages/Products/AddProduct";
import RecordsList from "./pages/Products/RecordsList";
import CustomerList from "./pages/Customer/CustomerList";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
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
          <Route
            path="/musteriler"
            element={
              <Layout>
                <CustomerList />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
