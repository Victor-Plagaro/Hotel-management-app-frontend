import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Hooks/hooks";
import { setUser } from "../Slices/userSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer text-gray-700 underline hover:text-gray-900 dark:text-white"
    >
      Cerrar sesión
    </button>
  );
}
