import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import ProtectRouterToken from "@/main/common/components/protectRouterToken/ProtectRouterToken";
import { Toaster } from "@/components/ui/toaster";
import Loading from "@/main/common/components/loading/Loading";
import LoginPage from "@/main/layout/pages/(auth)/login/LoginPage";
import Home from "@/main/layout/pages/customer-service/employee-contracts/Page";
import AppLayoutProviders from "../providers/AppLayoutProviders";
import SendActiveDonePage from "@/main/layout/pages/(auth)/sendActiveDone/SendActiveDonePage";
import ActiveEmailPage from "@/main/layout/pages/(auth)/activateEmail/ActiveEmailPage";
import ActivePhonePage from "@/main/layout/pages/(auth)/activePhone/ActivePhonePage";
import ForgetPasswordPage from "@/main/layout/pages/(auth)/forgetPassword/ForgetPasswordPage";
import SetNewPasswordPage from "@/main/layout/pages/(auth)/setNewPassword/SetNewPasswordPage";

export const router = createBrowserRouter([
  {
    element: <ProtectRouterToken />,
    children: [
      { path: "/auth/login", element: <LoginPage /> },
      {
        path: "/auth/user_register",
      },
      {
        path: "/auth/org_register",
      },
      { path: "/auth/send_active_done", element: <SendActiveDonePage /> },
      { path: "/auth/activate_email", element: <ActiveEmailPage /> },
      { path: "/auth/active_phone", element: <ActivePhonePage /> },
      { path: "/auth/forget_password", element: <ForgetPasswordPage /> },
      { path: "/auth/set_new_password", element: <SetNewPasswordPage /> },
    ],
  },
  {
    path: "/",
    element: <AppLayoutProviders />,
    children: [
      { index: true, element: <Home /> },

      // {
      //   path: "/qr-code/:id",
      //   element: <FromQrCodePage />,
      // },
    ],
  },
]);

const AppRouter: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <RouterProvider router={router} />
    <Toaster />
  </Suspense>
);

export default AppRouter;
