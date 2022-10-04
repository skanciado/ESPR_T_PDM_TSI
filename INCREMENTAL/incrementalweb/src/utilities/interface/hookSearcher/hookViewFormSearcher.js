import {useContext} from "react";
import createHeaderTabsSearcher from "../../interface/hookSearcher/hookViewTabSearcher";
import "../../interface/css/hookViewTabSearcher.css";
import "../../interface/css/hookViewTableFilters.css";
import React, {useEffect} from "react";
import Context from "../../../transversal/context/context";
export default function HookViewFormSearcher(props) {
  const context = useContext(Context);
  //obtiene el tamaño de las tablas con los componentes ordenados y añade los items de los select-ono
  const dialogContentUpdated = updateDataDialogContent(props.dialogContent, props.valuesAllSelectOne, props.valuesForm);
  //crear los tabs y las tablas y los componentes
  const tabsAndTables = dialogContentUpdated.map((objectTabContent, numTab) => {
    return <div key={numTab}>{createTableAndTab(objectTabContent, numTab, props.idForm, props.eventHandlerOnClickButtons, context)}</div>;
  });
  //obtener los nombres de los botones de los tabs
  const tabsName = dialogContentUpdated.map((objectTabContent) => objectTabContent.tabName + " ");
  const table = createGridValues(props);
  useEffect(() => {
    //dejar seleccionado la primera pestaña del tab
    document.getElementById(tabsName[0]).style.display = "block";
    //los componentes generados para los tabs no pueden tener el mismo nombre que los componentes de tab de la primera ventana, se ha añadido un " ".
    document.getElementsByClassName("tablinksSearcher")[0].className += " active";
    const btnOk = document.getElementById("searcherModalOK");
    btnOk.setAttribute("disabled", "");
  });
  return (
    <>
      {createHeaderTabsSearcher(tabsName, "")}
      <form id={props.idForm}>{tabsAndTables}</form>
      {table}
    </>
  );
}
function createGridValues(props) {
  let dialogContent = [];
  props.dialogContent.forEach((tab) => {
    dialogContent = dialogContent.concat(tab.content);
  });
  const headers = dialogContent.map((header, h) => (
    <th key={h} scope="col" className="px-5 py-3 text-base font-semibold text-left border-b border-gray-200">
      {Object.values(header)[0].table_label}
    </th>
  ));
  const tableRows = props.valuesGrid.map((row, r) => {
    const cells = dialogContent.map((cell, c) => {
      const key = Object.keys(cell)[0];
      let value = row[key];
      const valueCell = Object.values(cell)[0];
      let nodeVal = row._id;
      if (valueCell.type === "select-one" && props.valuesAllSelectOne[key] !== undefined && props.valuesAllSelectOne[key] !== null) {
        const itemsSelect = props.valuesAllSelectOne[key].find((item) => item.value === value || item.key === value);
        if (itemsSelect !== undefined) {
          value = itemsSelect.value;
        }
      }
      //data-value se almacena dentro del html en dataset.value
      return (
        <td key={c} id={key + "_c_" + c + "_r_" + r} data-value={nodeVal} className="px-2 py-2 text-sm border-gray-200 bg-none">
          {value}
          hola
        </td>
      );
    });
    return (
      <tr
        key={r}
        id={"searcherTable_r_" + r}
        onClick={() => {
          eventHandlerOnClickRow("searcherTable", "searcherTable_r_" + r);
        }}
      >
        {cells}
      </tr>
    );
  });
  return (
    <div className="container h-50 w-full px-8 py-1 bg-white rounded bg-transparent border-searcher">
      <div className="py-2 h-100">
        <div className="py-4 -mx-4  sm:-mx-8 sm:px-8 h-90">
          <div className="min-w-full overflow-x-auto overflow-y-auto rounded-lg shadow h-100">
            <table id={"searcherTable"} className="min-w-full leading-normal">
              <thead>
                <tr className="bg-transparent" id={"searcherTable_h"}>
                  {headers}
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function createTableAndTab(objectTabContent, numTab, idForm, eventHandlerOnClickButtons, context) {
  const tabName = objectTabContent.tabName + " ";
  return (
    <div key={numTab} id={tabName} className="tabcontentSearcher">
      <table style={{width: "100%"}} id={tabName + "_tbl"}>
        <tbody>{createTr(objectTabContent, tabName, idForm, eventHandlerOnClickButtons, context)}</tbody>
      </table>
    </div>
  );
}
function createTr(table, tabName, idForm, eventHandlerOnClickButtons, context) {
  const codeTr = table.rows.map((row, numRow) => (
    <tr key={numRow} id={tabName + "_tr_" + numRow}>
      {createTd(row, tabName, idForm, eventHandlerOnClickButtons, context)}
    </tr>
  ));
  return codeTr;
}
function createTd(row, tabName, idForm, eventHandlerOnClickButtons, context) {
  const codeTd = row.cols.map((col, numCol) => (
    <td key={numCol} id={tabName + "_td_" + numCol} colSpan={col.values.colSpan}>
      {createComponent(col, numCol, idForm, eventHandlerOnClickButtons, context)}
    </td>
  ));
  return codeTd;
}
function createComponent(col, numCol, idForm, eventHandlerOnClickButtons, context) {
  const component = col.values;
  if (component.display !== "none") {
    return (
      <div id={idForm + "_div_" + numCol} style={{display: component.display, flexDirection: "column"}} className="px-5 py-5 text-sm border-gray-200">
        <div className="flex" style={{flexDirection: "column"}}>
          <label htmlFor={idForm + "_lbl_" + col.name}>{component.label}</label>
        </div>
        {returnComponent(idForm, col.name, component.type, component, component.defaultValue, component.required, component.readOnly, col.valuesSelectOne, eventHandlerOnClickButtons, context)}
      </div>
    );
  } else {
    return <></>;
  }
}
function updateDataDialogContent(dialogContent, valuesAllSelectOne, valuesForm) {
  const tablesSize = dialogContent.map((tab) => {
    tab.columns = 2;
    let tableSize = {};
    tableSize.tabName = tab.tabName;
    tableSize.rows = [];
    let row = {cols: []};
    let numElements = 0;
    const lastKey = Object.keys(tab.content[tab.content.length - 1])[0];
    tab.content.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        const colSpan = parseInt(value.colSpan);
        let valuesSelectOne = undefined;
        if (value.type === "select-one") {
          valuesSelectOne = value.valuesSelectOne;
          if (valuesAllSelectOne !== undefined && valuesAllSelectOne[key] !== undefined && (valuesSelectOne === null || valuesSelectOne === undefined || valuesSelectOne.length === 0)) {
            valuesSelectOne = valuesAllSelectOne[key];
          }
        }
        if (valuesForm !== undefined && valuesForm[key] !== undefined) {
          value.defaultValue = valuesForm[key];
        }
        numElements++;
        if (colSpan === tab.columns) {
          row.cols.push({name: key, values: value, valuesSelectOne: valuesSelectOne});
          tableSize.rows.push(row);
          numElements = 0;
          row = {cols: []};
        } else {
          if (numElements + colSpan >= tab.columns) {
            row.cols.push({name: key, values: value, valuesSelectOne: valuesSelectOne});
          }
          if (numElements + colSpan > tab.columns || lastKey === key) {
            tableSize.rows.push(row);
            numElements = 0;
            row = {cols: []};
          }
        }
      });
    });
    return tableSize;
  });
  return tablesSize;
}
function returnComponent(idComponent, keyItem, typeComponent, configComponent, valueItem, requiredComponent, readOnlyComponent, valuesSelectOne, eventHandlerOnClickButtons, context) {
  let element = undefined;
  const nameObj = idComponent + "_0" + keyItem;
  const isRelation = configComponent.isRelation;
  if (readOnlyComponent === true) {
    if (typeComponent === "text" || typeComponent === "date") {
      readOnlyComponent = "readOnly";
    } else {
      readOnlyComponent = "disabled";
    }
  } else {
    readOnlyComponent = undefined;
  }
  if (typeComponent === "select-one") {
    let confControl = {size: 0, multiple: false};
    if (configComponent.size !== undefined && configComponent.size !== null) {
      confControl.size = configComponent.size;
    }
    if (configComponent.multiple !== undefined && configComponent.multiple !== null) {
      confControl.multiple = configComponent.multiple;
    }
    let itemsSelect = undefined;
    if (valuesSelectOne !== undefined && valuesSelectOne !== null && valuesSelectOne.length > 0) {
      itemsSelect = valuesSelectOne.map((item, cb) => {
        if (item.value === valueItem || item.key === valueItem) {
          if (isRelation === true) {
            valueItem = item.value;
          } else {
            valueItem = item.key;
          }
        }
        /*option.addEventListener("click", function() {
          console.log("Test");
        });*/
        if (isRelation === true) {
          return (
            <option key={cb} data-value={item.key}>
              {item.value}
            </option>
          );
        } else {
          return (
            <option key={cb} value={item.key}>
              {item.value}
            </option>
          );
        }
      });
    }
    if (isRelation === true) {
      element = (
        <div className="inline-flex">
          <input id={nameObj} name={nameObj} list={nameObj + "-lst"} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          <datalist id={nameObj + "-lst"}>{itemsSelect}</datalist>
        </div>
      );
    } else {
      element = (
        <select id={nameObj} name={nameObj} disabled={readOnlyComponent} defaultValue={valueItem} multiple={confControl.multiple} size={confControl.size} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {itemsSelect}
        </select>
      );
    }
  }
  if (typeComponent === "text") {
    let confControl = {minLength: 0, maxLength: 1000};
    if (configComponent.minLength !== undefined && configComponent.minLength !== null) {
      confControl.minLength = configComponent.minLength;
    }
    if (configComponent.maxLength !== undefined && configComponent.maxLength !== null) {
      confControl.maxLength = configComponent.maxLength;
    }
    if (requiredComponent === true) {
      element = <input id={nameObj} name={nameObj} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <input id={nameObj} name={nameObj} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    }
  }
  if (typeComponent === "textarea") {
    let confControl = {minLength: 0, maxLength: 1000};
    if (configComponent.minLength !== undefined && configComponent.minLength !== null) {
      confControl.minLength = configComponent.minLength;
    }
    if (configComponent.maxLength !== undefined && configComponent.maxLength !== null) {
      confControl.maxLength = configComponent.maxLength;
    }
    if (requiredComponent === true) {
      element = <textarea id={nameObj} name={nameObj} defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} required rows={confControl.rows} cols={confControl.cols} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <textarea id={nameObj} name={nameObj} defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} rows={confControl.rows} cols={confControl.cols} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    }
  }
  if (typeComponent === "date") {
    //const date = new Date(valueItem);
    //const valueItemIso = date.toISOString();
    let confControl = {min: "1900-01-01"};
    if (configComponent.min !== undefined && configComponent.min !== null) {
      confControl.min = configComponent.min;
    }
    if (requiredComponent === true) {
      if (configComponent.max !== undefined && configComponent.max !== null) {
        confControl.max = configComponent.max;
        element = <input id={nameObj} name={nameObj} type="date" defaultValue={valueItem} readOnly={readOnlyComponent} min={confControl.min} max={confControl.max} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
      } else {
        element = <input id={nameObj} name={nameObj} type="date" defaultValue={valueItem} readOnly={readOnlyComponent} min={confControl.min} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
      }
    } else {
      if (configComponent.max !== undefined && configComponent.max !== null) {
        confControl.max = configComponent.max;
        element = <input id={nameObj} name={nameObj} type="date" defaultValue={valueItem} readOnly={readOnlyComponent} min={confControl.min} max={confControl.max} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
      } else {
        element = <input id={nameObj} name={nameObj} type="date" defaultValue={valueItem} readOnly={readOnlyComponent} min={confControl.min} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
      }
    }
  }
  if (typeComponent === "checkbox") {
    if (valueItem === true || valueItem === 1) {
      element = <input id={nameObj} type="checkbox" disabled={readOnlyComponent} defaultChecked className="relative block checkboxModal px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <input id={nameObj} type="checkbox" disabled={readOnlyComponent} className="relative block checkboxModal px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    }
  }
  if (typeComponent === "button") {
    let confControl = {src: ""};
    if (configComponent.src !== undefined && configComponent.src !== null) {
      confControl.src = configComponent.src;
    }
    element = (
      <button
        id={nameObj}
        name={nameObj}
        type="button"
        disabled={readOnlyComponent}
        onClick={() => {
          eventHandlerOnClickButtons(nameObj);
        }}
        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <img src={confControl.src} alt="" />
        {valueItem}
      </button>
    );
  }
  if (typeComponent === "label") {
    element = (
      <label id={nameObj} name={nameObj}>
        {valueItem}
      </label>
    );
  }
  if (typeComponent === "img") {
    let confControl = {width: undefined, height: undefined};
    if (configComponent.width !== undefined && configComponent.width !== null) {
      confControl.width = configComponent.width;
    }
    if (configComponent.height !== undefined && configComponent.height !== null) {
      confControl.height = configComponent.height;
    }
    if ((confControl.width !== undefined && configComponent.width !== null) || (confControl.height !== undefined && configComponent.height !== null)) {
      element = <img id={nameObj} name={nameObj} src={valueItem} width={confControl.width} height={confControl.height} alt="" />;
    } else {
      element = <img id={nameObj} name={nameObj} src={valueItem} alt="" />;
    }
  }
  if (typeComponent === "svg") {
    let confControl = {width: undefined, height: undefined};
    if (configComponent.width !== undefined && configComponent.width !== null) {
      confControl.width = configComponent.width;
    }
    if (configComponent.height !== undefined && configComponent.height !== null) {
      confControl.height = configComponent.height;
    }
    if ((confControl.width !== undefined && configComponent.width !== null) || (confControl.height !== undefined && configComponent.height !== null)) {
      element = (
        <svg id={nameObj} name={nameObj} width={confControl.width} height={confControl.height} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={confControl.path} fill="white" />
        </svg>
      );
    } else {
      element = (
        <svg id={nameObj} name={nameObj} src={valueItem} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={confControl.path} fill="white" />
        </svg>
      );
    }
  }
  return element;
}
const eventHandlerOnClickRow = (idTable, idRowTable) => {
  if (idRowTable !== undefined) {
    rowTableUnSelect(idTable);
    rowTableSelect(idRowTable, true, document);
  }
};
function rowTableUnSelect(idTable) {
  const tableRows = getRowsByIdTable(idTable);
  for (let tr of tableRows) {
    tr.className = "";
    tr.style.backgroundColor = "";
    tr.style.color = "";
  }
}
export function rowTableSelect(idRowTable, selected, document) {
  const tr = document.getElementById(idRowTable);
  if (tr !== undefined && tr.id.endsWith("_h") === false) {
    if (selected === true) {
      tr.className = "selected";
      tr.style.backgroundColor = "#3c3c3c";
      tr.style.color = "white";
      const btnOk = document.getElementById("searcherModalOK");
      btnOk.removeAttribute("disabled");
    } else {
      tr.className = "";
      tr.style.backgroundColor = "";
      tr.style.color = "";
    }
  }
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
