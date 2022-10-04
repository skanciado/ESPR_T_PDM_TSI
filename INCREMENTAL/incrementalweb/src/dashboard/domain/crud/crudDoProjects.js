import {findParentObjects} from "../../../parentObject/infrastructure/services/bdsParentObject";
import {parentlistObjectTypes, findObjectTypes, attributelistObjectTypes} from "../../../objectType/infrastructure/services/bdsObjectType";
export async function crudDoProjects(from, role) {
  const parent = await findParentObjects(from, role);
  if (parent !== undefined) {
    let listObjetTypesProject = await parentlistObjectTypes(parent._to);
    const objetTypesProject = await findObjectTypes(from);
    listObjetTypesProject.push(objetTypesProject);
    return listObjetTypesProject;
  }
  return undefined;
}
export async function crudDoGetObjectTypesAttributesProyect(id) {
  const attributelistProject = await attributelistObjectTypes(id);
  return attributelistProject;
}
