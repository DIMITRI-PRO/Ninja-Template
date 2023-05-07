import { AuthContextProvider } from "./context/AuthContext";
import { AuthRouter } from "./router/Router";

export const App = () => {
  return (
    <AuthContextProvider>
      <AuthRouter />
    </AuthContextProvider>
  );
};
