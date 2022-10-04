import {useContext, useState} from "react";
import createHeaderTabs from "../interface/hookViewTab";
import "../interface/css/hookViewTab.css";
import "../interface/css/hookViewTableFilters.css";
import HookViewTable from "../interface/hookViewTable/hookViewTable";
import React, {useEffect} from "react";
import Context from "../../transversal/context/context";
export default function HookViewForm(props) {
  const context = useContext(Context);
  const [stateForm] = useState({
    elementDbId: props.valuesForm?._id,
    context: context,
  });
  //obtiene el tamaño de las tablas con los componentes ordenados y añade los items de los select-ono
  const dialogContentUpdated = updateDataDialogContent(props.dialogContent, props.valuesAllSelectOne, props.valuesForm);
  //crear los tabs y las tablas y los componentes
  const tabsAndTables = dialogContentUpdated.map((objectTabContent, numTab) => {
    return <div key={numTab}>{createTableAndTab(objectTabContent, numTab, props.idForm, stateForm, props.eventHandlerOnClickButtons, props.action, props.valuesAction, context)}</div>;
  });
  //obtener los nombres de los botones de los tabs
  const tabsName = dialogContentUpdated.map((objectTabContent) => objectTabContent.tabName);
  useEffect(() => {
    //dejar seleccionado la primera pestaña del tab
    document.getElementById(tabsName[0]).style.display = "block";
    document.getElementsByClassName("tablinks")[0].className += " active";
  });
  let style = "";
  let sExtendedTable = "";
  if (context.extendedMode !== undefined && context.extendedMode.value !== undefined) {
    sExtendedTable = context.extendedMode.value;
  }
  if (props.forceExtended !== undefined) {
    sExtendedTable = props.forceExtended;
  }
  if (sExtendedTable !== "") {
    style = "-expanded";
  }
  return (
    <>
      {createHeaderTabs(tabsName, style)}
      <form id="tabsAndTables">{tabsAndTables}</form>
    </>
  );
}
function createTableAndTab(objectTabContent, numTab, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context) {
  const tabName = objectTabContent.tabName;
  return (
    <div key={numTab} id={tabName} className="tabcontent">
      <table id={tabName + "_tbl"}>
        <tbody>{createTr(objectTabContent, tabName, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context)}</tbody>
      </table>
    </div>
  );
}
function createTr(table, tabName, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context) {
  const codeTr = table.rows.map((row, numRow) => (
    <tr key={numRow} id={tabName + "_tr_" + numRow}>
      {createTd(row, tabName, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context)}
    </tr>
  ));
  return codeTr;
}
function createTd(row, tabName, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context) {
  const codeTd = row.cols.map((col, numCol) => (
    <td key={numCol} id={tabName + "_td_" + numCol} colSpan={col.values.colSpan}>
      {createComponent(col, numCol, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context)}
    </td>
  ));
  return codeTd;
}
function createComponent(col, numCol, idForm, stateForm, eventHandlerOnClickButtons, action, valuesAction, context) {
  const component = col.values;
  if (component.display !== "none") {
    return (
      <div id={idForm + "_div_" + numCol} style={{display: component.display, flexDirection: "column"}} className="px-5 py-5 text-sm border-gray-200">
        <div className="flex" style={{flexDirection: "column"}}>
          <label htmlFor={idForm + "_lbl_" + col.name}>{component.label}</label>
        </div>
        {returnComponent(idForm, stateForm, col.name, component.type, component, component.defaultValue, component.required, component.readOnly, col.valuesSelectOne, eventHandlerOnClickButtons, action, valuesAction, context)}
      </div>
    );
  } else {
    return <></>;
  }
}
function updateDataDialogContent(dialogContent, valuesAllSelectOne, valuesForm) {
  //const tablesSize = dialogContent.map((tab) => {
  let temDialogContent = JSON.parse(JSON.stringify(dialogContent));
  const tablesSize = temDialogContent.map((tab) => {
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
        } else if (value.type === "list") {
          value.defaultValue = [];
          let listValues = Object.keys(valuesForm).filter((value) => value.startsWith(key));
          listValues.forEach(async (listItems) => {
            if (listItems.endsWith("__id")) {
              let nameAttr = listItems.slice(0, -4);
              const arrayName = nameAttr.split("_");
              const calcName = arrayName[0] + "_" + arrayName[1] + "_" + (parseInt(arrayName[2]) + 1) + "_name";
              value.defaultValue.push({_id: valuesForm[listItems], name: valuesForm[calcName]});
            }
          });
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
function autoasignableValueItem(configComponent, action, valuesAction, valueItem) {
  if (configComponent?.autoasignable !== undefined) {
    if (action === "busqueda") {
      //console.log("b");
    } else {
      if (action === "processingCreate" && configComponent?.autoasignable.event_when.find((item) => item === "create") !== undefined) {
        if (configComponent?.autoasignable.value === "currentdate") {
          const date = new Date();
          valueItem = date.toISOString().slice(0, 10);
          //valueItem = date.toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day: "2-digit"});
        }
        if (configComponent?.autoasignable.value === "currentuser") {
          valueItem = valuesAction.user;
        }
        if (configComponent?.autoasignable.value === "currentgroup") {
          valueItem = valuesAction.group;
        }
      }
      if (action === "processingUpdate" && configComponent?.autoasignable.event_when.find((item) => item === "update") !== undefined) {
        if (configComponent?.autoasignable.value === "currentdate") {
          const date = new Date();
          valueItem = date.toISOString().slice(0, 10);
          //valueItem = date.toLocaleDateString(undefined, {year: "numeric", month: "2-digit", day: "2-digit"});
        }
        if (configComponent?.autoasignable.value === "currentuser") {
          valueItem = valuesAction.user;
        }
      }
    }
  }
  return valueItem;
}
function eventHandlerOnClick_ButtonsTableBar(idButton, stateTable, updateFunc, addFunc, idString) {
  if (idButton === "selectedRowOnClick") {
  }
  if (idButton === "create") {
    let element = undefined;
    let stringIds = idString.split("&");
    element = document.getElementById(stringIds[2]);
    element.addFunc = addFunc;
    element = document.getElementById("openModalSearcher");
    element.className = idString;
    element.click();
  }
  if (idButton === "delete") {
    console.log("Delete");
  }
}
function returnComponent(idComponent, stateForm, keyItem, typeComponent, configComponent, valueItem, requiredComponent, readOnlyComponent, valuesSelectOne, eventHandlerOnClickButtons, action, valuesAction, context) {
  valueItem = autoasignableValueItem(configComponent, action, valuesAction, valueItem);
  let element = undefined;
  const nameObj = idComponent + "_" + keyItem;
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
      let editButton = undefined;
      if (!readOnlyComponent || configComponent.relationKind === "Edge") {
        editButton = (
          <button
            id={nameObj + "_selection"}
            name={nameObj + "_selection"}
            type="button"
            disabled={undefined}
            visibility={readOnlyComponent ? "hidden" : ""}
            onClick={() => {
              let element = undefined;
              let sStatusCurrentValue = valueItem;
              let sCurrentStatusEditor = document.getElementById(nameObj);
              if (sCurrentStatusEditor.value !== valueItem) {
                sStatusCurrentValue = sCurrentStatusEditor.value;
              }
              // Diálogo para mostrar LifecycleGraph no está preparado todavía.
              // Comentamos el filtro para usar siempre openModalSearcher,
              // hasta que la implementación esté lista
              let bCond1 = configComponent.relationName === "CurrentLifecycle";
              let bCond2 = configComponent.relationValue === "currentStatus";
              if (!(bCond1 && bCond2)) {
                let bCond3 = configComponent.relationName === "CurrentWorkflow";
                let bCond4 = configComponent.relationValue === "currentTask";
                if (!(bCond3 && bCond4)) {
                  element = document.getElementById("openModalSearcher");
                } else {
                  element = document.getElementById("openModalWorkflowGraph");
                }
              } else {
                element = document.getElementById("openModalLifecycleGraph");
              }
              let statusDbInfo = configComponent.valuesSelectOne.find((element) => element.value === sStatusCurrentValue);
              element.className = configComponent.relationName + "&" + configComponent.relationValue + "&" + nameObj + "&" + typeComponent + "&" + stateForm.elementDbId + "&" + statusDbInfo?.key;
              element.click();
            }}
            className="relative flex justify-center px-4 py-2 text-sm font-medium text-white bg-incremental border border-transparent rounded-md group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ...
          </button>
        );
      }
      element = (
        <div className="inline-flex">
          <input id={nameObj} name={nameObj} list={nameObj + "-lst"} type="text" defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
          <datalist id={nameObj + "-lst"}>{itemsSelect}</datalist>
          {editButton}
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
  if (typeComponent === "list") {
    let configTest = {
      tableButtons: {
        create: {
          label: null,
          readOnly: false,
          src: null,
          width: 19,
          height: 18,
          path: "M12.668 7.33333H8.66797V3.33333C8.66797 2.96514 8.36949 2.66666 8.0013 2.66666C7.63311 2.66666 7.33464 2.96514 7.33464 3.33333V7.33333H3.33464C2.96645 7.33333 2.66797 7.63181 2.66797 8C2.66797 8.36819 2.96645 8.66666 3.33464 8.66666H7.33464V12.6667C7.33464 13.0349 7.63311 13.3333 8.0013 13.3333C8.36949 13.3333 8.66797 13.0349 8.66797 12.6667V8.66666H12.668C13.0362 8.66666 13.3346 8.36819 13.3346 8C13.3346 7.63181 13.0362 7.33333 12.668 7.33333Z",
        },
        delete: {
          label: null,
          readOnly: false,
          src: null,
          width: 19,
          height: 18,
          path: "M12.9987 3.00094H9.66537V1.88761V1.8876C9.6328 0.999005 8.88738 0.304278 7.9987 0.334272H5.9987V0.334272C5.11 0.304281 4.3646 0.999005 4.33203 1.8876V3.00094H0.998698C0.630508 3.00094 0.332031 3.29942 0.332031 3.66761C0.332031 4.0358 0.630508 4.33427 0.998698 4.33427H1.66536V11.6676C1.66536 12.7722 2.5608 13.6676 3.66536 13.6676H10.332C11.4366 13.6676 12.332 12.7722 12.332 11.6676V4.33427H12.9987C13.3669 4.33427 13.6654 4.0358 13.6654 3.66761C13.6654 3.29942 13.3669 3.00094 12.9987 3.00094ZM5.66536 1.88667C5.66536 1.78 5.80536 1.66667 5.9987 1.66667H7.9987C8.19203 1.66667 8.33203 1.78 8.33203 1.88667V3H5.66536V1.88667ZM10.9987 11.6667C10.9987 12.0349 10.7002 12.3333 10.332 12.3333H3.66536C3.29717 12.3333 2.9987 12.0349 2.9987 11.6667V4.33334H10.9987V11.6667Z",
        },
      },
      attributes: [
        {
          tabName: "Test",
          content: [
            {
              _id: {
                position: 1,
                type: "label",
                label: "Id User",
                colSpan: "0",
                display: "block",
                readOnly: true,
                defaultValue: "",
                required: true,
                minLength: "0",
                maxLength: "0",
                table_display: "none ",
                table_readOnly: "enabled",
                table_label: "",
                table_width: 0,
              },
            },
            {
              name: {
                position: 2,
                type: "label",
                label: "Nombre",
                colSpan: "2",
                display: "block",
                readOnly: true,
                defaultValue: "",
                required: true,
                minLength: "0",
                maxLength: "9000",
                table_display: "block",
                table_readOnly: "enabled",
                table_label: "Nombre",
                table_width: 0,
              },
            },
          ],
        },
      ],
      idString: configComponent.targetCollection + "&" + configComponent.relationValue + "&" + nameObj + "&list&" + stateForm.elementDbId + "&",
    };
    element = <HookViewTable id={keyItem} title={keyItem} showLabels="false" dialogContent={configTest} values={valueItem} filter={false} forceExtended="" eventHandlerOnClickButtonsTableBar={eventHandlerOnClick_ButtonsTableBar} eventHandlerOnDblClickRow={undefined} eventHandlerOnClickButtonsBody={undefined} eventHandlerOnFocusOutCell={undefined} />;
    /*valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnClickButtonsTableBar={eventHandlerOnClick_ButtonsTableBar} eventHandlerOnClickButtonsTableBody={eventHandlerOnClick_ButtonsTableBody} eventHandlerModalValues={modalState.valuesModal} eventHandlerOnChange_Filter={tableFilters}*/
  }
  return element;
}
