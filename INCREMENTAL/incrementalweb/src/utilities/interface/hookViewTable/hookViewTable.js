import {useState} from "react";
import HookViewTableHeaders from "./HookViewTableHeaders";
import HookViewTableBody from "./hookViewTableBody";
import HookViewTableFilters from "./hookViewTableFilters";
import HookViewTableButtons from "./hookViewTableButtons";
//import * as ReactDOMServer from "react-dom/server";
export default function HookViewTable(props) {
  const [stateTableConfig, setStateConfig] = useState({tableConfig: undefined, typeColumns: undefined, headers: undefined});
  const [stateTable, setStateTable] = useState({
    numRowsVisibles: props.values.length,
    filters: undefined,
    rowSelectedIdValues: undefined,
    rowSelectedIdTable: undefined,
    rowsCreated: [],
    rowsUpdated: [],
    rowsDeletedIds: [],
    table: undefined,
    actionState: undefined,
  });
  if (stateTable.table === undefined) {
    stateTable.table = props.values;
    //si se le han pasado los datos de select-one manualmente o no por bds
    const dialogContentUpdated = updateDataDialogSelectOne(props.dialogContent.attributes, props.valuesAllSelectOne);
    //se crea una unica array con todos los datos de content de todos los tabs
    const allElements = concactenateAllElementsWithAllTabs(dialogContentUpdated);
    const typeColumns = getTypeColumns(props.dialogContent.attributes);
    const headers = getHeaders(props.dialogContent.attributes);
    stateTableConfig.tableConfig = allElements;
    stateTableConfig.typeColumns = typeColumns;
    stateTableConfig.headers = headers;
    const columsFilters = columsToFilters(stateTableConfig.typeColumns);
    stateTable.filters = columsFilters;
  }
  const eventHandlerOnChange_Filter = (key, value) => {
    const filtersVisibles = columsIsFilters(props.id, key, value, stateTableConfig.typeColumns[key], stateTableConfig.filters);
    const numRowsVisibles = filtersVisibles.filter((item) => item.isVisible === true);
    if (numRowsVisibles.length !== stateTable.numRowsVisibles) {
      filtersVisibles.forEach((row) => rowTableHidde(row.idRowTable, row.isVisible));
    }
    stateTable.filters[stateTableConfig.typeColumns[key]] = value;
    stateTable.numRowsVisibles = numRowsVisibles.length;
  };
  const eventHandlerOnClick_ButtonsBody = (idButton) => {
    if (props.eventHandlerOnClickButtonsTableBody !== undefined) {
      props.eventHandlerOnClickButtonsTableBody(idButton);
    }
  };
  const eventHandlerOnClick_ButtonsBarClick = (idButton, idTable, idRowTable = undefined, idRowValues = undefined) => {
    if (idButton === "create") {
      stateTable.actionState = "processingCreate";
    }
    if (idButton === "save") {
      //en caso de no usar un modal para crear/editar datos y crear/editar desde la tabla
      const table = getElement(idTable);
      if (table !== undefined) {
        const tableRows = getRowsByIdTable(idTable);
        for (let tr of tableRows) {
          let rowValues = undefined;
          for (let tcell of tr.cells) {
            console.log(tcell + rowValues);
            //row[tcell.id] = tcell.value;
          }
          if (rowValues !== undefined) {
            const index = stateTable.table.findIndex((row) => row !== null && row.id === rowValues.id);
            if (stateTable.table[index] === undefined) {
              //fila nueva
              stateTable.table[stateTable.length] = rowValues;
            } else {
              //fila posiblemente modificada
              stateTable.table[index] = rowValues;
            }
          }
        }
      }
      stateTable.actionState = undefined;
    }
    if (idButton === "delete") {
      stateTable.actionState = "processingDelete";
      const idsRowsValues = rowsDelete(idTable);
      let tableTemp = JSON.parse(JSON.stringify(stateTable.table));
      idsRowsValues.forEach((idDelete) => {
        const index = tableTemp.findIndex((row) => row !== null && row.id === idDelete);
        tableTemp[index] = null;
        //tableTemp.splice(1, index);
        //delete tableTemp[index];
      });
      stateTable.actionState = undefined;
      stateTable.rowSelectedIdValues = undefined;
      stateTable.rowSelectedIdTable = undefined;
      stateTable.rowsDeletedIds.push(idsRowsValues);
      setStateTable({...stateTable, table: tableTemp});
    }
    if (idButton === "selectedRowOnClick") {
      stateTable.actionState = "processingUpdate";
      stateTable.rowSelectedIdValues = idRowValues;
      stateTable.rowSelectedIdTable = idRowTable;
    }
    if (props.eventHandlerOnClickButtonsTableBar !== undefined) {
      props.eventHandlerOnClickButtonsTableBar(idButton, stateTable);
    }
  };
  const eventHandlerOnClick_Row = (idTable, idRowTable) => {
    if (idRowTable !== undefined) {
      rowTableUnSelect(idTable);
      rowTableSelect(idRowTable, true, document);
    }
  };
  const eventHandlerOnDblClick_Row = (idRowTable, idRowValues) => {
    if (idRowTable !== undefined) {
      eventHandlerOnClick_ButtonsBarClick("selectedRowOnClick", undefined, idRowTable, idRowValues);
    }
  };
  if (props.eventHandlerModalValues !== undefined && stateTable.actionState?.startsWith("processing") === true) {
    let isExistRow = undefined;
    if (props.eventHandlerModalValues.id !== undefined) {
      isExistRow = stateTable.table.find((row) => row !== null && row.id === props.eventHandlerModalValues.id);
    }
    if (isExistRow !== undefined) {
      eventHandlerSaveModalUpdate_InTable(stateTable.rowSelectedIdTable, props.eventHandlerModalValues, stateTable, stateTableConfig.typeColumns);
    } else {
      eventHandlerSaveModalCreate_InTable(props.eventHandlerModalValues, stateTable, stateTableConfig.typeColumns, props.id, props.dialogContent.attributes, props.valuesAllSelectOne, eventHandlerOnClick_Row, eventHandlerOnDblClick_Row, eventHandlerOnClick_ButtonsBody);
    }
    stateTable.actionState = undefined;
  }
  return (
    <div className="container px-8 py-1 mx-auto bg-white rounded">
      <div className="py-2">
        <div className="flex flex-row justify-between w-full sm:mb-0">
          <h2 className="text-2xl leading-tight">{props.title}</h2>
          <div className="text-end">
            <HookViewTableButtons id={props.id} buttonsConfig={props.dialogContent.tableButtons} eventHandlerOnClickButtonsBar={eventHandlerOnClick_ButtonsBarClick} />
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <HookViewTableFilters id={props.id} typeColumns={stateTableConfig.typeColumns} valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnChangeFilter={eventHandlerOnChange_Filter} />
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table id={props.id} className="min-w-full leading-normal">
              <thead>
                <HookViewTableHeaders id={props.id} headers={stateTableConfig.headers} />
              </thead>
              <tbody>
                <HookViewTableBody id={props.id} dialogContentComponents={stateTableConfig.tableConfig} values={stateTable.table} eventHandlerOnClickRow={eventHandlerOnClick_Row} eventHandlerOnDblClickRow={eventHandlerOnDblClick_Row} eventHandlerOnClickButtonsBody={eventHandlerOnClick_ButtonsBody} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function getHeaders(tableAttributes) {
  let headers = [];
  tableAttributes.forEach((tab) => {
    tab.content.forEach((element) => {
      Object.values(element).forEach((value) => {
        headers.push({table_label: value.table_label, table_display: value.table_display, table_readOnly: value.table_readOnly, table_width: value.table_width});
      });
    });
  });
  return headers;
}
function getTypeColumns(tableAttributes) {
  let typeColumns = {};
  tableAttributes.forEach((tab) => {
    tab.content.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        typeColumns[key] = value.type;
      });
    });
  });
  return typeColumns;
}
function updateDataDialogSelectOne(dialogContent, valuesAllSelectOne) {
  for (let i = 0; i < dialogContent.length; i++) {
    for (let b = 0; b < dialogContent[i].content.length; b++) {
      Object.keys(dialogContent[i].content[b]).forEach((key) => {
        if (dialogContent[i].content[b][key].type === "select-one") {
          const valuesSelectOne = dialogContent[i].content[b][key]?.valuesSelectOne;
          if (valuesAllSelectOne !== undefined && valuesSelectOne === undefined && valuesSelectOne === null && valuesSelectOne.length === 0) {
            dialogContent[i].content[b][key].valuesSelectOne = valuesAllSelectOne[key];
          }
        }
      });
    }
  }
  return dialogContent;
}
function concactenateAllElementsWithAllTabs(tableAttributes) {
  let allElements = [];
  tableAttributes.forEach((tab) => {
    allElements = allElements.concat(tab.content);
  });
  return allElements;
}
function eventHandlerSaveModalCreate_InTable(rowValues, stateTable, typeColumns, idTable, dialogContent, valuesAllSelectOne, eventHandlerOnClickRow, eventHandlerOnDblClickRow, eventHandlerOnClickButtonsBody) {
  //create row
  let rowValuesOrder = orderJsonByKeys(typeColumns, rowValues);
  if (rowValuesOrder.id === undefined) {
    rowValuesOrder.id = Date.now().toString();
  }
  const values = addItemsSelectInJson(rowValuesOrder, rowValues);
  stateTable.table.push(rowValuesOrder);
  stateTable.rowsCreated.push(values);
}
function eventHandlerSaveModalUpdate_InTable(idRowTable, rowValues, stateTable, typeColumns) {
  if (idRowTable !== undefined) {
    //update row
    let rowValuesOrder = orderJsonByKeys(typeColumns, rowValues);
    rowValuesOrder.id = rowValues.id;
    const values = addItemsSelectInJson(rowValuesOrder, rowValues);
    const tr = getElement(idRowTable);
    if (tr !== undefined) {
      for (let tcell of tr.cells) {
        const idCtrl = tcell.children[0].children[0].id;
        const key = idCtrl.slice(idCtrl.lastIndexOf("_") + 1);
        if (Object.keys(rowValues).includes(key) === true) {
          let typeCtrl = tcell.children[0].children[0].type;
          if (typeCtrl === undefined) {
            typeCtrl = tcell.children[0].children[0].tagName.toLowerCase();
          }
          switch (typeCtrl) {
            case "checkbox":
              tcell.children[0].children[0].checked = rowValues[key];
              break;
            case "select-one":
              const index = rowValues["SELECT&" + key].index;
              tcell.children[0].children[0].getElementsByTagName("option")[index].selected = "selected";
              delete rowValues["SELECT&" + key];
              //const value = rowValues["SELECT&" + key].value;
              //const text = rowValues["SELECT&" + key].text;
              //document.getElementById(idCtrl).getElementsByTagName("option")[index].selected = "selected";
              //document.getElementById(idCtrl).getElementsByTagName("option")[index].value = value;
              //document.getElementById(idCtrl).getElementsByTagName("option")[index].text = text;
              //let select = document.querySelector("#" + idCtrl);
              //const options = Array.from(select.querySelectorAll("option"));
              //select.selectedOptions = [options[index]];
              //select.querySelectorAll("option")[index].selected = "selected";
              //const index = options.findIndex((item) => item.value === value);
              //const optionToSelect = options.find((item) => item.value === value);
              //optionToSelect.selected = true;
              //select.value = value;
              break;
            default:
              tcell.children[0].children[0].value = rowValues[key];
          }
        }
      }
      const index = stateTable.table.findIndex((row) => row !== null && row.id === rowValues.id);
      stateTable.table[index] = rowValuesOrder;
      stateTable.rowsUpdated.push(values);
    }
  }
}
function addItemsSelectInJson(rowValuesOrder, rowValues) {
  let values = JSON.parse(JSON.stringify(rowValuesOrder));
  Object.entries(rowValues).forEach(([key]) => {
    if (key.includes("SELECT&") === true) {
      values[key] = rowValues[key];
    }
  });
  return values;
}
function orderJsonByKeys(order, values) {
  let tempJson = JSON.parse(JSON.stringify(order));
  Object.keys(tempJson).forEach((key) => {
    if (values[key] === undefined) {
      tempJson[key] = "";
    } else {
      tempJson[key] = values[key];
    }
  });
  return tempJson;
}
function rowsDelete(idTable) {
  let idsRowsDeleteInTable = [];
  let idsRowsValues = [];
  const table = getElement(idTable);
  if (table !== undefined) {
    const tableRows = getRowsByIdTable(idTable);
    if (table.tHead.rows[0].cells[0].children[0].checked === true) {
      for (let tr of tableRows) {
        let idRowValues = tr.cells[0].children[0].children[0].id.replace(idTable + "_check_", "");
        idsRowsValues.push(idRowValues);
        idsRowsDeleteInTable.push(tr.id);
      }
      //borrar todo
    } else {
      for (let tr of tableRows) {
        if (tr.cells[0].children[0].children[0].checked === true) {
          let idRowValues = tr.cells[0].children[0].children[0].id.replace(idTable + "_check_", "");
          idsRowsValues.push(idRowValues);
          idsRowsDeleteInTable.push(tr.id);
        }
      }
    }
  }
  return idsRowsValues;
}
function getElement(id) {
  if (typeof document !== "undefined" && document !== null) {
    const element = document.getElementById(id);
    if (typeof element !== "undefined" && element !== null) {
      return element;
    }
  }
  return undefined;
}
function getRowsByIdTable(idTable) {
  const table = getElement(idTable);
  if (table !== undefined) {
    const tBody = table.tBodies[0];
    if (typeof tBody !== "undefined" && tBody !== null && tBody.rows.length > 0) {
      return tBody.rows;
    }
  }
  return [];
}
function columsIsFilters(idTable, key, value, typeColumn, columsFilters) {
  //aplicar todos los filtros a todas las tablas
  //columsFilters.forEach
  const filtersVisibles = rowsTableIsVisible(idTable, key, value, typeColumn);
  return filtersVisibles;
}
function columsToFilters(typeColumns) {
  let columsFilters = JSON.parse(JSON.stringify(typeColumns));
  Object.entries(typeColumns).forEach(([key, value]) => {
    if (value !== "button" && value !== "label" && value !== "img") {
      columsFilters[key] = "";
    } else {
      delete columsFilters[key];
    }
  });
  return columsFilters;
}
function rowsTableIsVisible(idTable, key, filter) {
  const rowsVisibles = [];
  const tableRows = getRowsByIdTable(idTable);
  for (let tr of tableRows) {
    for (let tcell of tr.cells) {
      if (tcell.childNodes[0].id.includes(key)) {
        const isVisible = tcell.childNodes[0].value.startsWith(filter);
        rowsVisibles.push({isVisible: isVisible, idRowTable: tr.id});
      }
    }
  }
  return rowsVisibles;
}
function rowTableHidde(idRowTable, isVisible) {
  const tr = getElement(idRowTable);
  if (tr !== undefined) {
    if (isVisible === true) {
      tr.style.display = "";
    } else {
      tr.style.display = "none";
    }
  }
}
function rowTableUnSelect(idTable) {
  const tableRows = getRowsByIdTable(idTable);
  for (let tr of tableRows) {
    tr.className = "";
    tr.style = "";
  }
}
export function rowTableSelect(idRowTable, selected, document) {
  const tr = document.getElementById(idRowTable);
  if (tr !== undefined && tr.id.endsWith("_h") === false) {
    if (selected === true) {
      tr.className = "selected";
      tr.style = "background-color: #df8fb5;color: white";
    } else {
      tr.className = "";
      tr.style = "";
    }
  }
}
