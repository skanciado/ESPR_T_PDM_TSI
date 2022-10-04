import createResource from "../../../utilities/allLayers/createResource";
import {findAllGroupsCase, findGroupsCase} from "../../infrastructure/services/bdsGroups";
import {adapJoinItemsForIn} from "../../../utilities/allLayers/adaptersAllLayers";
const onGetItemsAllGroups = async (x) => {
  const groups = await findAllGroupsCase();
  const itemsComboRoles = groups.map(({_id, name}) => (
    <option key={_id} value={_id}>
      {name}
    </option>
  ));
  return itemsComboRoles;
};
const gropusResource = createResource(onGetItemsAllGroups);
export const ItemsAllGroupsUser = () => {
  return gropusResource.read(0);
};
const onGetItemsGroups = async (x) => {
  if (x.ids !== undefined) {
    const adapIds = adapJoinItemsForIn(x.ids);
    const groups = await findGroupsCase(adapIds);
    const itemsComboGroups = groups.map(({_id, name}) => {
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
    return itemsComboGroups;
  }
  return <></>;
};
const groupsResource = createResource(onGetItemsGroups);
export const ItemsGroupsUser = (x) => {
  return groupsResource.read(x);
};
