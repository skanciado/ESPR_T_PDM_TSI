import "../../../utilities/interface/css/hookViewModal.css";
import {useState} from "react";
export default function HookViewImportFile(props) {
  const [files, setFiles] = useState("");
  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result.replace(/(?:\r\n|\r|\n|\t)/g, ""));
    };
  };
  return (
    <div className="modalBackground" style={{zIndex: 25}}>
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
          <input type="file" accept=".json" onChange={handleChange} />
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
            id="modalOK"
            onClick={() => {
              props.setModal({...props.modal, openModal: false, valuesModal: files});
            }}
          >
            {props.lblOk}
          </button>
        </div>
      </div>
    </div>
  );
}
