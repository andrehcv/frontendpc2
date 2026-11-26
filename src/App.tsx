import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HOME, DETAIL, MINE_ROUTE } from "./config";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import MyOpsPage from "./pages/MyOpsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path={HOME} element={<ListPage />} />
          <Route path={`${DETAIL}/:id`} element={<DetailPage />} />
          <Route path={MINE_ROUTE} element={<MyOpsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
