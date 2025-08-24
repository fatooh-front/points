import React from "react";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRouter from "@/main/global/routers/router";
import i18n from "@/i18n";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const Providers: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </I18nextProvider>
  );
};

export default Providers;
