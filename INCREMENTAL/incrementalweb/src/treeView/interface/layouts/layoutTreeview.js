import React from "react";
import {TreeView} from "./treeView";
const data = {
  docs: {
    Overview: ["overview"],
    "Getting Started": [
      "gettingstarted/devmachine",
      "gettingstarted/azuredevops",
      "gettingstarted/templates",
      {
        type: "category",
        label: "Code Samples",
        items: ["codesamples/polly", "codesamples/masstransit"],
      },
    ],
    "User Guides": ["userguides/maintaindocs", "userguides/switchingbetweenk8sclusters", "userguides/kubernetesmonitoring", "userguides/projecttemplates", "userguides/rabbitmqsiteserver"],
    Architecture: ["architecture/overview", "architecture/userinterfaces", "architecture/apitypes", "architecture/configuration", "architecture/sitedeploymentmodels", "architecture/masterdata", "architecture/integration", "architecture/patterns", "architecture/sitesetup", "architecture/techstack"],
    Standards: [
      "standards/namingconventions",
      "standards/codesharing",
      "standards/apidesign",
      "standards/caching",
      "standards/messaging",
      "standards/logging",
      "standards/monitoring",
      "standards/security",
      "standards/nugetpackages",
      {
        type: "category",
        label: "Testing",
        items: ["testing/overview", "testing/unittest", "testing/integration", "testing/system", "testing/manual", "testing/testautomation", "testing/defectmanagement", "testing/nonfunctional"],
      },
    ],
    Security: ["security/oauth", "security/auth0"],
    DevOps: ["devops/overview", "devops/pipelines", "devops/environments", "devops/buildtemplates", "devops/helm", "devops/faq"],
  },
};
export default function LayoutTreeView(props) {
  return (
    <div className="">
      <div className="flex flex-wrap py-2 h-65">
        <div className="flex flex-row px-2 w-70">
          <TreeView data={data} />
        </div>
        <div className="flex flex-row px-2 w-30">{/* <HookViewTableAsyncDocuments /> */}</div>
      </div>
      <div className="flex flex-wrap h-30">
        <div className="flex flex-row px-2 full">{/* <HookViewTableAsyncWorkflows /> */}</div>
      </div>
    </div>
  );
}
