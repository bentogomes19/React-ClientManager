import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ClientesList from "../pages/clientes/Index";
import ClienteForm from "../pages/clientes/Froms";
import Relatorios from "../pages/relatorios/Index";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/clientes" />} />

        <Route
          path="/clientes"
          element={
            <MainLayout>
              <ClientesList />
            </MainLayout>
          }
        />
        <Route
          path="/clientes/forms"
          element={
            <MainLayout>
              <ClienteForm />
            </MainLayout>
          }
        />
        <Route
          path="/clientes/forms/:id"
          element={
            <MainLayout>
              <ClienteForm />
            </MainLayout>
          }
        />

        <Route
          path="/relatorios"
          element={
            <MainLayout>
              <Relatorios />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
