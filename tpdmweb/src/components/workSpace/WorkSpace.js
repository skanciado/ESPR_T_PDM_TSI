import React from "react";
import { connect, useDispatch } from "react-redux";
import { store } from "../../stores/store";
import { setInfo, setForm, setSelectProject, setSelectProjectOpen, 
         setSelectFolder, setSelectDocument, setSelectTask, 
         setSelectDocTask, setIsDocLinkedToProject,  } from "../../stores/ui/uiActions";
import { setOpenFolder, saveOriginalDocumentDescription,saveShowDescription } from "../../stores/datas/datasAction";
import { typeInfo } from "../types/typeInfo";
import { typeForm} from "../types/typeForm";
import Toolbar from "../toolbar/Toolbar";
import { Tooltip, OverlayTrigger, Collapse } from "react-bootstrap";
import { typeStatusProject, typeStatusDocument } from "../types/typePDM";
import "./workSpace.css";

const WorkSpace = ( props ) => {
	//const { ui, datas } = store.getState();
	const dispatch = useDispatch();

	// ----------------------------------------------- INFO
	// Infomación del proyecto.
	const onInfoProject = (project) => {
		if (project) dispatch(setSelectProject(project));
	}
	// Información de la carpeta.
	const onInfoFolder = (folder) => {
		if (folder) dispatch(setSelectFolder(folder));
    }
    // Información del documento.
	const onInfoDocument = (document) => {
        //if( props.selectDocumentNeedsSave ) {
        //    alert('Datos modificados. Es necesario salvar los cambios antes de seleccionar otro documento.');
        //} else {
            if (document) {
                let found = false;
                props.projects.forEach( oProject => {
                    oProject.folders.forEach( oFolder => {
                        oFolder.documents.concat(oFolder.cadDocuments).forEach( oDoc => {
                            if( oDoc.id === document.id){
                                dispatch(setSelectProject(oProject));
                                dispatch(setSelectFolder(oFolder));
                                found = true;
                            }
                            if(found)return;
                        });
                        if(found)return;
                    });
                    if(found)return;
                } );
                if( props.selectDocument?.id != document.id){
                    dispatch(saveShowDescription(false));
                }
                dispatch( saveOriginalDocumentDescription( document.description ) );
                dispatch( setSelectDocument(document) );
                
            }
        //}		
    }
    // Información de la tarea.
	const onInfoTask = (task) => {
		if (task) dispatch(setSelectTask(task));
	}
    // Información de la tarea de documento.
	const onInfoDocTask = (docTask, doc) => {
        if( doc) dispatch(setSelectDocument(doc));
		if (docTask) dispatch(setSelectDocTask(docTask));
	}

	// ----------------------------------------------- SELECCION    
	// Selecciona el proyecto y despliega su árbol.
	const onSelectProjectOpen = (project) => {
		// Evitar nulos.
		if (!project) return;
		// En caso de ser el mismo proyecto => cerrarlo.
		if (props.selectProjectOpen){
			if (props.selectProjectOpen.projectId === project.projectId){
				dispatch(setSelectProjectOpen(null));
				return;
			}
		}
		// Abrir el proyecto.
		dispatch(setSelectProjectOpen(project));
	}
	// Selecciona la carpeta.
	const onSelectFolderOpen = (project, folder) => {
        // Evitar nulos.
        if (!folder) return;
        
		if (project && folder){
            //TODO: dispatch(setOpenFolder(!folder.open, project, folder));
            return;
        }
	}

	// ----------------------------------------------- STATUS
	// True si el project está desplegado.
	const isOpenProject = (project) => ( props.selectProjectOpen ) ? ( props.selectProjectOpen.projectId === project.projectId ) : false;
	// True si el projecto y la carpeta estan desplaegados.
    // TODO: Fix folder open/close toggle (use redux in UI, not data)
	const isOpenFolder = (project, folder) => true;//(isOpenProject(project) && folder.open);

    // ----------------------------------------------- ACTIONS
	// En caso de desplegar un proyecto aparacén las opciones.
	const projectActions = (project) => {
		if (isOpenProject(project)) {
			const iconProjectWorkflow = (project.workflow === null) ? (
				<OverlayTrigger delay={6} key={project.projectId + 'FLOW'} placement='top' overlay={<Tooltip id={`tooltip-${project.projectId + 'FLOW'}`}>Send Project to Workflow</Tooltip>}>
                    <i className="mdi mdi-swap-horizontal-variant projectActionsIcons" onClick={ () => {
                        dispatch(setSelectProject(project));
                        dispatch(setForm(typeForm.NewProjectWorkFlow)) 
                    }}></i>
				</OverlayTrigger>
			)
			:(<i className="mdi mdi-transit-connection-variant projectActionsIconsDisabled"></i>);

			const iconAddFolder = (project.status.name !== typeStatusProject.Closed) ? (
				<OverlayTrigger key={project.projectId + 'FOLDER'} placement='top' overlay={<Tooltip id={`tooltip-${project.projectId + 'FOLDER'}`}>Add new Folder</Tooltip>}>
					<i className="mdi mdi-folder-plus projectActionsIcons"></i>
				</OverlayTrigger>
			)
            :(
                <i className="mdi mdi-folder-plus projectActionsIconsDisabled"></i>
            );

			return (
				<>
					{iconProjectWorkflow}
					{iconAddFolder}
					<i className="mdi mdi-blank spaceIcons"></i>
				</>
			);
		}
		return "";
	}

	// Configura los botones de acciones del las carpetas.
	const folderActions = (folder, project) => {
		return (project.status.name !== typeStatusProject.Closed) ? (
			<>
				<OverlayTrigger key={folder.id + 'Sub'} placement='top'
					overlay={<Tooltip id={`tooltip-${folder.id + 'Sub'}`}>Add sub-Folder</Tooltip>}>
					<i className="mdi mdi-folder-plus folderActionsIcons"></i>
				</OverlayTrigger>
				<OverlayTrigger key={folder.id + 'CAD'} placement='top'
					overlay={<Tooltip id={`tooltip-${folder.id + 'CAD'}`}>Add new CAD Document</Tooltip>}>
					<i className="mdi mdi-file-cad folderActionsIcons" onClick={ () => {
                        dispatch(setSelectProject(project));
                        dispatch(setSelectFolder(folder));
                        dispatch(setIsDocLinkedToProject(true));
                        dispatch(setForm(typeForm.NewCADDocument));
                    }}></i>
				</OverlayTrigger>
				<OverlayTrigger key={folder.id + 'File'} placement='top'
					overlay={<Tooltip id={`tooltip-${folder.id + 'File'}`}>Add new Document</Tooltip>}>
					<i className="mdi mdi-file-document folderActionsIcons" onClick={ () => {
                        dispatch(setSelectProject(project));
                        dispatch(setSelectFolder(folder));
                        dispatch(setIsDocLinkedToProject(true));
                        dispatch(setForm(typeForm.NewDocument));
                    }}></i>
				</OverlayTrigger>
			</>
		)
        :(
            <>
                <i className="mdi mdi-folder-plus folderActionsIconsDisabled"></i>
                <i className="mdi mdi-file-cad folderActionsIconsDisabled"></i>
                <i className="mdi mdi-file-document folderActionsIconsDisabled"></i>
            </>
        );
    }
    
    const documentActions = (doc) => {
        // Check if status is initialized with a proper object
        const oStatus = doc.status;

        const bCond1 = ( oStatus !== null );
        const bCond2 = ( oStatus !== undefined );
        if( bCond1 && bCond2 ) {
            // Check if Doc Status is other than Closed, and has no Workflow assigned
            const sStatusName = oStatus.name;
            const sDocWorkflow = doc.workflow;

            const bCond3 = ( sStatusName !== typeStatusDocument.Closed );
            // bCond4: Compre if  Obj === {} 
            const bCond5 = ( sDocWorkflow === null );
            const bCond6 = ( sDocWorkflow === undefined );
            if( bCond3 && ( bCond5 || bCond6 ) ) { 
                return (<>
                    <OverlayTrigger delay={6} key={doc.id + 'WorkDoc'} placement='top'
                        overlay={<Tooltip id={`tooltip-${doc.id + 'WorkDoc'}`}>Send Document to Workflow</Tooltip>}>
                        <i className="mdi mdi-swap-horizontal-variant documentActionsIcons" onClick={ () => {
                            dispatch(setSelectDocument(doc));
                            dispatch(setForm(typeForm.NewDocumentWorkFlow));
                        }}></i>
                    </OverlayTrigger>
                </>  );                
            }
        }
  
		return (
            <>
                <i className="mdi mdi-swap-horizontal-variant documentActionsIconsDisabled"></i>
            </>
        );
    }
    
	const iconPadlockDocument = (document) => {
        const bCond1 = ( document.locked );
		return ((document.locked === true) ? (
            <i className="mdi mdi-lock spaceIcons" style={{ color: 'red' }} ></i>
        ) 
        :(
            <i className="mdi mdi-blank spaceIconsNoPointer2"></i>
        ));
    }

    const allTaskFinished = (oProject) => {
        let counterNotCompleted = 0;
        if( !oProject?.workflow?.tasks.some( oTask => oTask.actions[0].status != true) ){
            return true;
        }
        return false;
    }

    // ----------------------------------------------- STATE
	// Actualiza los iconos del status del proyecto.
	const stateProject = (project) => {
		const iconProjState = (isOpenProject(project)) ? 'itemProjectOpenIconStatus' : 'itemProjectIconStatus';
		if (project.workflow !== null) {
            const sStatusName = project.status.name;
			if ( sStatusName === typeStatusProject.Initiated) {
				return (<i className={"mdi mdi-transit-connection-variant " + iconProjState} ></i>);
			}
			else if ( sStatusName === typeStatusProject.Planning) {
				return (
					<>
						<i className={"mdi mdi-transit-connection-variant " + iconProjState}></i>
						<i className={"mdi mdi-autorenew " + iconProjState}></i>
					</>
				);
			}
			else if ( sStatusName === typeStatusProject.Executing) {
				return (
					<>
						<i className={"mdi mdi-transit-connection-variant " + iconProjState}></i>
						<i className={"mdi mdi-cogs " + iconProjState}></i>
					</>
				);
			}
			if ( sStatusName === typeStatusProject.Closed) {
                let workflowItem = <i className={"mdi mdi-transit-connection-variant " + iconProjState}></i>
				return (<>
                            {allTaskFinished(project)?"":workflowItem}
                            <i className={"mdi mdi-flag-checkered " + iconProjState}></i>
                        </>);
			}
		}
		return "";
	}

	// Actualiza los iconos del status del documento.
	const stateDocument = (document) => {
		//if (document.documentworkflow !== null) {
        const oStatus = document.status;

        const bCond1 = ( oStatus !== null );
        const bCond2 = ( oStatus !== undefined );
        const bCond3 = (document.workflow !== null && document.workflow !== undefined);
        const blockIcon = (document.locked)?<i  className="mdi mdi-lock itemDocumentIconStatus"></i> : "";
        //TODO: si ha acabado Worflow debemos poner banderita?
        if ( bCond1 && bCond2 ) {
            const oStatusName = oStatus.name;
			let iconStatus = bCond3 ? <i className="mdi mdi-transit-connection-variant itemDocumentIconStatus"></i> : "";                        
            if ( oStatusName === typeStatusDocument.InWork) {
				return (<>
                            {iconStatus}
                            {blockIcon}
                        </>);
			}
			else if (oStatusName === typeStatusDocument.Preliminary) {
                return (
					<>
                        {iconStatus}
						<i className="mdi mdi-autorenew itemDocumentIconStatus"></i>
                        {blockIcon}
					</>
				);
			}
			else if (oStatusName === typeStatusDocument.Released) {
				return (
					<>
                        {iconStatus}
						<i className="mdi mdi-check-circle-outline itemDocumentIconStatus"></i>
                        {blockIcon}
					</>
				);
			}
			if (oStatusName === typeStatusDocument.Obsolete) {
				return (
                    <>
						{iconStatus}
						<i className={"mdi mdi-flag-checkered itemDocumentIconStatus"}></i>
                        {blockIcon}
                    </>
                );
			}
		}
		return <>
                {blockIcon}
                </>;
	}

    // HTML -------------------------------------------------------------- Árbol del Workspace.
    // --------------------------- Proyectos --------------------------------
	const listProjects = () => {
		return props.projects.map((project) =>   
			<li key={project.projectId}>
				<div className={"d-flex justify-content-between " + (isOpenProject(project) ? 'itemProjectOpen' : 'itemProject')}>
					<div>
						<i className="mdi mdi-puzzle-outline spaceIconsNoPointer"></i>
						<span>{project.name}</span>
						{stateProject(project)}
					</div>
					<div>
						{projectActions(project)}
						<i className="mdi mdi-information-outline spaceIcons" onClick={() => onInfoProject(project)}></i>
						<i className={"mdi spaceIcons " + (isOpenProject(project) ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline')}
							onClick={() => onSelectProjectOpen(project)}
							aria-controls={'PRO' + project.projectId}
							aria-expanded={isOpenProject(project)}>
						</i>
					</div>
				</div>
				{/* --------------------------- Carpetas -------------------------------- */}
				<Collapse in={isOpenProject(project)}>
					<ul id={'PRO' + project.projectId} className="listul">
						{project.folders?.map((folder) =>
							<li key={project.projectId + '-' + folder.phaseName}>
								<div className="d-flex justify-content-between itemFolder" >
									<div>
										<i className="mdi mdi-folder-outline spaceIconsNoPointer"></i>
										<span>{folder.phaseName}</span>
									</div>
									<div>
										{folderActions(folder, project)}
										<i className="mdi mdi-blank spaceIcons"></i>
										<i className="mdi mdi-information-outline spaceIcons" onClick={() => onInfoFolder(folder)}></i>
										<i className={"mdi spaceIcons " + (isOpenFolder(project, folder) ? 'mdi-arrow-up-drop-circle-outline' : 'mdi-arrow-down-drop-circle-outline')}
											onClick={() => onSelectFolderOpen(project, folder)}
											aria-controls={'FOL' + project.projectId + '-' + folder.phaseName}
											aria-expanded={isOpenFolder(project, folder)}>
										</i>
									</div>
								</div>
								{/* --------------------------- Documentos -------------------------------- */}
								<Collapse in={isOpenFolder(project, folder)}>
									<ul id={'FOL' + '-' + folder.phaseName} className="listul">
										{folder.documents?.concat(folder.cadDocuments).map((doc) =>
											<li key={'DOC-' + folder.phaseName + "_" + doc.id} >
												<div className="d-flex justify-content-between itemDocument" >
													<div>
														<i className={  "mdi documentActionsIcons " + 
                                                                        ( (doc.application === null) || ( doc.application === undefined ) ? "mdi-file-document" : "mdi-file-cad")}>                                                                            
                                                        </i>
														<span>{doc.name + " Revision: " + doc.revision}</span>
														{stateDocument(doc)}
													</div>
													<div>
														{/* {<i className="mdi mdi-transit-connection-variant spaceIcons"></i>} */}
                                                        {documentActions(doc, folder)}
														<i className="mdi mdi-blank spaceIconsNoPointer2"></i>
														<i className="mdi mdi-information-outline spaceIcons" onClick={() => onInfoDocument(doc)}></i>
														{/*iconPadlockDocument(doc)*/}         
													</div>
												</div>
											</li>
										)}
									</ul>
								</Collapse>

							</li>
						)}
					</ul>
				</Collapse>
			</li>
		);
	}
    // --------------------------- Tareas --------------------------------
	const listTasks = () => {

        // Filter Projects with workflows 
        const aListOfProjectsWithWF = props.projects.filter( oCurrProj => ( oCurrProj.workflow !== null ) && ( oCurrProj.workflow !== undefined ) );

        // Obtain the list of Tasks from the previous list
        const aListOfTasks = aListOfProjectsWithWF.map( ( oCurrProject ) => {
            const oCurrWorkflow = oCurrProject.workflow;
            let oCurrTask = oCurrWorkflow.task;
            return oCurrTask;            
        } );
        let aListOfDocTasks = [];
        //Add tasks from document workflow (documents and document tasks already filtered)
        props.projects?.forEach( oProject =>{
            oProject.folders?.forEach(oFolder => {
                oFolder.documents?.concat(oFolder.cadDocuments).forEach(oDoc => {
                    if( oDoc.workflow?.task?.id >= 0){
                        aListOfDocTasks.push( oDoc);
                    }
                });
            });
        });

		let tasks = aListOfTasks.map( (oCurrTaskForUser) => {
            if( oCurrTaskForUser !== null ) {
                return (
                    <li className="itemTask" key={ "task-id" + oCurrTaskForUser.id } onClick={() => onInfoTask( oCurrTaskForUser )}>
                        <div className="d-flex justify-content-between itemFolder" >
                            <div>
                                <i className="mdi mdi-sticker-outline spaceIconsNoPointer"></i>
                                <span>Project Task { oCurrTaskForUser.template.taskNumber }</span>
                            </div>
                            <div>
                                <i className="mdi mdi-blank spaceIcons"></i>
                                <i className="mdi mdi-information-outline spaceIcons" onClick={() => onInfoTask( oCurrTaskForUser )}></i>
                            </div>
                        </div>
                    </li>
                )
            } else {
                return null;
            }
        });

        aListOfDocTasks.map( oCurrentDoc => {
            let oCurrentDocTask = oCurrentDoc.workflow?.task;
            if( oCurrentDocTask !== null ) {
                tasks.push(
                    <li className="itemTask" key={ "task-id" + oCurrentDocTask.id } onClick={() => onInfoDocTask( oCurrentDocTask,oCurrentDoc )}>
                        <div className="d-flex justify-content-between itemFolder" >
                            <div>
                                <i className="mdi mdi-sticker-outline spaceIconsNoPointer"></i>
                                <span>Document Task { oCurrentDocTask.template.taskNumber }</span>
                            </div>
                            <div>
                                <i className="mdi mdi-blank spaceIcons"></i>
                                <i className="mdi mdi-information-outline spaceIcons" onClick={() => onInfoDocTask( oCurrentDocTask,oCurrentDoc )}></i>
                            </div>
                        </div>
                    </li>
                );
            }
        });
		return tasks;

    }
    
    // --------------------------- PRINT HTML
	return (        
       <>
            
			<Toolbar />
			<hr />
			<h3>My Workspace</h3>
			<hr />
			<ul className="listul">{listProjects()}</ul>
			<ul className="listul">{listTasks()}</ul>
		</>
	);
};

const mapStateToProps = (state) => { 
    return { 
        selectDocumentNeedsSave: state.ui.selectDocumentNeedsSave,
        selectProjectOpen: state.ui.selectProjectOpen,
        selectProject: state.ui.selectProject,
        selectDocument: state.ui.selectDocument,
        
        projects: state.datas.projects,
        tasks: state.datas.tasks
    }; 
};

export default connect(mapStateToProps)(WorkSpace);
