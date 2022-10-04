import {Suspense} from "react";
import createResource from "../../../utilities/allLayers/createResource";
import {findAllRolesCase, findRolesCase} from "../../infrastructure/services/bdsRole";
import {adapJoinItemsForIn} from "../../../utilities/allLayers/adaptersAllLayers";
export function CbItemsRoles() {
  const onGetItemsRoles = async (x) => {
    const roles = await findAllRolesCase();
    const itemsComboRoles = roles.map(({_id, role}) => (
      <option key={_id} value={_id}>
        {role}
      </option>
    ));
    return itemsComboRoles;
  };
  const routerResource = createResource(onGetItemsRoles);
  const ItemsRolesUser = () => {
    return routerResource.read(0);
  };
  return (
    <Suspense fallback={""}>
      <ItemsRolesUser />
    </Suspense>
  );
}
export function cbItemsRolesUser(ids, select) {
  const onGetItemsRoles = async (x) => {
    if (ids !== undefined) {
      const adapIds = adapJoinItemsForIn(ids);
      const roles = await findRolesCase(adapIds);
      const itemsComboRoles = roles.map(({_id, role}) => {
        if (_id === select) {
          return (
            <option key={_id} value={_id} selected>
              {role}
            </option>
          );
        } else {
          return (
            <option key={_id} value={_id}>
              {role}
            </option>
          );
        }
      });
      return itemsComboRoles;
    }
    return <></>;
  };
  const routerResource = createResource(onGetItemsRoles);
  const ItemsRolesUser = () => {
    return routerResource.read(0);
  };
  return (
    <Suspense fallback={undefined}>
      <ItemsRolesUser />
    </Suspense>
  );
}
