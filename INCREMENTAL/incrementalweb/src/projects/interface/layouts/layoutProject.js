import {useContext} from "react";
import Context from "../../../transversal/context/context";
import {HookViewTableAsyncProjects} from "../hooksView/hooksViewTableAsyncProject";
import ButtonHookViewSearcher from "../../../utilities/interface/buttonHookViewSearcher";
import ButtonHookViewImportFile from "../../../utilities/interface/buttonHookViewImportFile";
import ButtonHookViewLifecycleGraph from "../../../utilities/interface/buttonHookViewLifecycleGraph";
import ButtonHookViewWorkflowGraph from "../../../utilities/interface/buttonHookViewWorkflowGraph";

export default function LayoutProject() {
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
                <HookViewTableAsyncProjects context={context} />
            </div>
        );
    }else{
        layout = ( 
                <div className="grid grid-cols-2 py-5">
                    <HookViewTableAsyncProjects context={context} />
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
