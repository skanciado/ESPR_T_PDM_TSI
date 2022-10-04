import { typeActionUI } from "../../components/types/typeActionUI";
import { typeInfo } from "../../components/types/typeInfo";

export const clean = () => {
	return {
		type: typeActionUI.clean
	}
}

export const setComponent = (component) => {
	return {
		type: typeActionUI.setComponent,
		payload: {
			component: component
		}	
	}
}

export const setInfo = (info) => {
	return {
		type: typeActionUI.setInfo,
		payload: {
			info: info
		}
	}
}

export const setSelectProject = (project) => {
	return {
		type: typeActionUI.setSelectProject,
		payload: {
			info: typeInfo.Project,
			project: project,
		}
	}
}

export const setSelectProjectOpen = (project) => {
	return {
		type: typeActionUI.setSelectProjectOpen,
		payload: {
			info: typeInfo.Project,
			project: project,
		}
	}
}

export const setSelectFolder = (folder) => {
	return {
		type: typeActionUI.setSelectFolder,
		payload: {
			info: typeInfo.Folder,
			folder: folder,
		}
	}
}


export const setIsDocLinkedToProject = (flag) => {
	return {
		type: typeActionUI.setIsDocLinkedToProject,
		payload: {
			info: typeInfo.Flag,
			flag: flag,
		}
	}
}
/* export const setSelectFolderOpen = (folder) => {
	return {
		type: typeActionUI.setSelectFolderOpen,
		payload: {
			info: typeInfo.Folder,
			folder: folder,
		}
	}
} */

export const setSelectDocument = (document) => {
	return {
		type: typeActionUI.setSelectDocument,
		payload: {
			info: typeInfo.Document,
			document: document,
		}
	}
}

export const setSelectDocumentNeedsSave = (documentSaveStatus) => {
	return {
		type: typeActionUI.setSelectDocumentNeedsSave,
		payload: {
			info: typeInfo.Document,
			selectDocumentNeedsSave: documentSaveStatus,
		}
	}
}

export const setSelectTask = (task) => {
	return {
		type: typeActionUI.setSelectTask,
		payload: {
			info: typeInfo.Task,
			task: task,
		}
	}
}

export const setSelectDocTask = (docTask) => {
	return {
		type: typeActionUI.setSelectDocTask,
		payload: {
			info: typeInfo.DocTask,
			docTask: docTask,
		}
	}
}


export const setSelectDocumentType = (type) => {
	return {
		type: typeActionUI.setSelectDocumentType,
		payload: {
			info: typeInfo.Task,
			documentType: type,
		}
	}
}

export const setSelectDocumentApplication = (application) => {
	return {
		type: typeActionUI.setSelectDocumentApplication,
		payload: {
			info: typeInfo.Task,
			documentApplication: application,
		}
	}
}

export const setForm = (form) => {
	return {
		type: typeActionUI.setForm,
		payload: {
			form: form
		}
	}
}

export const setSearch = (search) => {
	return {
		type: typeActionUI.setSearch,
		payload: {
			search: search
		}
	}
}

export const setProjectId = ( projId ) => {
	return {
		type: typeActionUI.setProjectId,
		payload: {
			projectId: projId
		}
	}
}

export const setDocumentTemplateId = ( tempId ) => {
	return {
		type: typeActionUI.setDocumentTemplateId,
		payload: {
			templateId: tempId
		}
	}
}

export const setDocumentTemplateTasks = ( tasksList ) => {
	return {
		type: typeActionUI.setDocumentTemplateTasks,
		payload: {
			tasksList: tasksList
		}
	}
}


export const setProjectWorkflowTemplate = ( oWFTemplate ) => {
	return {
		type: typeActionUI.setProjectWorkflowTemplate,
		payload: {
			WFTemplate: oWFTemplate
		}
	}
}


export const setProjectLeader = ( oUser ) => {
	return {
		type: typeActionUI.setProjectLeader,
		payload: {
			projectLeader: oUser
		}
	}
}

export const setWorkflowUser = ( oUser ) => {
	return {
		type: typeActionUI.setWorkflowUser,
		payload: {
			workflowUser: oUser
		}
	}
}

export const setShowProjectLeaderModal = ( bValue ) => {
	return {
		type: typeActionUI.setShowProjectLeaderModal,
		payload: {
			showLeaderModal: bValue
		}
	}
}


export const setShowUserModal = ( bValue ) => {
	return {
		type: typeActionUI.setShowUserModal,
		payload: {
			showUserModal: bValue
		}
	}
}


export const setShowLifecycleModal = ( bValue ) => {
	return {
		type: typeActionUI.setShowLifecycleModal,
		payload: {
			showLifecycleModal: bValue
		}
	}
}


export const setShowLifecyclePromote = ( bValue ) => {
	return {
		type: typeActionUI.setShowLifecyclePromote,
		payload: {
			showLifecyclePromote: bValue
		}
	}
}


export const setShowLifecycleDemote = ( bValue ) => {
	return {
		type: typeActionUI.setShowLifecycleDemote,
		payload: {
			showLifecycleDemote: bValue
		}
	}
}


export const setSelectLCStage = ( oNewLCStage ) => {
	return {
		type: typeActionUI.setSelectLCStage,
		payload: {
			selectLCStage: oNewLCStage
		}
	}
}


export const updateSelectDocumentDescription = ( oSelectDocument, dDescrNewValue ) => {
	return {
		type: typeActionUI.updateSelectDocumentDescription,
		payload: {
            document:       oSelectDocument,
			newDescription: dDescrNewValue
		}
	}
}