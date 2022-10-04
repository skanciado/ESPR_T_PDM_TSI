export default function HookViewTableBody(props) {
  const tableValues = JSON.parse(JSON.stringify(props.values));
  const body = [];
  tableValues.forEach((row, r) => {
    if (row !== null) {
      const rowComponents = createRowComponents(row, r, props.id, props.dialogContentComponents, props.eventHandlerOnClickButtonsBody, props.eventHandlerOnClickRow, props.eventHandlerOnDblClickRow);
      body.push(rowComponents);
    }
  });
  return body;
}
export function createRowComponents(row, r, idTable, dialogContentComponents, eventHandlerOnClickButtonsBody, eventHandlerOnClickRow, eventHandlerOnDblClickRow) {
  let idRowValue = "undefined";
  if (row?.id !== undefined) {
    idRowValue = row.id;
  }
  const resultRow = Object.entries(row).map(([key, value], c) => {
    const column = dialogContentComponents.find((element) => Object.keys(element)[0] === key);
    return (
      <td key={c} id={idTable + "_c_" + c} className="px-5 py-5 text-sm border-b border-gray-200">
        <div style={{display: column[key].table_display}}>{returnComponent(idTable, r, c, key, column[key].type, "null", value, column[key].required, column[key].table_readOnly, column[key].valuesSelectOne, eventHandlerOnClickButtonsBody, eventHandlerOnDblClickRow)}</div>
      </td>
    );
  });
  return (
    <tr
      key={r}
      id={idTable + "_r_" + r}
      onClick={(e) => {
        if (e.detail === 1) {
          eventHandlerOnClickRow(idTable, idTable + "_r_" + r);
        } else if (e.detail === 2) {
          eventHandlerOnDblClickRow(idTable + "_r_" + r, idRowValue);
        }
      }}
    >
      <td className="px-5 py-3 text-base border-b border-gray-200">
        <div>
          <input id={idTable + "_check_" + idRowValue} name={idTable + "_check_" + idRowValue} type="checkbox" />
        </div>
      </td>
      {resultRow}
    </tr>
  );
}
function returnComponent(idComponent, indexRow, indexColumn, keyItem, typeComponent, configComponent, valueItem, requiredComponent, readOnlyComponent, valuesSelectOne, eventHandlerOnClickButtons) {
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
