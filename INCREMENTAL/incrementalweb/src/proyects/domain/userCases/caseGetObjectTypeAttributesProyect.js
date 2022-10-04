import {crudDoGetObjectTypesAttributesProyect} from "../crud/crudDoGetObjectTypesAttributesProyect";
export async function caseGetObjectTypeAttributesProyect(event) {
  const attributelistProject = await crudDoGetObjectTypesAttributesProyect(event.id);
  if (attributelistProject !== undefined) {
    //event.context.cacheDispatch.handleCacheReplace(res);
    return attributelistProject;
  }
}
