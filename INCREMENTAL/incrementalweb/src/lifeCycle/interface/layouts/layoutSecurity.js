import {useContext} from "react";
import Context from "../../../transversal/context/context";
import {HookViewTableAsyncLifeCycles} from "../hooksView/hooksViewTableAsyncLifeCycles";
import {HookViewTableAsyncPolicies} from "../../../policy/interface/hooksView/hooksViewTableAsyncPolicies";
import {HookViewTableAsyncStatus} from "../../../status/interface/hooksView/hooksViewTableAsyncStatus";
import ButtonHookViewSearcher from "../../../utilities/interface/buttonHookViewSearcher";
import ButtonHookViewImportFile from "../../../utilities/interface/buttonHookViewImportFile";
import ButtonHookViewLifecycleGraph from "../../../utilities/interface/buttonHookViewLifecycleGraph";
import ButtonHookViewWorkflowGraph from "../../../utilities/interface/buttonHookViewWorkflowGraph";

export default function LayoutSecurity() {
  const context = useContext(Context);
  let sExtendedTable = "";
    if( context.extendedMode !== undefined && 
      context.extendedMode.value !== undefined){
      sExtendedTable = context.extendedMode.value;
    }
    let layout = undefined;
    if( sExtendedTable !== "" ){
        layout = ( 
            <div className="flex py-5">
                <HookViewTableAsyncLifeCycles context={context} />
                <HookViewTableAsyncStatus context={context} />
                <HookViewTableAsyncPolicies context={context} />
            </div>
        );
    }else{
        layout = ( 
            <div className="grid grid-cols-2 py-5">
                <HookViewTableAsyncLifeCycles context={context} />
                <HookViewTableAsyncStatus context={context} />
                <HookViewTableAsyncPolicies context={context} />
            </div>
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
