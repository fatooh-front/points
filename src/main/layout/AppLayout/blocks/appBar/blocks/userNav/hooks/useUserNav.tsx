import { useAuth } from "@/main/global/store/auth/useAuth";
import useLogout from "@/main/global/store/auth/useLogout";

const useUserNav = () => {
  const { user } = useAuth();
  const { handleLogOut } = useLogout();
  return {user, handleLogOut };
};
export default useUserNav;
