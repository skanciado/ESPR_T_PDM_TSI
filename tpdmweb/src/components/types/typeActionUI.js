
export const typeActionUI = {
	clean: '[UI] Clean',						                    // Limpia la UI.
	setComponent: '[UI] Update Component',		                    // Cambia el componente principal.
	setInfo: '[UI] Update Info',				                    // Cambia el componente de información.
	setSelectProject: '[UI] Select Project', 	                    // Cambia el componente de información y selecciona el projecto.
	setSelectProjectOpen: '[UI] Open Project',	                    // Igual que setSelectProject y abre el projecto.
    setSelectFolder: '[UI] Select Folder',		                    // Cambia el componente de información y selecciona la carpeta.
    //setSelectFolderOpen: '[UI] Open Folder',	                    // Igual que setSelectFolder y abre la carpeta.
    setIsDocLinkedToProject: '[UI] Document linked to Project',     // Indica si creamos un documento nuevo desde Workspace (linked) o desde Options (no linked).
    setSelectDocument: '[UI] Select Document',	                    // Cambia el componente de información y selecciona el documento.
    setSelectDocumentNeedsSave: '[UI] Select Document Needs Save',  // Cambia el estado de guardado del documento.
    setSelectTask: '[UI] Select Task',	                            // Cambia el componente de información y selecciona la tarea.
    setSelectDocumentType: '[UI] Select DocumentType',              // Cambia el dropdown de tipo de documento seleccionado
    setSelectDocumentApplication: '[UI] Select DocumentApplication', // Cambia el dropdown de tipo de aplicacion seleccionado
	setForm: '[UI] Update Form',				                    // Cambia el componente formulario.
	setSearch: '[UI] Search',					                    // Cambia el componente de búsqueda.
    setDocumentTemplateId: '[UI] Document Template Id',
    setProjectId: '[UI] Project Id',
    setDocumentTemplateTasks: '[UI] Document Template List Of tasks',
    setProjectWorkflowTemplate: '[UI] Project Workflow Template',  // Cambia el template de Workflow de Proyecto selecionado.
    setProjectLeader: '[UI] Project Leader',
    setWorkflowUser: '[UI] Workflow User',
    setShowProjectLeaderModal: '[UI] Show ProjectLeader Modal',
    setShowUserModal: '[UI] Show User Modal',
    setShowLifecycleModal: '[UI] Show Lifecycle Modal',
    setShowLifecyclePromote: '[UI] Show Lifecycle Promote',
    setShowLifecycleDemote: '[UI] Show Lifecycle Demote',
    setSelectLCStage: '[UI] Select LC Stage',
    updateSelectDocumentDescription: '[UI] Update Select Document Description',
    setSelectDocTask: '[UI] Select Document Workflow Task',	       // Cambia el componente de información y selecciona la tarea.  
};