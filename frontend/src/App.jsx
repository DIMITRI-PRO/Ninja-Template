import { AuthRouter } from "./router/Router";
import { AuthContextProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthContextProvider>
      <AuthRouter />
    </AuthContextProvider>
  );
};
