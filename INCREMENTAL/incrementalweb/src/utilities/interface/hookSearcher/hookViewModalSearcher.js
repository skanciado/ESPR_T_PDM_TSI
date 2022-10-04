import "../../interface/css/hookViewModal.css";
import {useState} from "react";
export function HookViewModalSearcher(props) {
  const [, setStateModal] = useState();
  var disableSeleccionar = false;
  if (props.initialModalValues === undefined) {
    disableSeleccionar = true;
  }
  return (
    <div className="modalBackground" style={{zIndex: 15}}>
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setModal({openModal: false, valuesModal: undefined});
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>{props.lblTitle}</h3>
        </div>
        <div className="body">
          <props.ctrlBody setStateModalBody={setStateModal} initialModalValuesBody={props.initialModalValues} />
        </div>
        <div className="footer">
          {props.twoButtons === true && (
            <button
              onClick={() => {
                props.setModal({openModal: false, valuesModal: undefined});
              }}
            >
              {props.lblCancel}
            </button>
          )}
          <button
            id="searcherModalOK"
            disabled={disableSeleccionar}
            onClick={() => {
              const table = document.getElementById("searcherTable");
              if (table !== undefined) {
                const selectedRow = table.getElementsByClassName("selected");
                if (selectedRow.length > 0) {
                  let jsonRow = {};
                  for (let cell of selectedRow[0].cells) {
                    const key = cell.id.split("_")[0];
                    let val = "";
                    if (cell.lastChild !== null) {
                      val = cell.lastChild.textContent; //dataset.value;
                    }
                    jsonRow[key] = val;
                  }
                  jsonRow["_id"] = selectedRow[0].cells[0].dataset.value;
                  //si el formulario esta desarrollado con el HookViewForm el formulario no tendra un useState y los valores se leeran desde los controles.
                  props.setModal({openModal: false, valuesModal: jsonRow});
                }
              }
            }}
          >
            {props.lblOk}
          </button>
        </div>
      </div>
    </div>
  );
}
