import {useContext} from "react";
import Context from "../../../transversal/context/context";
import {HookViewTableAsyncProjects} from "../../../projects/interface/hooksView/hooksViewTableAsyncProject";
import {HookViewTableAsyncDocuments} from "../../../documents/interface/hooksView/hooksViewTableAsyncDocument";
import {HookViewTableAsyncFolders} from "../../../folders/interface/hooksView/hooksViewTableAsyncFolders";
import {HookViewTableAsyncWorkflows} from "../../../workflows/interface/hooksView/hooksViewTableAsyncWorkflows";
import ButtonHookViewSearcher from "../../../utilities/interface/buttonHookViewSearcher";
import ButtonHookViewImportFile from "../../../utilities/interface/buttonHookViewImportFile";
import ButtonHookViewLifecycleGraph from "../../../utilities/interface/buttonHookViewLifecycleGraph";
import ButtonHookViewWorkflowGraph from "../../../utilities/interface/buttonHookViewWorkflowGraph";

export default function LayoutDashboardHome() {
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
            <HookViewTableAsyncProjects context={context} className="py-2" />
            <HookViewTableAsyncDocuments context={context} className="py-2" />
            <HookViewTableAsyncFolders context={context} className="py-2" />
            <HookViewTableAsyncWorkflows context={context} className="py-2" />
        </div>
    );
  }else{
    layout = (
      <div className="grid grid-cols-2 py-5">
        <HookViewTableAsyncProjects context={context} className="py-2" />
        <HookViewTableAsyncDocuments context={context} className="py-2" />
        <HookViewTableAsyncFolders context={context} className="py-2" />
        <HookViewTableAsyncWorkflows context={context} className="py-2"/>
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
