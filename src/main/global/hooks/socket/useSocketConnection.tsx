import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../store/auth/useAuth";

export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SOCKET_URL as string, {
  transports: ["websocket"],
  // upgrade: false,
  // withCredentials: true,
});

const useSocketConnection = () => {
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user?.userId || !token) return;
    socket.on("connection", (data) => {
      console.log("data connection", data);
      socket.emit("getUserId", user.userId);
    });

    return () => {
      socket.off("connection");
    };
  }, [user?.userId, token]);

  useEffect(() => {
    token && socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [token]);
};
export default useSocketConnection;
