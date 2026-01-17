import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/auth.context.jsx";
import { BrowserRouter } from "react-router";
import { LaptopProvider } from "./context/laptops.context.jsx";
import { ThemeProvider } from "./context/theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <LaptopProvider>
          <App />
        </LaptopProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
