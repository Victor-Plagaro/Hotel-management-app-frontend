import DataTables from "@/components/DataTable/DataTables";
import FormLogin from "./components/Login/FormLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import FormProfile from "./components/Profile/FormProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FormLogin />} />
        <Route
          path="hoteles"
          element={
            <ProtectedRoute>
              <DataTables />
            </ProtectedRoute>
          }
        />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <FormProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
