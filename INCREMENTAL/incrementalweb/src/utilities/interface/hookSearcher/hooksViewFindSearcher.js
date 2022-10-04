import {useState} from "react";
import {HookViewModalSearcher} from "./hookViewModalSearcher";
import HookViewFormSearcher from "./hookViewFormSearcher";
export const HooksViewFindSearcher = () => {
  const [modal, setModal] = useState({
    openModal: false,
    valuesModal: undefined,
  });
  const [stateAttr] = useState({
    attributes: undefined,
  });
  let ModalHookViewFindSearcher = () => <></>;
  if (modal.valuesModal !== undefined && JSON.stringify(modal.valuesModal) !== "{}") {
    //modificar el valor de la celda de la busqueda avanzada
    const value = modal.valuesModal[stateAttr.attributes.cellForm];
    const element = document.getElementById(stateAttr.attributes.cellChange);
    if (stateAttr.attributes.cellType === "list") {
      if (element.addFunc !== undefined) {
        element.addFunc(modal.valuesModal);
      }
    } else {
      element.value = value;
    }
    modal.valuesModal = undefined;
    modal.openModal = false;
    setModal({openModal: false, valuesModal: undefined});
  } else if (modal.openModal === true) {
    stateAttr.attributes = modal.attributes;
    //const ind = context.tables.findIndex((item) => item.table === modal.attributes.tableForm);
    const HookViewFormFindSearch = () => <HookViewFormSearcher idForm={"searcher"} dialogContent={modal.dataAndDesing.dialogContent.attributes} valuesForm={undefined} valuesGrid={modal.dataAndDesing.tableValues} valuesAllSelectOne={modal.dataAndDesing.valuesAllSelectOne} eventHandlerOnClickButtons={undefined} />;
    ModalHookViewFindSearcher = () => {
      return <HookViewModalSearcher lblTitle="Busqueda item" twoButtons={true} lblCancel="Cancelar" lblOk="Seleccionar" ctrlBody={HookViewFormFindSearch} idFormBody={"searcher"} setModal={setModal} initialModalValues={undefined} />;
    };
  }
  return {
    setModal,
    ModalHookViewFindSearcher,
  };
};
