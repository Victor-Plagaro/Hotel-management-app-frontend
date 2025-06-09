import { useDispatch, useSelector } from "react-redux";
import { setThemeMode, ThemeMode } from "../Slices/themeSlice";
import { RootState } from "../../store";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value as ThemeMode;

    dispatch(setThemeMode(selectedTheme));

    // Update data-theme
    const root = document.documentElement;
    root.setAttribute("data-theme", selectedTheme);

    // Save in the localstorage
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className="rounded border border-gray-300 p-2 dark:bg-stone-800 dark:text-white"
    >
      <option value="light">Claro</option>
      <option value="dark">Oscuro</option>
    </select>
  );
};

export default ThemeToggle;
