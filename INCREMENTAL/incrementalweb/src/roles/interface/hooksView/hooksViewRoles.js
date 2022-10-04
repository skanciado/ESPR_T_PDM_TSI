import createResource from "../../../utilities/allLayers/createResource";
import {findAllRolesCase, findRolesCase} from "../../infrastructure/services/bdsRoles";
import {adapJoinItemsForIn} from "../../../utilities/allLayers/adaptersAllLayers";
const onGetItemsAllRoles = async (x) => {
  const roles = await findAllRolesCase();
  const itemsComboRoles = roles.map(({_id, name}) => (
    <option key={_id} value={_id}>
      {name}
    </option>
  ));
  return itemsComboRoles;
};
const allRolesResource = createResource(onGetItemsAllRoles);
export const ItemsAllRolesUser = () => {
  return allRolesResource.read(0);
};
const onGetItemsRoles = async (x) => {
  if (x.ids !== undefined) {
    const adapIds = adapJoinItemsForIn(x.ids);
    const roles = await findRolesCase(adapIds);
    const itemsComboRoles = roles.map(({_id, name}) => {
      if (_id === x.select) {
        return (
          <option key={_id} value={_id} selected>
            {name}
          </option>
        );
      } else {
        return (
          <option key={_id} value={_id}>
            {name}
          </option>
        );
      }
    });
    return itemsComboRoles;
  }
  return <></>;
};
const rolesResource = createResource(onGetItemsRoles);
export const ItemsRolesUser = (x) => {
  return rolesResource.read(x);
};
