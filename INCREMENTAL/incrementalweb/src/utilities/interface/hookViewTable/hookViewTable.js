import {useState,useContext} from "react";
import Context from "../../../transversal/context/context";
import HookViewTableHeaders from "./HookViewTableHeaders";
import HookViewTableBody from "./hookViewTableBody";
import HookViewTableFilters from "./hookViewTableFilters";
import HookViewTableButtons from "./hookViewTableButtons";
//import * as ReactDOMServer from "react-dom/server";
export default function HookViewTable(props) {
  const context = useContext(Context);
  const [stateTableConfig] = useState({tableConfig: undefined, typeColumns: undefined, headers: undefined});
  const [stateTable, setStateTable] = useState({
    numRowsVisibles: props.values.length,
    filters: [],
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
    const allElements = concatenateAllElementsWithAllTabs(dialogContentUpdated);
    const typeColumns = getTypeColumns(props.dialogContent.attributes);
    const headers = getHeaders(props.dialogContent.attributes);
    stateTableConfig.tableConfig = allElements;
    stateTableConfig.typeColumns = typeColumns;
    stateTableConfig.headers = headers;
    //const columsFilters = columsToFilters(stateTableConfig.typeColumns);
    //stateTable.filters = columsFilters;
  }
  let filter = true;
  if (props.filter !== undefined){
    filter = props.filter;
  }
  let style = "";
  let sExtendedTable = "";
  if( context.extendedMode !== undefined && 
    context.extendedMode.value !== undefined){
    sExtendedTable = context.extendedMode.value;
  }
  if (props.forceExtended !== undefined ){
    sExtendedTable = props.forceExtended;
  }

  const eventHandlerOnChange_Filter = (filters, sourceFilter) => {
    let rowsVisibles = [];
    if (sourceFilter === "exterior") {
      //reseteamos la lista de filtros que pueda tener aplicados la tabla
      stateTable.filters = [];
      if (filters.length === 0) {
        stateTable.numRowsVisibles = rowsTableVisible(props.id);
      }
    } else {
      //recuperamos la lista de filtros de la tabla que ya estan aplicados sobre la tabla
      rowsVisibles = stateTable.filters;
    }
    //recorremos los filtros a aplicar
    filters.forEach((filter) => {
      const key = Object.keys(filter)[0];
      let value = Object.values(filter)[0];
      const type = stateTableConfig.typeColumns[key];
      //miramos si es un campo de con relacion
      const relation = isRelation(type, key, props.dialogContent);
      if (relation === true && value !== undefined) {
        value = getValueRelation(value, key, props.valuesAllSelectOne);
      }
      //miramos si el valor a filtrar coincide con el de la celda. (devolvemos: si coincide true/false y el numero de fila)
      const filtersVisibles = rowsTableIsVisible(props.id, rowsVisibles, key, value, type);
      //obtnenemos el numero de filas que se han ocultado
      const numRowsVisibles = filtersVisibles.filter((item) => item.isVisibleRow === true);
      //ocultamos la fila
      filtersVisibles.forEach((row) => {
        rowTableHidde(row.idRowTable, row.isVisibleRow);
      });
      //guardamos en el estado el filtro aplicado y el numero de filas visibles
      stateTable.filters = filtersVisibles;
      stateTable.numRowsVisibles = numRowsVisibles.length;
    });
  };
  if (props.eventHandlerOnChange_Filter !== undefined) {
    eventHandlerOnChange_Filter(props.eventHandlerOnChange_Filter, "exterior");
  }
  const eventHandlerOnClick_ButtonsBody = (idButton) => {
    if (props.eventHandlerOnClickButtonsTableBody !== undefined) {
      props.eventHandlerOnClickButtonsTableBody(idButton);
    }
  };
  const eventHandlerOnFocusOut_Cell = (idRow, key, cellValue) => {
    if (stateTable.table[idRow][key] !== cellValue) {
      stateTable.table[idRow][key] = cellValue;
      stateTable.rowsUpdated.push(stateTable.table[idRow]);
    }
  };
  //TODO: this is a fucking hack
  const updateFunc =  (values) =>{
    let ids = [];
    if(stateTable.rowSelectedIdTable !== undefined){
        ids = stateTable.rowSelectedIdTable.split("_");
    }
    let index = -1;
    if(ids.length > 0 ){
        index = parseInt(ids[ids.length - 1 ]);
    }else{
        index = stateTable.table.length - 1;
    }
    let tableTemp = JSON.parse(JSON.stringify(stateTable.table));
    tableTemp[index] = values;
    setStateTable({...stateTable, table: tableTemp});
  };
  const addFunc =  (values) =>{
    let tableTemp = JSON.parse(JSON.stringify(stateTable.table));
    if( tableTemp === ""){
        tableTemp = [];
    }
    tableTemp.push( values);
    setStateTable({...stateTable, table: tableTemp});
    /*if( stateTable.table === "" ) stateTable.table = [];
    stateTable.table.push(values);*/
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
      let _idsRowValues = [];
      let tableTemp = JSON.parse(JSON.stringify(stateTable.table));
      idsRowsValues.forEach((idDelete) => {
        const index = tableTemp.findIndex((row) => row !== null && row._id === idDelete);
        _idsRowValues.push(tableTemp[index]._id);
        tableTemp[index] = null;
        //tableTemp.splice(1, index);
        //delete tableTemp[index];
      });
      stateTable.actionState = undefined;
      stateTable.rowSelectedIdValues = undefined;
      stateTable.rowSelectedIdTable = undefined;
      stateTable.rowsDeletedIds=[];
      stateTable.rowsDeletedIds.push(_idsRowValues);
      setStateTable({...stateTable, table: tableTemp});
    }
    if (idButton === "selectedRowOnClick") {
      stateTable.actionState = "processingUpdate";
      stateTable.rowSelectedIdValues = idRowValues;
      stateTable.rowSelectedIdTable = idRowTable;
    }
    if (props.eventHandlerOnClickButtonsTableBar !== undefined) {
      //
      props.eventHandlerOnClickButtonsTableBar(idButton, stateTable,updateFunc,addFunc,props.dialogContent.idString);
    }

  };
  const eventHandlerOnClick_Row = (idTable, idRowTable, idRowValues) => {
    if (idRowTable !== undefined) {
      rowTableSelect(idRowTable, idTable, document);
      if( sExtendedTable !== ''){
        eventHandlerOnClick_ButtonsBarClick("selectedRowOnClick", idTable, idRowTable, idRowValues);
      }      
    }
  };
  const eventHandlerOnDblClick_Row = (idRowTable, idRowValues) => {
    if( sExtendedTable === ''){
        if (idRowTable !== undefined) {
            eventHandlerOnClick_ButtonsBarClick("selectedRowOnClick", undefined, idRowTable, idRowValues);
        }
    }
  };
  if (props.eventHandlerModalValues !== undefined && stateTable.actionState?.startsWith("processing") === true) {
    let isExistRow = undefined;
    if (props.eventHandlerModalValues.id !== undefined) {
      isExistRow = stateTable.table.find((row) => row !== null && row.id === props.eventHandlerModalValues.id);
    }
    if (isExistRow !== undefined) {
      eventHandlerSaveModalUpdate_InTable(stateTable.rowSelectedIdTable, props.eventHandlerModalValues, stateTable);
    } else {
      eventHandlerSaveModalCreate_InTable(props.eventHandlerModalValues, stateTable);
    }
    stateTable.actionState = undefined;
  }


  if(sExtendedTable !== "" && sExtendedTable !== props.id){
    style= "hidden";
  }else if (sExtendedTable === props.id){
    style = "h-100h w-70 bg-white rounded";
  }else{
    style = "container h-50 w-full px-8 py-1 bg-white rounded";
  }

  return (
    <div className={style}>
      <div className="py-2 h-100">
        <div className="flex w-full sm:mb-0">
          {filter && <h2 className="flex text-2xl leading-tight w-50">{props.title}</h2>}
          <div className="flex align-right">
            {filter && <HookViewTableFilters id={props.id} typeColumns={stateTableConfig.typeColumns} valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnChangeFilter={eventHandlerOnChange_Filter} />}
            <HookViewTableButtons id={props.id} buttonsConfig={props.dialogContent.tableButtons} eventHandlerOnClickButtonsBar={eventHandlerOnClick_ButtonsBarClick} />
          </div>
        </div>
        <div className="py-4 -mx-4  sm:-mx-8 sm:px-8 h-90">
          <div className="min-w-full overflow-x-auto overflow-y-auto rounded-lg shadow h-100">
            <table id={props.id} className="min-w-full leading-normal">
              <thead>
                <HookViewTableHeaders id={props.id} headers={stateTableConfig.headers} />
              </thead>
              <tbody>
                <HookViewTableBody id={props.id} showLabels={props.showLabels} dialogContentComponents={stateTableConfig.tableConfig} values={stateTable.table} eventHandlerOnClickRow={eventHandlerOnClick_Row} eventHandlerOnDblClickRow={eventHandlerOnDblClick_Row} eventHandlerOnClickButtonsBody={eventHandlerOnClick_ButtonsBody} eventHandlerOnFocusOutCell={eventHandlerOnFocusOut_Cell} />
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
          if (valuesAllSelectOne !== undefined) {
            dialogContent[i].content[b][key].valuesSelectOne = valuesAllSelectOne[key];
          } else {
            const valuesSelectOne = dialogContent[i].content[b][key]?.valuesSelectOne;
            if (valuesSelectOne === undefined && valuesSelectOne === null && valuesSelectOne.length === 0) {
              dialogContent[i].content[b][key].valuesSelectOne = valuesSelectOne;
            }
          }
        }
      });
    }
  }
  return dialogContent;
}
function getValueRelation(value, key, valuesAllSelectOne) {
  const valueRelation = valuesAllSelectOne[key].find((item) => item.key === value);
  return valueRelation.value;
}
function isRelation(type, key, dialogContent) {
  let rel = undefined;
  if (type === "select-one") {
    dialogContent.attributes.forEach((cont) => {
      const relation = cont.content.find((item) => Object.keys(item)[0] === key);
      if (relation[key].isRelation === true) {
        rel = true;
        return;
      }
    });
  }
  return rel;
}
function concatenateAllElementsWithAllTabs(tableAttributes) {
  let allElements = [];
  tableAttributes.forEach((tab) => {
    allElements = allElements.concat(tab.content);
  });
  return allElements;
}
function eventHandlerSaveModalCreate_InTable(rowValues, stateTable) {
  //create row
  if (rowValues.id === undefined) {
    rowValues.id = Date.now().toString();
  }
  const updatedRowValues = updateSelectValues(rowValues);
  const deletedRowValues = deleteSelectValues(updatedRowValues);
  stateTable.table.push(deletedRowValues);
  stateTable.rowsCreated.push(updatedRowValues);
}
function eventHandlerSaveModalUpdate_InTable(idRowTable, rowValues, stateTable) {
  if (idRowTable !== undefined) {
    //update row
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
            case "list":
                let listValues = Object.keys(rowValues).filter( value =>  value.startsWith(key));
                listValues.forEach( async (listItems) =>{
                    delete rowValues[listItems];
                });
                break;
            default:
              tcell.children[0].children[0].value = rowValues[key];
          }
        }
      }
      const index = stateTable.table.findIndex((row) => row !== null && row._id === rowValues._id);
      const updatedRowValues = updateSelectValues(rowValues);
      stateTable.table[index] = updatedRowValues;
      stateTable.rowsUpdated.push(updatedRowValues);
    }
  }
}
function deleteSelectValues(rowValues) {
  let deletedRowValues = JSON.parse(JSON.stringify(rowValues));
  const arrSelects = Object.entries(rowValues).filter((item) => item[0].startsWith("SELECT&"));
  if (arrSelects !== undefined) {
    arrSelects.forEach((item) => {
      delete deletedRowValues[item[0]];
    });
  }
  return deletedRowValues;
}
function updateSelectValues(rowValues) {
  let updatedRowValues = JSON.parse(JSON.stringify(rowValues));
  const arrSelects = Object.entries(rowValues).filter((item) => item[0].startsWith("SELECT&"));
  if (arrSelects !== undefined) {
    arrSelects.forEach((item) => {
      const key = item[0].replace("SELECT&", "");
      updatedRowValues[key] = item[1].value;
    });
  }
  return updatedRowValues;
}
function getValueComponent(element) {
  let typeCtrl = element.type;
  if (typeCtrl === undefined) {
    typeCtrl = element.tagName.toLowerCase();
  }
  switch (typeCtrl) {
    case "checkbox":
      return element.checked;
    case "button":
      return element.innerText;
    case "select-one":
      return element.selectedOptions[0].text;
    case "label":
      if (element.childNodes.length > 0) return element?.childNodes[0].nodeValue;
      else return "";
    default:
      return element.value;
  }
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
function isVisibleItem(valueElement, valueFilter) {
  if (valueFilter === undefined) {
    return true;
  }
  let isVisible = valueElement.startsWith(valueFilter);
  if (valueFilter.includes("*")) {
    isVisible = true;
    const filters = valueFilter.split("*");
    const filterKo = filters.findIndex((filter) => valueElement.includes(filter) === false);
    if (filterKo !== -1) {
      return false;
    }
  }
  return isVisible;
}
function rowsTableIsVisible(idTable, rowsVisibles, key, valueFilter) {
  const tableRows = getRowsByIdTable(idTable);
  for (let tr of tableRows) {
    for (let tcell of tr.cells) {
      if (tcell.childNodes[0].childNodes[0].id.includes("_" + key)) {
        //verificamos si tiene que ser visible si cumple el filtro
        const valueElement = getValueComponent(tcell.childNodes[0].childNodes[0]);
        const isVisible = isVisibleItem(valueElement, valueFilter);
        //buscamos la fila si existe
        const indExistRowInStateFilters = rowsVisibles.findIndex((row) => row.idRowTable === tr.id);
        if (indExistRowInStateFilters === -1) {
          //si no existe la fila
          rowsVisibles.push({idRowTable: tr.id, isVisibleRow: isVisible, filterRow: [{[key]: valueFilter, isVisibleCol: isVisible}]});
        } else {
          //buscamos si existe para esa fila el filtro de columna por el que se esta buscando
          const indExistKeyInFilter = rowsVisibles[indExistRowInStateFilters].filterRow.findIndex((row) => Object.keys(row)[0] === key);
          if (indExistKeyInFilter === -1) {
            //si no existe el filtro de columna por el que se esta buscando se añade a la array de filtros de columnas de esa fila
            rowsVisibles[indExistRowInStateFilters].filterRow.push({[key]: valueFilter, isVisibleCol: isVisible});
            if (isVisible === false) {
              rowsVisibles[indExistRowInStateFilters].isVisibleRow = false;
            }
          } else {
            //si existe el filtro de columna por el que se esta buscando se actualiza en la array de filtros de esa fila el valor del filtro de esa columna
            rowsVisibles[indExistRowInStateFilters].filterRow[indExistKeyInFilter][key] = valueFilter;
            rowsVisibles[indExistRowInStateFilters].filterRow[indExistKeyInFilter].isVisibleCol = isVisible;
            //buscamos en todos los filtros de esa columna si existe alguno que no sea visible
            const isVisibleRow = rowsVisibles[indExistRowInStateFilters].filterRow.find((row) => row.isVisibleCol === false);
            if (isVisibleRow !== undefined) {
              rowsVisibles[indExistRowInStateFilters].isVisibleRow = false;
            } else {
              rowsVisibles[indExistRowInStateFilters].isVisibleRow = true;
            }
          }
        }
      }
    }
  }
  return rowsVisibles;
}
function rowsTableVisible(idTable) {
  const tableRows = getRowsByIdTable(idTable);
  for (let tr of tableRows) {
    tr.style.display = "";
  }
  return tableRows.length;
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
    tr.style.backgroundColor = "";
    tr.style.color = "";
  }
}
export function rowTableSelect(idRowTable, idTable, document) {
  let selected = false;
  const tr = document.getElementById(idRowTable);
  if (tr !== undefined && tr.id.endsWith("_h") === false) {
    if (tr.className !== "selected") {
      selected = true;
    }
    rowTableUnSelect(idTable);
    if (selected === true) {
      tr.className = "selected";
      tr.style.backgroundColor = "#3c3c3c";
      tr.style.color = "white";
    } else {
      tr.className = "";
      tr.style.backgroundColor = "";
      tr.style.color = "";
    }
  }
}
