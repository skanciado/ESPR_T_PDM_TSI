import {useContext} from "react";
import Context from "../../../transversal/context/context";
import {HookViewTableAsyncUsers} from "../hooksView/hooksViewTableAsyncUsers";
import {HookViewTableAsyncRoles} from "../../../roles/interface/hooksView/hooksViewTableAsyncRoles";
import {HookViewTableAsyncGroups} from "../../../groups/interface/hooksView/hooksViewTableAsyncGroups";
import ButtonHookViewSearcher from "../../../utilities/interface/buttonHookViewSearcher";
import ButtonHookViewImportFile from "../../../utilities/interface/buttonHookViewImportFile";
import ButtonHookViewLifecycleGraph from "../../../utilities/interface/buttonHookViewLifecycleGraph";
import ButtonHookViewWorkflowGraph from "../../../utilities/interface/buttonHookViewWorkflowGraph";

export default function LayoutOrganization() {
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
            <HookViewTableAsyncUsers context={context} className="py-2" />
            <HookViewTableAsyncGroups context={context} className="py-2" />
            <HookViewTableAsyncRoles context={context} className="py-2" />
        </div>
    );
  }else{
        layout = (
            <div className="grid grid-cols-2 py-5">
                <HookViewTableAsyncUsers context={context} className="py-2" />
                <HookViewTableAsyncGroups context={context} className="py-2" />
                <HookViewTableAsyncRoles context={context} className="py-2" />
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
