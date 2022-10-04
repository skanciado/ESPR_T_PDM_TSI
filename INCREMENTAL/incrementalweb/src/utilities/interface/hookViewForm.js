import createHeaderTabs from "../interface/hookViewTab";
import "../interface/css/hookViewTab.css";
import React, {useEffect} from "react";
export default function HookViewForm(props) {
  //obtiene el tamaño de las tablas con los componentes ordenados y añade los items de los select-ono
  const dialogContentUpdated = updateDataDialogContent(props.dialogContent, props.valuesAllSelectOne, props.valuesForm);
  //crear los tabs y las tablas y los componentes
  const tabsAndTables = dialogContentUpdated.map((objectTabContent, numTab) => {
    return <div key={numTab}>{createTableAndTab(objectTabContent, numTab, props.idForm, props.eventHandlerOnClickButtons)}</div>;
  });
  //obtener los nombres de los botones de los tabs
  const tabsName = dialogContentUpdated.map((objectTabContent) => objectTabContent.tabName);
  useEffect(() => {
    //dejar seleccionado la primera pestaña del tab
    document.getElementById(tabsName[0]).style.display = "block";
    document.getElementById(tabsName[0]).className += " active";
  });
  return (
    <>
      {createHeaderTabs(tabsName)}
      <form id={props.idForm}>{tabsAndTables}</form>
    </>
  );
}
function createTableAndTab(objectTabContent, numTab, idForm, eventHandlerOnClickButtons) {
  const tabName = objectTabContent.tabName;
  return (
    <div key={numTab} id={tabName} className="tabcontent">
      <table id={tabName + "_tbl"}>
        <tbody>{createTr(objectTabContent, tabName, idForm, eventHandlerOnClickButtons)}</tbody>
      </table>
    </div>
  );
}
function createTr(table, tabName, idForm, eventHandlerOnClickButtons) {
  const codeTr = table.rows.map((row, numRow) => (
    <tr key={numRow} id={tabName + "_tr_" + numRow}>
      {createTd(row, tabName, idForm, eventHandlerOnClickButtons)}
    </tr>
  ));
  return codeTr;
}
function createTd(row, tabName, idForm, eventHandlerOnClickButtons) {
  const codeTd = row.cols.map((col, numCol) => (
    <td key={numCol} id={tabName + "_td_" + numCol} colSpan={col.values.colSpan}>
      {createComponent(col, numCol, idForm, eventHandlerOnClickButtons)}
    </td>
  ));
  return codeTd;
}
function createComponent(col, numCol, idForm, eventHandlerOnClickButtons) {
  const component = col.values;
  return (
    <div id={idForm + "_div_" + numCol} style={{display: component.display}} className="px-5 py-5 text-sm border-b border-gray-200">
      <label htmlFor={idForm + "_lbl_" + col.name}>{component.label}</label>
      {returnComponent(idForm, col.name, component.type, component, component.defaultValue, component.required, component.readOnly, col.valuesSelectOne, eventHandlerOnClickButtons)}
    </div>
  );
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
          if (valuesAllSelectOne !== undefined && valuesAllSelectOne[key] !== undefined && valuesSelectOne === null && valuesSelectOne.length === 0) {
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
function returnComponent(idComponent, keyItem, typeComponent, configComponent, valueItem, requiredComponent, readOnlyComponent, valuesSelectOne, eventHandlerOnClickButtons) {
  let element = undefined;
  const nameObj = idComponent + "_" + keyItem;
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
    let defaultValue = undefined;
    let itemsSelect = undefined;
    if (valuesSelectOne !== undefined && valuesSelectOne !== null && valuesSelectOne.length > 0) {
      itemsSelect = valuesSelectOne.map((item, cb) => {
        if (item.value === valueItem || item.key === valueItem) {
          defaultValue = item.key;
        }
        return (
          <option key={cb} value={item.key}>
            {item.value}
          </option>
        );
      });
    }
    element = (
      <select id={nameObj} name={nameObj} disabled={readOnlyComponent} defaultValue={defaultValue} multiple={confControl.multiple} size={confControl.size} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        {itemsSelect}
      </select>
    );
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
      element = <input id={nameObj} name={nameObj} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <input id={nameObj} name={nameObj} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
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
    if (valueItem === true) {
      element = <input id={nameObj} type="checkbox" disabled={readOnlyComponent} defaultChecked className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <input id={nameObj} type="checkbox" disabled={readOnlyComponent} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
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
