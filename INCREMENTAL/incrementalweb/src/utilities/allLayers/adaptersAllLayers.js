import {getValueRelation, getSelectOneRelation} from "../../objectType/infrastructure/services/bdsObjectType";
import t from "../../transversal/language/i18n";
import { findAllGeneralEdge,findGeneralObject } from "../infrastructure/services/bsdAll";
export function adapJoinItemsForIn(items) {
  if (items.length > 0) {
    return items.join("', '");
  }
  return items;
}
export async function adapValueRelation(dialogContent, tableValues) {
  for await (const tab of dialogContent.attributes) {
    for await (const item1 of tab.content) {
      const keyFrom = Object.keys(item1)[0];
      if (item1[keyFrom].isRelation === true) {
        const relationCollectionType = item1[keyFrom].relationKind;
        const relationCollectionName = item1[keyFrom].relationName;
        const relationKey = item1[keyFrom].relationValue;
        if (item1[keyFrom].type === "text") {
          for await (const item2 of tableValues) {
            const relationValue = item2[keyFrom];
            if (relationValue !== undefined) {
              const valueResult = await getValueRelation(relationCollectionType, relationCollectionName, relationKey, relationValue, "_id");
              item2[keyFrom] = valueResult;
            }
          }
        }else if (item1[keyFrom].type === "list") {
            let _from = undefined;
            let _to = undefined;
            for await (const item2 of tableValues) {                
                if( item1[keyFrom].relationSearch === "_from"){
                    _from = item2._id;
                }else{
                    _to = item2._id;
                }
                const valueResult = await findAllGeneralEdge(relationCollectionName, _from, _to);
                if( valueResult !== undefined){
                    let userValues = [];
                    let dbId = "";
                    for await (const item3 of valueResult) {
                        if( item1[keyFrom].relationSearch === "_from"){
                            dbId = item3._to;
                        }else{
                            dbId = item3._from;
                        }
                        const userResult = await findGeneralObject(item1[keyFrom].targetCollection,dbId)
                        if (userResult !== undefined) {
                            userValues.push(userResult);
                        }
                    }
                    item2[keyFrom]= userValues;
                }
            }
        }
      }
    }
  }
  return tableValues;
}
export function adapTranslation(dialogContent) {
  Object.entries(dialogContent.tableButtons).forEach(([key, value]) => {
    if (value.label !== undefined && value.label !== null) {
      dialogContent.tableButtons[key].label = t(value.label);
    }
  });
  dialogContent.attributes.forEach((tab, i) => {
    tab.content.forEach((item, b) => {
      const key = Object.keys(item)[0];
      if (item[key].label !== undefined && item[key].label !== null) {
        dialogContent.attributes[i].content[b][key].label = t(item[key].label);
      }
      if (item[key].table_label !== undefined && item[key].table_label !== null) {
        dialogContent.attributes[i].content[b][key].table_label = t(item[key].table_label);
      }
    });
  });
  return dialogContent;
}
export async function adapValuesAllSelectOne(dialogContent) {
  for await (const tab of dialogContent.attributes) {
    for await (const item1 of tab.content) {
      const keyFrom = Object.keys(item1)[0];
      if (item1[keyFrom].isRelation === true) {
        const relationCollectionType = item1[keyFrom].relationKind;
        const relationCollectionName = item1[keyFrom].relationName;
        const relationKey = item1[keyFrom].relationValue;
        if (item1[keyFrom].type === "select-one") {
          const valueResult = await getSelectOneRelation(relationCollectionType, relationCollectionName, relationKey);
          item1[keyFrom].valuesSelectOne = valueResult;
        }
      }
    }
  }
  return dialogContent;
}
export function adapRemoveItemsDatabase(tableValues) {
  const newTableValues = tableValues.map((row) => {
    delete row._id;
    delete row._key;
    delete row._rev;
    return row;
  });
  return newTableValues;
}
export async function getValuesAllSelectOne(dialogContent) {
  let valuesAllSelectOne = {};
  for await (const tab of dialogContent.attributes) {
    for await (const item1 of tab.content) {
      const keyFrom = Object.keys(item1)[0];
      if (item1[keyFrom].isRelation === true) {
        const relationCollectionType = item1[keyFrom].relationKind;
        const relationCollectionName = item1[keyFrom].relationName;
        const relationKey = item1[keyFrom].relationValue;
        if (item1[keyFrom].type === "select-one") {
          const valueResult = await getSelectOneRelation(relationCollectionType, relationCollectionName, relationKey);
          valuesAllSelectOne[keyFrom] = valueResult;
        }
      }
    }
  }
  if (JSON.stringify(valuesAllSelectOne) !== "{}") {
    return valuesAllSelectOne;
  } else {
    return undefined;
  }
}
export function adapValuesFiltersTables(valuesModal, textInSelect) {
  let tableFilters = [];
  Object.entries(valuesModal).forEach(([key, value]) => {
    if (textInSelect === false) {
      if (valuesModal["SELECT&" + key] !== undefined) {
        value = valuesModal["SELECT&" + key].text;
      }
    }
    if (value !== "" && key.startsWith("SELECT&") === false) {
      tableFilters.push({[key]: value});
    }
  });
  return tableFilters;
}
export function adapCleanForm(idForm) {
  const element = document.getElementById(idForm);
  let i = 0;
  do {
    if (element[i].type === "text") {
      element[i].value = "";
    }
    i++;
  } while (i < element.length);
}
export function adapWhiteItemInArrays(valuesAllSelectOne) {
  let arrays = JSON.parse(JSON.stringify(valuesAllSelectOne));
  Object.keys(arrays).forEach((key) => {
    arrays[key].unshift({key: undefined, value: undefined});
  });
  return arrays;
}
