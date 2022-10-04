import { typeActionDatas } from "../../components/types/typeActionDatas";

export const createProject = (project) => {
	console.log(project);
	return {
		type: typeActionDatas.createProject,
		payload: {
			project: project
		}	
	}
}
export const createProjectWorkflow = (projectworkflow) => {
	console.log(projectworkflow);
	return {
		type: typeActionDatas.createProjectWorkflow,
		payload: {
			projectworkflow: projectworkflow
		}	
	}
}
export const createDocumentWorkflow = (documentworkflow, document, project, folder) => {
	console.log(documentworkflow);
	return {
		type: typeActionDatas.createDocumentWorkflow,
		payload: {
			documentworkflow: documentworkflow,
            document: document,
            project: project,
            folder: folder
		}	
	}
}
export const createDocument = (document, project, folder) => {
	console.log(document);
	return {
		type: typeActionDatas.createDocument,
		payload: {
			document: document,
            project: project,
            folder: folder
		}	
	}
}
export const createCADDocument = (document, project, folder) => {
	console.log(document);
	return {
		type: typeActionDatas.createCADDocument,
		payload: {
			document: document,
            project: project,
            folder: folder
		}	
	}
}

export const createDocumentRevision = (documentRev, document, project, folder) => {
	console.log(document);
	return {
		type: typeActionDatas.createDocumentRevision,
		payload: {
            documentRev: documentRev,
			document: document,
            project: project,
            folder: folder
		}	
	}
}
export const createCADDocumentRevision = (documentRev, document, project, folder) => {
	console.log(document);
	return {
		type: typeActionDatas.createCADDocumentRevision,
		payload: {
			documentRev: documentRev,
			document: document,
            project: project,
            folder: folder
		}	
	}
}

export const updateProject = ( oProject ) => {
	return {
		type: typeActionDatas.updateProject,
		payload: {
            project: oProject
        }    
	}
}
export const updateDocument = (document, project, folder) => {
	console.log(document);
	return {
		type: typeActionDatas.updateDocument,
		payload: {
            document: document,
            project: project,
			folder: folder
		}	
	}
}
/*export const updateDocumentDescription = ( document,project, newDescription ) => {
	console.log(document);
	return {
		type: typeActionDatas.updateDocumentDescription,
		payload: {
            document: document,
            //project: project,
            description: newDescription
		}	
	}
}*/
export const saveShowDescription = (bShow) =>{
    return {
		type: typeActionDatas.saveShowDescription,
		payload: {
			showDescription: bShow
        }
	}
}

export const saveOriginalDocumentDescription = ( sOrigDescription ) => {
	return {
		type: typeActionDatas.saveOriginalDocumentDescription,
		payload: {
			origDescription: sOrigDescription
        }
	}
}
export const updateWorkSpaceTasks = (tasks) => {
	return {
		type: typeActionDatas.updateWorkSpaceTasks,
		payload: {
			tasks: tasks
		}
	}
}
export const updateWorkSpace = (projects/*, tasks, errors*/) => {
	return {
		type: typeActionDatas.updateWorkSpace,
		payload: {
			projects: projects/*,
			tasks: tasks,
			errors: errors*/
		}
	}
}
// open = true/false (abierto/cerrado)
export const setOpenFolder = (open, project, folder) => {
	return {
		type: typeActionDatas.setOpenFolder,
		payload: {
			open: open,
			project: project,
			folder: folder,
		}
	}
}
export const setErrors = (errors) => {
	return {
		type: typeActionDatas.setErrors,
		payload: {
			errors: errors
		}
	}
}
export const resetData = ( ) => {
	return {
		type: typeActionDatas.resetData,
		payload: null
	}
}