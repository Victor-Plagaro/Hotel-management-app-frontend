import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Hooks/hooks';
import { setUser, AuthUser } from '../Slices/userSlice';

export default function FormLogin() {
  // Usestate
  const [user, setLoginUser] = useState<AuthUser>({ email: '', password: '' });
  const [error, setError] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Input email event controller
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textInput = e.target.value;
    setLoginUser((paramUser) => ({ ...paramUser, email: textInput }));
  };
  // Input email event controller
  const handleInputPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdInput = e.target.value;
    setLoginUser((paramUser) => ({ ...paramUser, password: pwdInput }));
  };

  // Check the login and update the userSlice state
  const handleLogin = () => {
    fetch('/hotel/users.json')
      .then((res) => res.json())
      .then((data) => {
        if (
          data.usuario.email === user.email &&
          data.usuario.password === user.password
        ) {
          dispatch(setUser(user));
          navigate('/hoteles');
        } else {
          setError({
            email: data.usuario.email !== user.email,
            password: data.usuario.password !== user.password,
          });
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos del JSON:', error);
      });
  };

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-white text-white">
      <div className="flex h-96 w-96 flex-col gap-6 rounded-lg border-1 border-gray-300 bg-gray-100 p-6">
        <header className="flex flex-col gap-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              Introduzca su email debajo para poder usar la web
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-2">
          {error.email || error.password ? (
            <span className="rounded-sm border-2 border-pink-500 p-2 text-xs text-pink-600">
              Error al introducir los datos. Por favor, revise los datos
              introducidos y vuelva a intentarlo
            </span>
          ) : null}
          <p className="text-xs font-bold text-gray-800">Email</p>
          <input
            required
            type="email"
            onChange={handleInputEmail}
            value={user.email}
            className="w-full rounded-lg border-1 border-gray-300 p-1 pl-2 text-gray-900 focus:text-gray-800"
            placeholder="Introduzca su correo..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-gray-800">
            <p>Contraseña</p>
            <span className="cursor-pointer text-gray-600 hover:text-gray-800">
              ¿Olvidó su contraseña?
            </span>
          </div>
          <input
            required
            type="password"
            onChange={handleInputPwd}
            value={user.password}
            className="w-full rounded-lg border-1 border-gray-300 p-1 pl-2 text-gray-900 focus:text-gray-800"
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="rounded-lg bg-gray-800 p-1 font-bold text-white hover:bg-white hover:text-gray-800 hover:shadow-lg hover:shadow-gray-800/30"
        >
          Login
        </button>

        <div className="flex w-full justify-center gap-4 text-center text-sm text-gray-800">
          <p>¿No tiene cuenta?</p>

          <a href="" className="font-bold text-gray-600 hover:text-gray-800">
            Crear cuenta
          </a>
        </div>
      </div>
    </div>
  );
}
