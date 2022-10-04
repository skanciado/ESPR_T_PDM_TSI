import createResource from "../../../utilities/allLayers/createResource";
import HookViewTableDocuments from "./hooksViewTableDocument";
import crudApTableDocument, {crudApTableDocumentsSave} from "../../application/crud/crudApTableDocument";
const onGetHookViewTableDocuments = async (props) => {
  const dataAndDesing = await crudApTableDocument(props);
  //devuelvo la tabla con el modal
  return <HookViewTableDocuments id={"tblDocuments"} title={"documents"} tableValues={dataAndDesing.tableValues} dialogContent={dataAndDesing.dialogContent} valuesAllSelectOne={dataAndDesing.valuesAllSelectOne} tableFilters={undefined} crudApTableSave={crudApTableDocumentsSave} />;
};
const routerResource = createResource(onGetHookViewTableDocuments);
export const HookViewTableAsyncDocuments = (props) => {
  return routerResource.read(props);
};
