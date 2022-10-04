import { typeComponent } from "../../components/types/typeComponent";
import { typeInfo } from "../../components/types/typeInfo";
import { typeActionUI } from "../../components/types/typeActionUI";
import { typeForm } from "../../components/types/typeForm";
import { typeSearch } from "../../components/types/typeSearch";
import { initialState } from "./uiInitalState";

import produce from 'immer'


/*
const initialState = {
	selectProject: null,					// Identificador del proyecto seleccionado.
	selectProjectOpen: null,				// Indica si el árbol del proyecto está desplegado.
	selectFolder: null,						// Identificador de la carpeta seleccionada.
	selectDocument: null,					// Identificador del fichero seleccionado.
	currentComponent: typeComponent.Back,	// Componente principal seleccionado 'Back' es igual a ninguno.
	currentInfo: typeInfo.Nothing,			// Componente de información.
	currentForm: typeForm.Nothing,			// Es cuando el componente es por norma general un formulario (no es obligatorio).
	currentSearch: typeSearch.Nothing,		// Actual grid con filtro.
}
*/
const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case typeActionUI.setForm:
			return {
				...state,
				currentForm: action.payload.form
			};
		case typeActionUI.setSearch:
			return {
				...state,
				currentSearch: action.payload.search,
				currentComponent: typeForm.Nothing,
				currentInfo: typeInfo.Nothing,
			};
		case typeActionUI.clean:
			return initialState;
		case typeActionUI.setComponent:
			return {
				...state,
				currentComponent: action.payload.component,
				currentInfo: typeInfo.Nothing,
				currentSearch: typeSearch.Nothing,
			};
		case typeActionUI.setSelectProject:
			return {
				...state,
				currentInfo: action.payload.info,
				selectProject: action.payload.project,
			};
		case typeActionUI.setSelectProjectOpen:
			return {
				...state,
				selectProjectOpen: action.payload.project,
			};
		case typeActionUI.setSelectFolder:
			return {
				...state,
				currentInfo: action.payload.info,
				selectFolder: action.payload.folder,
            };
        case typeActionUI.setIsDocLinkedToProject:
                return {
                    ...state,
                    isDocLinkedToProject: action.payload.flag,
                };
/*  		case typeActionUI.setSelectFolderOpen:
			return {
				...state,
				selectFolderOpen: action.payload.folder,
			}; */
		case typeActionUI.setSelectDocument:
            if( action.payload.document?.Description === null ) {
                action.payload.document.Description = "";
            }
			return {
				...state,
				currentInfo: action.payload.info,
				selectDocument: action.payload.document,
                selectDocumentNeedsSave: false
            };
        case typeActionUI.setSelectDocumentNeedsSave:                
                return {
                    ...state,
                    selectDocumentNeedsSave: action.payload.selectDocumentNeedsSave
                };
        case typeActionUI.setSelectTask:
            return {
                ...state,
                currentInfo: action.payload.info,
                selectTask: action.payload.task,
            };
        case typeActionUI.setSelectDocTask:
                return {
                    ...state,
                    currentInfo: action.payload.info,
                    selectDocTask: action.payload.docTask,
                };
        case typeActionUI.setSelectDocumentType:
            return {
                ...state,
                selectDocumentType: action.payload.documentType
            };
        case typeActionUI.setSelectDocumentApplication:
            return {
                ...state,
                selectDocumentApplication: action.payload.documentApplication
            };
		case typeActionUI.setInfo:
			return {
				...state,
				currentInfo: action.payload.info,
			};
        case typeActionUI.setProjectId:
            return {
                ...state,
                projectId: action.payload.projectId
            }
        case typeActionUI.setDocumentTemplateId:
                return {
                    ...state,
                    templateId: action.payload.templateId
                }
        case typeActionUI.setDocumentTemplateTasks:
            return {
                ...state,
                currentWorkflowTasks: action.payload.tasksList
            }
        case typeActionUI.setProjectWorkflowTemplate:
            return {
                ...state,
                selectProjectWorkflowTemplate: action.payload.WFTemplate
            }
        case typeActionUI.setProjectLeader:
            return {
                ...state,
                selectProjectLeader: action.payload.projectLeader
            }
        case typeActionUI.setWorkflowUser:
            return {
                ...state,
                selectWorkflowUser: action.payload.workflowUser
            }
        case typeActionUI.setShowProjectLeaderModal:
            return {
                ...state,
                showLeaderModal: action.payload.showLeaderModal
            }
        case typeActionUI.setShowUserModal:
            return {
                ...state,
                showUserModal: action.payload.showUserModal
            }
        case typeActionUI.setShowLifecycleModal:
            return {
                ...state,
                showLifecycleModal: action.payload.showLifecycleModal
            }
        case typeActionUI.setShowLifecyclePromote:
            return {
                ...state,
                showLifecyclePromote: action.payload.showLifecyclePromote
            }
        case typeActionUI.setShowLifecycleDemote:
            return {
                ...state,
                showLifecycleDemote: action.payload.showLifecycleDemote
            }
        case typeActionUI.setSelectLCStage:
            return {
                ...state,
                selectLCStage: action.payload.selectLCStage
            }
        case typeActionUI.updateSelectDocumentDescription:
            //let oNewDocument = action.payload.document;
            //oNewDocument.description = action.payload.newDescription;

            var oOldSelectDocument = state.selectDocument
            var oNewSelectDocument = produce( oOldSelectDocument, draftState => {
                draftState.description =  action.payload.newDescription;                
            });
        
            return {
                ...state,
                selectDocument: oNewSelectDocument
        }
		default:
			return state;
	}
}

export default uiReducer;