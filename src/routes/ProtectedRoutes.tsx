import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../Hooks/hooks';
import { RootState } from '../store';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAppSelector((state: RootState) => state.user.user);

  // Deny access to those who are not logged in and redirect to the login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Return the children components if the user is logged in
  return <>{children}</>;
};
