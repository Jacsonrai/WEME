import ReactDOM from "react-dom/client";
import WemeRoute from "@/wrapper/Route";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <WemeRoute />
      </BrowserRouter>
    </ReduxProvider>
  </>
);
