import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableProjects from "./hooksViewTableProject";
import crudApTableProject, {crudApTableProjectSave} from "../../application/crud/crudApTableProject";
const onGetHookViewTableProjects = async (props) => {
  const dataAndDesing = await crudApTableProject(props);
  //devuelvo la tabla con el modal
  return <HookViewTableProjects id={"tblProjects"} title={"projects"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableProjectSave} />;
};
const routerResource = createResource(onGetHookViewTableProjects);
export const HookViewTableAsyncProjects = (props) => {
  return routerResource.read(props);
};
