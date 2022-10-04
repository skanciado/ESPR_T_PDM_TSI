import {useState, useContext} from "react";
import {HookViewModal} from "../../../utilities/interface/hookViewModal";
import HookViewTable from "../../../utilities/interface/hookViewTable/hookViewTable";
import HookViewForm from "../../../utilities/interface/hookViewForm";
import Context from "../../../transversal/context/context";
export default function HookViewTableObjectTypes(props) {
  const context = useContext(Context);
  const [formState] = useState({
    formValues: [],
    formAction: undefined,
  });
  const [modalState, setModal] = useState({openModal: false, valuesModal: undefined});
  const typeColumns = getTypeColumns(props.dialogContent.attributes);
  const elementsForm = elementsToForm(typeColumns);
  const eventHandlerOnClick_ButtonsTableBar = (idButton, stateTable) => {
    if (idButton === "selectedRowOnClick") {
      const formValues = stateTable.table.find((item) => item !== null && item._id === stateTable.rowSelectedIdValues);
      formState.formValues = formValues;
      formState.formAction = stateTable.actionState;
      setModal({openModal: true, valuesModal: undefined});
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsUpdated = [];
    }
    if (idButton === "create") {
      formState.formValues = elementsForm;
      formState.formValues.id = JSON.stringify(new Date().getTime());
      formState.formAction = stateTable.actionState;
      setModal({openModal: true, valuesModal: undefined});
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsCreated = [];
    }
    if (idButton === "delete") {
      //EN BDS: eliminar filas de valores
      //en caso de no existir el boton save (resetear valor antes de guardar el nuevo valor en memoria del componente)
      //stateTable.rowsDeletedIds = [];
      props.crudApTableSave(context, "delete", stateTable.rowsDeletedIds);
    }
    if (idButton === "save") {
      stateTable.rowsCreated = [];
      stateTable.rowsUpdated = [];
      stateTable.rowsDeletedIds = [];
      //en caso de no usar un modal para crear/editar datos y crear/editar desde la tabla obtener los datos de:
    }
    if (idButton === "expand") {
      //navigate("/home/detailsObjectType", {replace: true});
      let sExtendedTable = "tblObjectTypes";
      if( context.extendedMode !== undefined && 
        context.extendedMode.value !== undefined){
          const sReadExtendedTable = context.extendedMode.value;
          if( sReadExtendedTable !== ""){
              sExtendedTable = "";
              setModal({openModal: false, valuesModal: undefined});
          }
      }
      context.extendedModeDispatch.handleExtendedModeReplace({value: sExtendedTable});
    }
  };
  if (modalState.valuesModal !== undefined && JSON.stringify(modalState.valuesModal) !== "{}") {
    //en modo edicion fila añadira el id existente a los paramteros del modal para que los reciba la tabla.
    //en modo crear fila, creara el id con valor undefined a los paramteros del modal para que los reciba la tabla.
    modalState.valuesModal.id = formState.formValues?.id;
    if (formState.formAction === "processingCreate") {
      //guardar en bds despues de cerrar el modal el valor de modalState.valuesModal
      props.crudApTableSave(context, "create", modalState.valuesModal);
    }
    if (formState.formAction === "processingUpdate") {
      //guardar en bds despues de cerrar el modal el valor de modalState.valuesModal
      props.crudApTableSave(context, "update", modalState.valuesModal);
    }
  }
  //si el context tiene un filtro se lo añado
  let tableFilters = props.tableFilters;
  if (context.filtersTable !== undefined && context.filtersTable.table === "objectTypes" && context.filtersTable.filters !== undefined) {
    tableFilters = context.filtersTable.filters;
    context.filtersTable.filters = undefined;
    context.filtersTable.table = undefined;
  }
  const HookViewFormObjectTypes = () => <HookViewForm idForm={formState.formValues?.id} dialogContent={props.dialogContent.attributes} valuesForm={formState.formValues} valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnClickButtons={eventHandlerOnClick_ButtonsForm} action={formState?.formAction} valuesAction={{user: context.user._id, group: context.cache.groupLast}}/>;
  return (
    <>
      <HookViewTable id={props.id} title={props.title} dialogContent={props.dialogContent} values={props.tableValues} showLabels="true" valuesAllSelectOne={props.valuesAllSelectOne} eventHandlerOnClickButtonsTableBar={eventHandlerOnClick_ButtonsTableBar} eventHandlerOnClickButtonsTableBody={eventHandlerOnClick_ButtonsTableBody} eventHandlerModalValues={modalState.valuesModal} eventHandlerOnChange_Filter={tableFilters} />
      {modalState.openModal && <HookViewModal lblTitle={"Información " + formState.formValues?.name} twoButtons={true} lblCancel="Cancel" lblOk="Save" ctrlBody={HookViewFormObjectTypes} idFormBody={formState.formValues?.id} setModal={setModal} initialModalValues={formState.formValues} />}
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
