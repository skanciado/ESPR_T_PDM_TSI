import React /*, { useContext }*/ from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import {ToastContainer} from "react-toastify";
import {Slide} from "react-toastify";
import history from "./history";
import LayoutUserLogin from "../../users/interface/layouts/layoutUserLogin";
import MainRoutes from "./mainRoutes";
export const AppRouter = () => {
  return (
    <Router history={history}>
      <div style={{height: "100vh"}}>
        <Routes>
          <Route path="/login" element={<LayoutUserLogin />} />
          <Route
            path="/home/*"
            element={
              <PrivateRoute>
                <MainRoutes history={history} />
              </PrivateRoute>
            }
          />
        </Routes>
        {/*ToastContainer added here, so notifications do not disappear when calling redirection (navigating to another page)*/}
        <ToastContainer className="testContainer" transition={Slide} limit={6} style={{width: "450px"}} />
      </div>
    </Router>
  );
};
export default AppRouter;
