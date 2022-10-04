import {attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
export async function crudDoGetObjectTypesAttributesProyect(id) {
  const attributelistProject = await attributelistObjectTypes(id);
  return attributelistProject;
}
