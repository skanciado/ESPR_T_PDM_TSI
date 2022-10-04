import {useState} from "react";
import {HookViewModal} from "../../../utilities/interface/hookViewModal";
import {useContext} from "react";
import Context from "../../../transversal/context/context";
import HookViewForm from "../../../utilities/interface/hookViewForm";
import {adapValuesFiltersTables, adapCleanForm} from "../../../utilities/allLayers/adaptersAllLayers";
export const HooksViewNavBarHeaderFindAdvanced = () => {
  const context = useContext(Context);
  const [modal, setModal] = useState({
    openModal: false,
    valuesModal: undefined,
  });
  let ModalHookViewNavBarHeaderFindAdvanced = () => <></>;
  if (modal.valuesModal !== undefined && JSON.stringify(modal.valuesModal) !== "{}") {
    if (context.filtersTable.filters === undefined) {
      const valuesModal = adapValuesFiltersTables(modal.valuesModal, true);
      const element = document.getElementById("tableFilter");
      context.filtersTableDispatch.handleFiltersTableReplace({table: element.value, filters: valuesModal});
      modal.valuesModal = undefined;
      modal.openModal = false;
      setModal({openModal: false, valuesModal: undefined});
    }
  } else {
    ModalHookViewNavBarHeaderFindAdvanced = () => {
      if (modal.openModal) {
        return <HookViewModal lblTitle="Busqueda avanzada" twoButtons={true} lblCancel="Cancelar" lblOk="Buscar" forceExtended="" ctrlBody={HookViewFindAdvanced} idFormBody={"busqueda"} setModal={setModal} initialModalValues={undefined} />;
      }
    };
  }
  return {
    setModal,
    ModalHookViewNavBarHeaderFindAdvanced,
  };
};
function HookViewFindAdvanced() {
  const context = useContext(Context);
  let itemsSelect = undefined;
  if (context.filtersTable?.onlyTable !== undefined) {
    itemsSelect = (
      <option key={0} value={context.filtersTable?.onlyTable}>
        {context.filtersTable?.onlyTable}
      </option>
    );
    context.filtersTable.onlyTable = undefined;
  } else {
    itemsSelect = context.tables.map((item, k) => (
      <option key={k} value={item.table}>
        {item.table}
      </option>
    ));
  }
  const [ind, setStateSelect] = useState(0);
  const handleChange = (e) => {
    const index = context.tables.findIndex((item) => item.table === e.target.value);
    setStateSelect(index);
    adapCleanForm("busqueda");
  };
  return (
    <div>
      <div>
        <select
          id="tableFilter"
          name="tableFilter"
          onChange={(e) => {
            handleChange(e);
          }}
          className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={{backgroundColor: "black", color: "white"}}
        >
          {itemsSelect}
        </select>
      </div>
      <div>
        <HookViewForm idForm={"busqueda"} dialogContent={context.tables[ind].dialogContent.attributes} forceExtended="" valuesForm={undefined} valuesAllSelectOne={context.tables[ind].valuesAllSelectOne} eventHandlerOnClickButtons={undefined} action={"busqueda"} />
      </div>
    </div>
  );
}
