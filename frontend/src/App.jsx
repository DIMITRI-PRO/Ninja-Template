import { BrowserRouter } from "react-router-dom";
import { AuthRouter } from "./router/Router";
import { AuthContextProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <AuthRouter />
      </AuthContextProvider>
    </BrowserRouter>
  );
};
