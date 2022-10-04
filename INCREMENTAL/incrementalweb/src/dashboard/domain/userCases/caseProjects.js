import {crudDoGetObjectTypesAttributesProyect} from "../crud/crudDoProjects";
export async function caseProjects() {
  /*const configTypeProjects = await crudDoProjects("ObjectTypes/9394003", undefined);
  if (configTypeProjects !== 0) {
    return configTypeProjects;
  }*/
  const attributesProjects = await crudDoGetObjectTypesAttributesProyect("ObjectTypes/9580517");
  if (attributesProjects !== undefined) {
    return attributesProjects;
  }
  //event.context.cacheDispatch.handleCacheUpdate({roleLast: event.role});
}
