import {Suspense,useContext} from "react";
import Context from "../../../transversal/context/context";
import {HookViewTableAsyncObjectTypes} from "../hooksView/hooksViewTableAsyncObjectTypes";
import ButtonHookViewSearcher from "../../../utilities/interface/buttonHookViewSearcher";
import ButtonHookViewImportFile from "../../../utilities/interface/buttonHookViewImportFile";
import ButtonHookViewLifecycleGraph from "../../../utilities/interface/buttonHookViewLifecycleGraph";
import ButtonHookViewWorkflowGraph from "../../../utilities/interface/buttonHookViewWorkflowGraph";
export default function LayoutBusiness() {
    const context = useContext(Context);
  
    let sExtendedTable = "";
    if( context.extendedMode !== undefined && 
      context.extendedMode.value !== undefined){
      sExtendedTable = context.extendedMode.value;
    }
    let layout = undefined;
    if( sExtendedTable !== "" ){
      layout = ( 
        <Suspense fallback={undefined}>
            <div className="flex py-5">
            <HookViewTableAsyncObjectTypes />
            </div>
        </Suspense>
      );
    }else{
        layout = (
            <Suspense fallback={undefined}>
                <div className="grid grid-cols-2 py-5">
                <HookViewTableAsyncObjectTypes />
                </div>
            </Suspense>
        );
    }
    return (
        <>
          <ButtonHookViewWorkflowGraph /> 
          <ButtonHookViewLifecycleGraph />
          <ButtonHookViewImportFile />
          <ButtonHookViewSearcher />
          {layout}
        </>
  );
}
