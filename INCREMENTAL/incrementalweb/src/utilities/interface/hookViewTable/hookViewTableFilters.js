export default function HookViewTableFilter(props) {
  //const key = Object.keys(props.typeColumns)[0];
  const key = "name";
  return (
    <div className="flex px-0 py-0 text-sm border border-slate-300 rounded-md">
      <label className="flex items-center justify-center">
        <svg className="h-5 w-5 fill-black" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" fill="#E20074"></path>
        </svg>
      </label>
      <input
        id={props.id + "_f_0_" + key}
        name={props.id + "_f_0_" + key}
        type="text"
        onChange={(e) => {
          props.eventHandlerOnChangeFilter([{[key]: e.target.value}], "tableHeader");
        }}
        //className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        className="relative block w-full text-gray-900 placeholder-gray-500 search-input rounded-md appearance-none focus:outline-none sm:text-sm"
        placeholder="Buscar"
        aria-label="Buscar"
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
  if (typeColumn === "input" || typeColumn === "label") {
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
