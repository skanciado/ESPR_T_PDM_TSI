import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableTasks from "./hooksViewTableTask";
import crudApTableTask, {crudApTableTasksSave} from "../../application/crud/crudApTableTask";
const onGetHookViewTableTasks = async (props) => {
  const dataAndDesing = await crudApTableTask(props);
  //devuelvo la tabla con el modal
  return <HookViewTableTasks id={"tblTasks"} title={"tasks"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableTasksSave} />;
};
const routerResource = createResource(onGetHookViewTableTasks);
export const HookViewTableAsyncTasks = (props) => {
  return routerResource.read(props);
};
