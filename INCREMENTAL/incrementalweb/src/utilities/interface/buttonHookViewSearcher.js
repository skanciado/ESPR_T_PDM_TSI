import {useContext} from "react";
import {HooksViewFindSearcher} from "./hookSearcher/hooksViewFindSearcher";
import Context from "../../transversal/context/context";
import {getValuesModalItem} from "../application/utilsApplication";

export default function ButtonHookViewSearcher(){
  const context = useContext(Context);  
  const {ModalHookViewFindSearcher, setModal} = HooksViewFindSearcher();
  return (
    <>
      <button
        id="openModalSearcher"
        onClick={async (e) => {
          const tableName = e.target.className.split("&")[0];
          const dataAndDesing = await getValuesModalItem(tableName, context);
          if (dataAndDesing !== undefined) {
            setModal({
              openModal: true,
              valuesModal: undefined,
              attributes: {tableForm: e.target.className.split("&")[0], cellForm: e.target.className.split("&")[1], cellChange: e.target.className.split("&")[2], cellType: e.target.className.split("&")[3]},
              dataAndDesing: dataAndDesing,
            });
          }
        }}
        hidden
      />
      <ModalHookViewFindSearcher />
    </>
  );
};