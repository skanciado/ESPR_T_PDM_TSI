import {createObjectType, parentlistObjectTypes, attributelistObjectTypes} from "../../infrastructure/services/bdsObjectType";
export async function crudApCreateObjectType(target) {
  let jsonData = undefined;
  const res = await createObjectType(target.parent, target.name, JSON.parse(target.attributes));
  if (res !== undefined) {
    jsonData = res;
    return jsonData;
  }
}
export async function crudApParentlistObjectTypes(target) {
  let jsonData = undefined;
  const res = await parentlistObjectTypes(target.id);
  if (res !== undefined) {
    jsonData = res;
    return jsonData;
  }
}
export async function crudApAttributelistObjectTypes(target) {
  let jsonData = undefined;
  const res = await attributelistObjectTypes(target.id);
  if (res !== undefined) {
    jsonData = res;
    return jsonData;
  }
}
