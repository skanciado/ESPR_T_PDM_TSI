import React from "react";
import {Routes, Route} from "react-router-dom";
import LayoutNavBarHeader from "../../navBars/interface/layouts/layoutNavBarHeader";
import LayoutDashboardHome from "../../dashboard/interface/layouts/layoutDashboardHome";
import LayoutGroup from "../../groups/interface/layouts/layoutGroup";
import LayoutUserAdministration from "../../users/interface/layouts/layoutUserAdministration";
const MainRoutes = (hist) => {
  return (
    <div id="pagePrimary">
      <div>
        <LayoutNavBarHeader history={hist} />
      </div>
      <div>
        <div>
          {/* <LayoutNavBarVertical/> */}
          <div>
            <Routes>
              <Route path="dashboard" element={<LayoutDashboardHome />} />
              <Route path="groups" element={<LayoutGroup />} />
              <Route path="administration" element={<LayoutUserAdministration />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainRoutes;
