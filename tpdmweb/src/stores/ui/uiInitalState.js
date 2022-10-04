import { typeComponent } from "../../components/types/typeComponent";
import { typeInfo } from "../../components/types/typeInfo";
import { typeForm } from "../../components/types/typeForm";
import { typeSearch } from "../../components/types/typeSearch";

export const initialState = {
	selectProject: null,					// Proyecto seleccionado.
	selectProjectOpen: null,				// Proyecto abierto.
    selectProjectWorkflowTemplate: null,    // Template de orkflow de proyecto seleccionado
	selectFolder: null,						// Carpeta seleccionada.
    selectDocument: null,					// Fichero seleccionado.
    selectDocumentNeedsSave: false,         // Indica si algún campo del fichero seleccionado ha sido modificado y se debe guardar.
    selectProjectLeader: null,              // Lider de proyecto seleccionado.
    selectWorkflowUser: null,               // Usuario asignado a un workflow.
    selectLCStage: null,                    // Siguiente estado del ciclo de viuda asignado a un projecto.
    selectDocumentType: null,               // Tipo de documento seleccionado (Documento normal y CAD)
    isDocLinkedToProject: false,            // Indicador si el fichero nuevo está asignado a un proyecto o no
    //selectDocumentOpen: null,				// Documento abierto.
	selectTask: null,						// Tarea seleccionada.
	currentComponent: typeComponent.Back,	// Componente principal seleccionado 'Back' es igual a ninguno.
	currentInfo: typeInfo.Nothing,			// Componente de información.
	currentForm: typeForm.Nothing,			// Es cuando el componente es por norma general un formulario (no es obligatorio).
	currentSearch: typeSearch.Nothing,		// Actual grid con filtro.
    templateId: '-1',                       // Document Workflow template seleccionado
    currentWorkflowTasks: null,             // Nombre de tareas asignadas al workflow seleccionado
    showLeaderModal: false,                 // Flag para mostrar el diálogo de selección de usuarios (para asignar leader)
    showUserModal: false,                   // Flag para mostrar el diálogo de selección de usuarios (para asignar una tarea)
    showLifecycleModal: false,              // Flag para mostrar el diálogo de ciclo de vide de proyecto.
    showLifecyclePromote: false,            // Flag para mostrar el formulario para avanzar el ciclo de vida de un proyecto.
    showLifecycleDemote: false,             // Flag para mostrar el formulario para retroceder el ciclo de vida de un proyecto.
    selectDocTask: null 				    // Tarea seleccionada.
}