export default function HookViewTableButtons(props) {
  const resultButtons = Object.entries(props.buttonsConfig).map(([key, value], c) => {
    return (
      <div className="mx-1" key={c}>
        {returnButtonsComponent(props.id, key, value.readOnly, value.src, value.path, value.label, value.width, value.height, props.eventHandlerOnClickButtonsBar)}
      </div>
    );
  });
  return (
    <div id={props.id + "_btnBar"} className="flex px-5 text-sm">
      {resultButtons}
    </div>
  );
}
function returnButtonsComponent(idTable, btnName, readOnly, btnSrc, btnPath, btnLabel, svgWidth, svgHeight, eventHandlerOnClickButtonsBar) {
  let element = undefined;
  const nameObj = idTable + "_" + btnName;
  if (readOnly === true) {
    readOnly = "disabled";
  } else {
    readOnly = undefined;
  }
  if (btnSrc === undefined || btnSrc === null) {
    btnSrc = "";
  }
  element = (
    <button
      id={nameObj}
      name={nameObj}
      type="button"
      disabled={readOnly}
      onClick={() => {
        eventHandlerOnClickButtonsBar(btnName, idTable);
      }}
      className="justify-center inline-block w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-incremental group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {btnSrc !== "" ? (
        <img src={btnSrc} alt="" />
      ) : (
        <svg width={svgWidth} height={svgHeight} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d={btnPath} fill="white" />
        </svg>
      )}
      {btnLabel}
    </button>
  );
  return element;
}
