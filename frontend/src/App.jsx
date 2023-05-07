import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthContextProvider>
      <Home />
    </AuthContextProvider>
  );
};
