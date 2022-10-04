import React from "react";
import {Routes, Route} from "react-router-dom";
import LayoutNavBarHeader from "../../navBars/interface/layouts/layoutNavBarHeader";
import LayoutDashboardHome from "../../dashboard/interface/layouts/layoutDashboardHome";
import LayoutGroup from "../../groups/interface/layouts/layoutGroup";
import LayoutUserAdministration from "../../users/interface/layouts/layoutUserAdministration";
import LayoutOrganization from "../../users/interface/layouts/layoutOrganization";
import LayoutBusiness from "../../objectType/interface/layouts/layoutBusiness";
import LayoutSecurity from "../../lifeCycle/interface/layouts/layoutSecurity";
import LayoutWorkflow from "../../workflows/interface/layouts/layoutWorkflow";
import LayoutProject from "../../projects/interface/layouts/layoutProject";
import LayoutTreeView from "../../treeView/interface/layouts/layoutTreeview";
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
              <Route path="treeview" element={<LayoutTreeView />} />
              <Route path="organization" element={<LayoutOrganization />} />
              <Route path="business" element={<LayoutBusiness />} />
              <Route path="security" element={<LayoutSecurity />} />
              <Route path="workflow" element={<LayoutWorkflow />} />
              <Route path="project" element={<LayoutProject />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainRoutes;
