
import AppRoutes from "./routes/AppRoutes";
import { AlertToastProvider } from "./components/common/toast";

const App = () => {
  return (
    <>
      <AlertToastProvider />
      <AppRoutes />
    </>
  );
};

export default App;
