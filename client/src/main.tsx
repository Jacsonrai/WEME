import ReactDOM from "react-dom/client";
import WemeRoute from "@/wrapper/Route";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <WemeRoute />
    </BrowserRouter>
  </>
);
