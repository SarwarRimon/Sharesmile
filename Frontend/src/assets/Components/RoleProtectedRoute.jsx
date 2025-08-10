import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRole }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    // Wrong role - redirect to home
    return <Navigate to="/" replace />;
  }

  // Correct role - show the protected content
  return children;
};

export default RoleProtectedRoute;
