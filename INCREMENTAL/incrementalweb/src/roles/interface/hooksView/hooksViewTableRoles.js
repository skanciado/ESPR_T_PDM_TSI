//import {useTranslation} from "react-i18next";
import {useState} from "react";
import {HookViewModal} from "../../../utilities/interface/hookViewModal";
import HookViewTable from "../../../utilities/interface/hookViewTable/hookViewTable";
import HookViewForm from "../../../utilities/interface/hookViewForm";
export default function HookViewTableRoles(props) {
  //const {t} = useTranslation();
  const [formState] = useState({
    formValues: [],
  });
  const [modalState, setModal] = useState({openModal: false, valuesModal: undefined});
  const typeColumns = getTypeColumns(props.dialogContent.attributes);
  const elementsForm = elementsToForm(typeColumns);
  const eventHandlerOnClick_ButtonsTableBar = (idButton, stateTable) => {
    if (idButton === "selectedRowOnClick") {
      const formValues = stateTable.table.find((item) => item !== null && item.id === stateTable.rowSelectedIdValues);
      formState.formValues = formValues;
      setModal({openModal: true, valuesModal: undefined});
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsUpdated = [];
    }
    if (idButton === "create") {
      formState.formValues = elementsForm;
      formState.formValues.id = JSON.stringify(new Date().getTime());
      setModal({openModal: true, valuesModal: undefined});
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsCreated = [];
    }
    if (idButton === "delete") {
      //EN BDS: eliminar filas de valores
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsDeletedIds = [];
    }
    if (idButton === "save") {
      stateTable.rowsCreated = [];
      stateTable.rowsUpdated = [];
      stateTable.rowsDeletedIds = [];
      //en caso de no usar un modal para crear/editar datos y crear/editar desde la tabla obtener los datos de:
    }
  };
  if (modalState.valuesModal !== undefined && JSON.stringify(modalState.valuesModal) !== "{}") {
    //en modo edicion fila añadira el id existente a los paramteros del modal para que los reciba la tabla.
    //en modo crear fila, creara el id con valor undefined a los paramteros del modal para que los reciba la tabla.
    modalState.valuesModal.id = formState.formValues?.id;
  }
  const HookViewFormRoles = () => <HookViewForm idForm={formState.formValues?.id} dialogContent={props.dialogContent.attributes} valuesForm={formState.formValues} valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnClickButtons={eventHandlerOnClick_ButtonsForm} />;
  return (
    <>
      {modalState.openModal && <HookViewModal lblTitle="Detalles" twoButtons={true} lblCancel="Cancel" lblOk="Save" ctrlBody={HookViewFormRoles} idFormBody={formState.formValues.id} setModal={setModal} initialModalValues={formState.formValues} />}
      <HookViewTable id={"tblRoles"} title="roles" dialogContent={props.dialogContent} values={props.tableValues} valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnClickButtonsTableBar={eventHandlerOnClick_ButtonsTableBar} eventHandlerOnClickButtonsTableBody={eventHandlerOnClick_ButtonsTableBody} eventHandlerModalValues={modalState.valuesModal} />
    </>
  );
}
function getTypeColumns(formAttributes) {
  let typeColumns = {};
  formAttributes.forEach((tab) => {
    tab.content.forEach((element) => {
      Object.entries(element).forEach(([key, value]) => {
        typeColumns[key] = value.type;
      });
    });
  });
  return typeColumns;
}
function elementsToForm(typeColumns) {
  let elementsForm = JSON.parse(JSON.stringify(typeColumns));
  Object.entries(typeColumns).forEach(([key]) => {
    //if (key !== "id") {
    elementsForm[key] = "";
    //} else {
    //delete elementsForm[key];
    //}
  });
  return elementsForm;
}
function eventHandlerOnClick_ButtonsForm(idButton) {
  const idRowAndNameKey = idButton.split("_");
  if (idRowAndNameKey === "imageBtn") {
    console.log("hola mundo");
  }
}
function eventHandlerOnClick_ButtonsTableBody(idButton) {
  console.log(idButton);
}
