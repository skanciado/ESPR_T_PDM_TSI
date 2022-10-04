export default function HookViewTableBody(props) {
  const tableValues = JSON.parse(JSON.stringify(props.values));
  const body = [];
  if( tableValues !== ""){
    tableValues.forEach((row, r) => {
        if (row !== null) {
        const rowComponents = createRowComponents(row, r, props.id, props.showLabels, props.dialogContentComponents, props.eventHandlerOnClickButtonsBody, props.eventHandlerOnClickRow, props.eventHandlerOnDblClickRow, props.eventHandlerOnFocusOutCell);
        body.push(rowComponents);
        }
    });
  }
  return body;
}
export function createRowComponents(row, r, idTable, showLabel, dialogContentComponents, eventHandlerOnClickButtonsBody, eventHandlerOnClickRow, eventHandlerOnDblClickRow, eventHandlerOnFocusOutCell) {
  let idRowValue = "undefined";
  if (row?._id !== undefined) {
    idRowValue = row._id;
  }
  const resultRow = [];
  dialogContentComponents.forEach((item, c) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    if (value.table_display !== "none") {
      resultRow.push(
        <td key={c} id={idTable + "_c_" + c} className="px-2 py-2 text-sm border-gray-200">
          <div style={{display: value.table_display}}>{returnComponent(idTable, showLabel, r, c, key, value.type, "null", row[key], value.required, value.table_readOnly, value.valuesSelectOne, eventHandlerOnClickButtonsBody, eventHandlerOnFocusOutCell)}</div>
        </td>
      );
    }
  });
  return (
    <tr
      key={r}
      id={idTable + "_r_" + r}
      onClick={(e) => {
        if (e.detail === 1) {
          eventHandlerOnClickRow(idTable, idTable + "_r_" + r, idRowValue);
        } else if (e.detail === 2) {
          eventHandlerOnDblClickRow(idTable + "_r_" + r, idRowValue);
        }
      }}
    >
      <td className="px-5 py-3 text-base border-gray-200">
        <div>
          <input id={idTable + "_check_" + idRowValue} name={idTable + "_check_" + idRowValue} type="checkbox" />
        </div>
      </td>
      {resultRow}
    </tr>
  );
}
function returnComponent(idComponent, showLabel, indexRow, indexColumn, keyItem, typeComponent, configComponent, valueItem, requiredComponent, readOnlyComponent, valuesSelectOne, eventHandlerOnClickButtonsBody, eventHandlerOnFocusOutCell) {
  let element = undefined;
  const nameObj = idComponent + "_" + indexRow + "_" + indexColumn + "_" + keyItem;
  if (readOnlyComponent === true) {
    if (typeComponent === "text" || typeComponent === "date") {
      readOnlyComponent = "readOnly";
    } else {
      readOnlyComponent = "disabled";
    }
  } else {
    readOnlyComponent = undefined;
  }
  if (showLabel === "true" && (typeComponent === "select-one" || typeComponent === "text" || typeComponent === "textarea" || typeComponent === "date")) {
    if (typeComponent === "select-one") {
      if (valuesSelectOne !== undefined && valuesSelectOne !== null && valuesSelectOne.length > 0) {
        const itemsSelect = valuesSelectOne.find((item) => item.value === valueItem || item.key === valueItem);
        if (itemsSelect !== undefined) {
          valueItem = itemsSelect.value;
        }
      }
    }
    element = (
      <label id={nameObj} name={nameObj} defaultValue={valueItem} className="relative block w-full  appearance-none focus:outline-none sm:text-sm">
        {valueItem}
      </label>
    );
    return element;
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
          valueItem = item.key;
        }
        return (
          <option key={cb} value={item.key}>
            {item.value}
          </option>
        );
      });
    }
    element = (
      <select id={nameObj} name={nameObj} disabled={readOnlyComponent} defaultValue={valueItem} multiple={confControl.multiple} size={confControl.size} className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
      element = (
        <input
          id={nameObj}
          name={nameObj}
          type="text"
          defaultValue={valueItem}
          readOnly={readOnlyComponent}
          minLength={confControl.minLength}
          maxLength={confControl.maxLength}
          required
          onBlur={(e) => {
            eventHandlerOnFocusOutCell(indexRow, keyItem, e.value);
          }}
          autoComplete="off"
          className="relative block w-full px-3 py-2 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      );
    } else {
      element = (
        <input
          id={nameObj}
          name={nameObj}
          type="text"
          defaultValue={valueItem}
          readOnly={readOnlyComponent}
          minLength={confControl.minLength}
          maxLength={confControl.maxLength}
          onBlur={(e) => {
            eventHandlerOnFocusOutCell(indexRow, keyItem, e.target.value);
          }}
          autoComplete="off"
          className="relative block w-full px-3 py-2 placeholder-gray-500 border-b-4 border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      );
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
      element = <textarea id={nameObj} name={nameObj} defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} required rows={confControl.rows} cols={confControl.cols} autoComplete="off" className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
    } else {
      element = <textarea id={nameObj} name={nameObj} defaultValue={valueItem} readOnly={readOnlyComponent} minLength={confControl.minLength} maxLength={confControl.maxLength} rows={confControl.rows} cols={confControl.cols} autoComplete="off" className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
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
    if (valueItem === "true") {
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
          eventHandlerOnClickButtonsBody(nameObj);
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
