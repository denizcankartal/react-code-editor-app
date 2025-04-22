import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client'
import { TabProvider } from "./components/TabContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TabProvider>
      <App />
    </TabProvider>
  </React.StrictMode>
);
