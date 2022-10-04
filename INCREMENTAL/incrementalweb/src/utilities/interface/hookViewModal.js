import "../interface/css/hookViewModal.css";
import {useState} from "react";
export function HookViewModal(props) {
  const [state, setStateModal] = useState();
  return (
    <div className="modalBackground">
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
          <h1>{props.lblTitle}</h1>
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
            onClick={() => {
              if (document.getElementsByTagName("form").length > 0) {
                for (let ctrlForm of document.getElementsByTagName("form")[0].querySelectorAll("[required]")) {
                  if (!ctrlForm.reportValidity()) {
                    ctrlForm.checkValidity();
                    return;
                  }
                }
              }
              //si state != undefined, el body se ha creado a mano y el body tiene un componente useState.
              //si state = undefined, el body se ha creado con el componente HookViewForm.
              if (state === undefined) {
                let jsonRow = {};
                if (typeof document !== "undefined" && document !== null) {
                  const ctrlForm = document.getElementById(props.idFormBody);
                  if (typeof ctrlForm !== "undefined" && ctrlForm !== null) {
                    if (document.getElementsByTagName("form").length > 0) {
                      //las labels y las imagenes no las identifica como un elemento de formulario
                      const labels = document.getElementsByTagName("form")[0].querySelectorAll('label[id^="' + props.idFormBody + '"]');
                      const imgs = document.getElementsByTagName("form")[0].querySelectorAll('img[id^="' + props.idFormBody + '"]');
                      const svgs = document.getElementsByTagName("form")[0].querySelectorAll('svg[id^="' + props.idFormBody + '"]');
                      if (labels.length > 0) {
                        labels.forEach((lbl) => {
                          const key = lbl.id.replace(props.idFormBody + "_", "");
                          const val = lbl.innerText;
                          jsonRow[key] = val;
                        });
                      }
                      if (imgs.length > 0) {
                        imgs.forEach((img) => {
                          const key = img.id.replace(props.idFormBody + "_", "");
                          const val = img.innerText;
                          jsonRow[key] = val;
                        });
                      }
                      if (svgs.length > 0) {
                        svgs.forEach((svg) => {
                          const key = svg.id.replace(props.idFormBody + "_", "");
                          const val = svg.innerText;
                          jsonRow[key] = val;
                        });
                      }
                    }
                    for (let child of ctrlForm) {
                      const idCtrl = child.id;
                      const key = idCtrl.replace(props.idFormBody + "_", "");
                      let typeCtrl = child.type;
                      if (typeCtrl === undefined) {
                        typeCtrl = child.tagName.toLowerCase();
                      }
                      let val = undefined;
                      switch (typeCtrl) {
                        case "checkbox":
                          val = child.checked;
                          break;
                        case "button":
                          val = child.innerText;
                          break;
                        case "select-one":
                          const value = child.selectedOptions[0].value;
                          const text = child.selectedOptions[0].text;
                          const index = child.selectedOptions[0].index;
                          const sel = {index: index, value: value, text: text};
                          jsonRow["SELECT&" + key] = sel;
                          val = text;
                          break;
                        default:
                          val = child.value;
                      }
                      jsonRow[key] = val;
                    }
                  }
                }
                //si el formulario esta desarrollado con el HookViewForm el formulario no tendra un useState y los valores se leeran desde los controles.
                props.setModal({openModal: false, valuesModal: jsonRow});
              } else {
                //si el formulario esta desarrollado a mano y se ha creado en el control de formulario un useState para controlar los valores de los controles
                props.setModal({openModal: false, valuesModal: state});
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
