import { createBrowserRouter } from "react-router";
import mainLayout from "../mainLayout/mainLayout";
import Home from "../../page/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
