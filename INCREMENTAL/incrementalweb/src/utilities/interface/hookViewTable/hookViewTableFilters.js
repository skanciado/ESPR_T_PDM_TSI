export default function HookViewTableFilter(props) {
  //const key = Object.keys(props.typeColumns)[0];
  const key = "name";
  return (
    <div className="px-5 py-5 text-sm bg-white border-b border-gray-200">
      <input
        id={props.id + "_f_0_" + key}
        name={props.id + "_f_0_" + key}
        type="text"
        onChange={(e) => {
          props.eventHandlerOnChangeFilter(key, e.target.value);
        }}
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
    </div>
  );
}
export function HookViewTableFilter_V2(props) {
  const filters = Object.entries(props.typeColumns).forEach(([key, value], f) => {
    <div key={f} className="px-5 py-5 text-sm bg-white border-b border-gray-200">
      {returnComponent(props.id, f, key, value, props.valuesAllSelectOne)}
    </div>;
  });
  return (
    <>
      <div>{filters}</div>
    </>
  );
}
function returnComponent(idTable, indexColumn, keyItem, typeColumn, valuesAllSelectOne) {
  let element = undefined;
  const nameObj = idTable + "_f_" + indexColumn + "_" + keyItem;
  if (typeColumn === "select") {
    let confControl = {size: 0, multiple: false};
    if (valuesAllSelectOne?.selects[keyItem]?.size !== undefined) {
      confControl.size = valuesAllSelectOne.selects[keyItem].size;
    }
    if (valuesAllSelectOne?.selects[keyItem]?.multiple !== undefined) {
      confControl.multiple = valuesAllSelectOne.selects[keyItem].multiple;
    }
    let itemsSelect = undefined;
    if (valuesAllSelectOne.combos[keyItem] !== undefined) {
      itemsSelect = valuesAllSelectOne.combos[keyItem].map((item, cb) => {
        return (
          <option key={cb} value={item.key}>
            {item.value}
          </option>
        );
      });
      itemsSelect += (
        <option key={itemsSelect.length} value={"null"} selected>
          {" "}
        </option>
      );
    }
    element = (
      <select id={nameObj} name={nameObj} multiple={confControl.multiple} size={confControl.size} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        {itemsSelect}
      </select>
    );
  }
  if (typeColumn === "input") {
    element = <input id={nameObj} name={nameObj} type="text" className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
  }
  if (typeColumn === "date") {
    //const date = new Date(valueItem);
    //const valueItemIso = date.toISOString();
    element = <input id={nameObj} name={nameObj} type="date" className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />;
  }
  if (typeColumn === "checkbox") {
    element = (
      <select id={nameObj} name={nameObj} className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        <option value={"null"} selected>
          {" "}
        </option>
        <option value={"true"}>Checked</option>
        <option value={"false"}>UnChecked</option>
      </select>
    );
  }
  return element;
}
