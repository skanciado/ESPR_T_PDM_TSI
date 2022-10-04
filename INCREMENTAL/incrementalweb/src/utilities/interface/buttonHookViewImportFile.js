import {useState,useContext} from "react";
import {readJson} from "../../files/interface/hooksCode/hookCodeImportFile";
import {getValuesModalItem} from "../application/utilsApplication";
import Context from "../../transversal/context/context";
import HookViewImportFile from "../../files/interface/hookView/hookViewImportFile";
export default function ButtonHookViewImportFile(){
  const context = useContext(Context);  
  const [modal, setModal] = useState({
    openModal: false,
    valuesModal: undefined,
    dataAndDesing: undefined,
  });
  if (modal.valuesModal !== undefined && JSON.stringify(modal.valuesModal) !== "{}") {
    readJson({attributes: modal.dataAndDesing.dialogContent.attributes}, modal.valuesModal);
    console.log(modal.valuesModal);
  }
  return (
    <>
      <button
        id="openModalImportFile"
        onClick={async (e) => {
          const tableName = e.target.className.split("&")[0];
          const dataAndDesing = await getValuesModalItem(tableName, context);
          if (dataAndDesing !== undefined) {
            setModal({
              openModal: true,
              valuesModal: undefined,
              dataAndDesing: dataAndDesing,
            });
          }
        }}
        hidden
      />
      {modal.openModal && <HookViewImportFile lblTitle="Importar JSON" twoButtons={true} lblCancel="Cancelar" lblOk="Importar" idFormBody={"searcher"} setModal={setModal} modal={modal} />}
    </>
  );
};