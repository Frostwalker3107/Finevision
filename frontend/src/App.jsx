
import AppRoutes from "./routes/AppRoutes";
import AppLayout from "./components/layout/AppLayout"
import { AlertToastProvider } from "./components/common/toast";

const App = () => {
  return (
    <>
      <AlertToastProvider />

      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </>
  );
};

export default App;
