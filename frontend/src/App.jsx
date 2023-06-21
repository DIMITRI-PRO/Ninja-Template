import { BrowserRouter } from "react-router-dom";
import { AuthRouter } from "./router/Router";
import { NotifMessageProvider } from "./context/MessageNotifContext";
import { AuthContextProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <BrowserRouter>
      <NotifMessageProvider>
        <AuthContextProvider>
          <AuthRouter />
        </AuthContextProvider>
      </NotifMessageProvider>
    </BrowserRouter>
  );
};
