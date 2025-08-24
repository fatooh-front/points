import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const handleLogOut = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };
  return { handleLogOut };
};

export default useLogout;
