import {Suspense} from "react";
import createResource from "../../../utilities/allLayers/createResource";
import {caseProjects} from "../../domain/userCases/caseProjects";
import HookViewTableRoles from "../../../roles/interface/hooksView/hooksViewTableRoles";
export default function LayoutDashboardHome() {
  const onGetHookViewTableRoles = async (x) => {
    //obtengo los datos de los combos en caso de tener combos el formulario
    const valuesAllSelectOne = {
      state: [
        {key: "1", value: "In Work"},
        {key: "2", value: "Pending"},
        {key: "3", value: "Finalized"},
      ],
    };
    //obtengo los valores de la tabla Projects en caso de tener que editar datos, en caso contrario values={undefined}
    let tableValues = [
      {
        name: "Project1",
        id: "111111",
        owner: "test",
        owningGroup: "hola mundo 1",
        creationDate: "2010-12-21",
        lastModifyingUser: "2015-12-01",
        lastModifyingDate: "2012-12-01",
        status: "In Work",
        projectType: "design",
      },
      {
        name: "Project2",
        id: "2222",
        owner: "test2",
        owningGroup: "hola mundo 2",
        creationDate: "2001-12-21",
        lastModifyingUser: "2005-12-01",
        lastModifyingDate: "2002-12-01",
        status: "Pending",
        projectType: "manag",
      },
    ];
    const dialogContentProjects = await caseProjects();
    return <HookViewTableRoles tableValues={tableValues} dialogContent={dialogContentProjects} valuesAllSelectOne={undefined} />;
  };
  const routerResource = createResource(onGetHookViewTableRoles);
  const HookViewTableRolesAsync = () => {
    return routerResource.read(0);
  };
  return (
    <Suspense fallback={undefined}>
      <div className="container mx-auto">
        <div className="flex flex-wrap py-5">
          <div className="flex flex-row px-2">
            <HookViewTableRolesAsync />
          </div>
          <div className="flex flex-row w-1/2 px-2"></div>
        </div>
        <div className="flex flex-wrap w-screen pt-2">
          <div className="flex flex-row w-1/2 px-2"></div>
          <div className="flex flex-row w-1/2 px-2"></div>
        </div>
      </div>
    </Suspense>
  );
}
