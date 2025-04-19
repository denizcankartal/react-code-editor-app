import React from "react";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { createRoot } from 'react-dom/client'
import { TabProvider } from "./components/TabContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <TabProvider>
        <App />
      </TabProvider>
    </ChakraProvider>
  </React.StrictMode>
);
