import {useState,useContext} from "react";
import Context from "../../transversal/context/context";
import {getValuesModalItem2} from "../application/utilsApplication";
import HookViewWorkflowGraph from "./hookWorkflowGraph/hookViewWorkflowGraph";

export default function ButtonHookViewWorkflowGraph (){
  const context = useContext(Context);  
  const [modal, setModal] = useState({
    openModal: false,
    valuesModal: undefined,
    attributes: {tableForm: "", cellForm: "", cellChange: "", cellType: "", dbId: ""},
    dataAndDesing: undefined,
  });
  if (modal.valuesModal !== undefined && JSON.stringify(modal.valuesModal) !== "{}") {
      //modificar el valor de la celda de la busqueda avanzada
      const value = modal.valuesModal[modal.attributes.cellForm];
      const element = document.getElementById(modal.attributes.cellChange);
      element.value = value;
      modal.valuesModal = undefined;
      modal.openModal = false;
      setModal({openModal: false, valuesModal: undefined});
    } 
  return (
    <>
      <button
        id="openModalWorkflowGraph"
        onClick={async (e) => {
          //const tableName = e.target.className.split("&")[0];
          const aParamsData   = e.target.className.split("&");
          const sTableName    = aParamsData[0];
          const sPropName     = aParamsData[1];
          const sPropId       = aParamsData[2];
          const sPropValType  = aParamsData[3];
          const sObjectDbId   = aParamsData[4];
          const sItemDbId     = aParamsData[5]; // StatusId for Lifecycles, TaskId for Workflows

          const dataAndDesing = await getValuesModalItem2(sTableName, sObjectDbId, sItemDbId, context);
          if (dataAndDesing !== undefined) {
            setModal({
              openModal: true,
              valuesModal: undefined,
              attributes: {tableForm: sTableName, cellForm: sPropName, cellChange: sPropId, cellType: sPropValType, dbId: sItemDbId},
              dataAndDesing: dataAndDesing,
            });
          }
        }}
        hidden
      />
      {modal.openModal && <HookViewWorkflowGraph lblTitle="Current Workflow" twoButtons={true} lblCancel="Cancelar" lblOk="OK" idFormBody={""} setModal={setModal} modal={modal} /> }
    </>
  );
}