import axios from 'axios';
import dotenv from  'dotenv'
import { generateRandomId } from '../../../helpers/utils';


class PdmApi {
    

    static instance = null;
	pdmAxios = null;
	//token = '';
	constructor(baseUrl, timeOut) {
		var newAxiosInstance = axios.create({ baseURL: baseUrl, timeout: timeOut });
		// Definir renove automático de tokens ? (acción previa en cada petición para detectar cuando caducado )
		this.pdmAxios = newAxiosInstance;
		//this.token    ='';
	}
	static createInstance() {
        console.log( process.env.REACT_APP_STRAPI_HOST )
		var object = new PdmApi('http://' + process.env.REACT_APP_STRAPI_HOST + ':1337/', 5000);
		//this.pdmAxios = newAxiosInstance;
		return object;
	}
	static getInstance() {
		if (!PdmApi.instance) {
			PdmApi.instance = PdmApi.createInstance();
		}
		return PdmApi.instance;
	}
	async login(username, password) {
		try {
			const response = await this.pdmAxios.post('auth/local', {
				identifier: username,
				password: password,
			});
			return response;
		} catch (e) {
			console.log('[PdmAPI:login] Exception found: "' + e + '"');
			return e;
		}
	}
	// ________________________________________________________________________________________ WORKSPACE
	// Devuelve el workSpace de un usuario.
	async loadMyWorkSpaceForLoggedUser( oUserInfo ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            // Buscar los proyectos de Strapi que cumplan las siguientes condiciones:
            //  1- Proyectos en los que el usuario aparezca en la lista de Team (al estar en la lista, se considera un usuario autorizado) 
            //  2- Proyectos que tienen workflow asignado, en los que el usuario sea project_leader.
            //const sql = '_where[_or][0][projectLeader_eq]=' + oUserInfo.id + '&_where[_or][1][team_eq]=' + oUserInfo.id;
            //const responseProjects = await this.pdmAxios.get('/projects?' + sql , config);
            //  3- Proyectos que tienen workflow asignado, en los que la tarea activa (task) tiene como role_assigned uno de los del usuario
            //const responseTasks = await this.pdmAxios.get('/projectTasks?[roleAssigned_eq]=' + oUserInfo.id , config);
            //const responseProjectsWorkflows = await this.pdmAxios.get('/projectWorkflows?[task_eq]=' + responseTasks.CompletedInfo , config);
            //const responseProjects2 = await this.pdmAxios.get('/projects?[workflow_eq]=' + responseProjectsWorkflows.Comments , config);

            //Filtramos el resultado más adelante
            const responseProjects = await this.pdmAxios.get('/projects' , config);
            return responseProjects;
		}
		catch (e) {
			console.log('[PdmAPI:loadMyWorkSpaceForLoggedUser] Exception found: "' + e + '"');
			return e;
		}
	}

    filterData( projects, username, role ){
        let projFiltered = [];
        projects.forEach( oProject => {
            //user is the project leader or in the project team
            let bCond1 = (oProject.projectLeader?.username === username || oProject.team.some( e => e.username === username ));
            let addProj = bCond1;
            oProject.folders.forEach( oFolder => {
                let docsFiltered=[];
                let cadDocsFiltered=[];
                oFolder.documents.concat(oFolder.cadDocuments).forEach( oDoc => {
                    
                    if( oDoc.workflow?.task?.id && oDoc.workflow.assignedUser.username !== username){
                        oDoc.workflow.task = null;
                    }
                    //Documents showed: 
                    //  when the role has rights to modify it
                    if( oDoc.rights?.modify?.some( e => e.name === role )){
                        (oDoc.application?.name)? cadDocsFiltered.push(oDoc): docsFiltered.push(oDoc);
                        addProj = true;
                    }
                    //  when the role has rights to read it
                    else if( oDoc.rights?.read?.some( e => e.name === role )){
                        (oDoc.application?.name)? cadDocsFiltered.push(oDoc): docsFiltered.push(oDoc);
                        addProj = true;
                    }
                    //  when no rights defined and the user is the project leader or in the project team
                    else if( ( oDoc.rights === null || oDoc.rights?.modify?.length === 0 || oDoc.rights?.read?.length === 0 )  && bCond1 ){
                        (oDoc.application?.name)? cadDocsFiltered.push(oDoc): docsFiltered.push(oDoc);
                        addProj = true;
                    }
                });
                oFolder.documents = docsFiltered;
                oFolder.cadDocuments = cadDocsFiltered;
            });
            let oCurrentTask = oProject.workflow?.task;
            if( oCurrentTask !== null && oCurrentTask !== undefined ){
                if( oCurrentTask.template?.roleAssigned?.length === 0 || !oCurrentTask.template?.roleAssigned?.some( e => e.name === role )){
                    oProject.workflow.task = null;
                }else{
                    addProj = true;
                }
            }
            if( addProj && bCond1 ){
                projFiltered.push( oProject );
            }
        } );
        return projFiltered;
    }


	async createProject( projectData ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            //let response = {
            //    status: 200,
            //    data: null
            //};
            //Retrieve ProjectStatus From DB
            const iStatusId = projectData.Status;            
            const responseStatus = await this.pdmAxios.get('/project-statuses/' + iStatusId, config );
            const responseFoldersData = await this.createFolders(['Commercial', 'Management', 'Design', 'Launch']);
            const responseLifecycle = await this.createLifecycle(projectData.Name, 'project-lifecycles', 'project-graph-node-statuses');
            //Build the Team List, and include the user that creates the project as a member
            let aTeamList = [];
            aTeamList.push( projectData.CreatorUser );
            let oNewProject = {
                name:       projectData.Name,
                status:     responseStatus.data,
                startDate:  new Date(),
				projectId:  projectData.ProjectID,
				team:       aTeamList,
                lifecycle:  responseLifecycle.data,
                folders: responseFoldersData
            }
			const responseProject = await this.pdmAxios.post('/projects', oNewProject, config);
            //oNewProject.id = responseProject.data.id;
            //response.status = responseProject.status;
            //response.data = oNewProject;
            const response = await this.pdmAxios.get('/projects/' + responseProject.data.id, config);
			return response;
		} catch (e) {
			console.log('[PdmAPI:createProject] Exception found: "' + e + '"');
			return e;
		}
    }
    //crea las carpetas para el proyecto nuevo
    async createFolders(arrPhaseName) {
        const config = await this.getTokenFromLocalStorage();
		try {
            const responsefolders = await this.pdmAxios.get('/folders', config );
            let maxPhaseNumber = 0;
            responsefolders.data.map( (oCurrFolder) => {
                if( oCurrFolder.phaseNumber > maxPhaseNumber ) {
                    maxPhaseNumber = oCurrFolder.phaseNumber;
                };
            });
            let oNewFolders = [];
            arrPhaseName.map( (oCurrPhaseName) => {
                maxPhaseNumber += 1;
                let oFolder ={
                    phaseNumber: maxPhaseNumber,
                    phaseName: oCurrPhaseName
                };
                oNewFolders.push(oFolder);
            });
            let responseFolders = [];
            for (let i = 0; i < oNewFolders.length; i++) {
                let responseFolder = await this.pdmAxios.post('/folders', oNewFolders[i], config);
                responseFolders.push(responseFolder.data);
            };
            return responseFolders;
        } catch (e) {
			console.log('[PdmAPI:createFolders] Exception found: "' + e + '"');
			return e;
		}     
    }
    //crea un ciclo de vida con los estados existentes en la tabla de estados
    async createLifecycle(nameLifecycle, nameTableLifecycles, nameTableGraphNodeStatuses) {
        const config = await this.getTokenFromLocalStorage();
		try {
            //let response = {
            //    status: 200,
            //    data: null
            //};
            const responseGraphNodeStatuses = await this.pdmAxios.get('/' + nameTableGraphNodeStatuses, config );
            let oNewLifecycle = {
                name: "Lifecycle" + nameLifecycle,
                lifecycle: responseGraphNodeStatuses.data
            }
            const responseLifecycle = await this.pdmAxios.post('/' + nameTableLifecycles, oNewLifecycle, config);
            //oNewLifecycle.id = responseLifecycle.data.id;
            //response.status = responseLifecycle.status;
            //response.data = oNewLifecycle;
            const response = await this.pdmAxios.get('/' + nameTableLifecycles + '/' + responseLifecycle.data.id, config);
            return response;
        } catch (e) {
			console.log('[PdmAPI:createLifecycle] Exception found: "' + e + '"');
			return e;
		}     
    }
	async createProjectWorkflow( oCurrentProject, oWorkflowTemplate, oProjectLeader, sComments ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            // Fields that aren't sent in the query are not changed in the db.
            // BUILD THE OBJECT WITH DATA THAT HAS TO BE CHANGED! 
			// const response = await this.pdmAxios.post('/createProjectWorkflow', projectworkflow);
			// return response;
            // Generate random Ids (not needed when using Strapi)
            const aListOfTasksTemplates = oWorkflowTemplate.tasks;
            // Create list of Tasks, based on TaskTemplates
            // TODO: Which role do we assign on each Task?
            const aListOfTasks = aListOfTasksTemplates.map( oCurrTaskTemplate => {
                const aListOfActionTemplates = oCurrTaskTemplate.actions;
                // Create list of Actions, based on ActionTemplates
                const aListOfActions = aListOfActionTemplates.map( oCurrActionTemplate => {
                    return (
                        {
                            id: generateRandomId(),
                            actionTemplate: oCurrActionTemplate,
                            status: oCurrActionTemplate.status 
                        }
                    );
                } )
                return (
                    {
                        id: generateRandomId(),
                        template: oCurrTaskTemplate,
                        roleAssigned: oProjectLeader.application_roles,
                        actions: aListOfActions
                    }
                );
            }) 
            //let aListOfTasksOrderByTaskNumber = aListOfTasks.sort( oT => oT.template.taskNumber);
            let oAction = null;
            for (let i = 0; i < aListOfTasks.length; i++) {
                for (let e = 0; e < aListOfTasks[i].actions.length; e++) {
                    const responseActions = await this.pdmAxios.post('/actions', aListOfTasks[i].actions[e], config);
                    aListOfTasks[i].actions[e].id = responseActions.data.id;
                    if ((oAction == null) && aListOfTasks[i].actions[e].status == false)
                    {
                        oAction = aListOfTasks[i].actions[e]
                    }
                }
                const responseProjectTasks = await this.pdmAxios.post('/project-tasks', aListOfTasks[i], config);
                aListOfTasks[i].id = responseProjectTasks.data.id;
            };
            // Create the ProejctWorkflow (Assign the first Task as Active).
            const oNewProjectWorkflow = {
                comments: sComments,
                template: oWorkflowTemplate,
                task: aListOfTasks[0],
                action: oAction,
                tasks: aListOfTasks
            }
            const responseProjectWorkflows = await this.pdmAxios.post('/project-workflows', oNewProjectWorkflow, config);
            oNewProjectWorkflow.id = responseProjectWorkflows.data.id;
            oCurrentProject.workflow = oNewProjectWorkflow;
            const oWorkflow = {
                workflow: responseProjectWorkflows.data
            };
            const responseProjectWorkflow = await this.pdmAxios.put('/projects/' + oCurrentProject.id, oWorkflow, config);
            oCurrentProject.projectLeader = oProjectLeader;
            const oLeader = {
                projectLeader: oProjectLeader
            };
            const responseProjectLeader = await this.pdmAxios.put('/projects/' + oCurrentProject.id, oLeader, config);
            //console.log(JSON.stringify( oCurrentProject ));
            //const response = {
            //    status: 200,
            //    data: oCurrentProject
            //};
            const responseProject = await this.pdmAxios.get('/projects/' + oCurrentProject.id, config);
            const responseProjectWorkfloww = await this.pdmAxios.get('/project-workflows/' + responseProjectWorkflows.data.id, config);
            let response = {
                status: 200,
                data: {
                    project: responseProject.data,
                    projectWorkflow: responseProjectWorkfloww.data
                }
            };
            return response;
		} catch (e) {
			console.log('[PdmAPI:createProjectWorkflow] Exception found: "' + e + '"');
			return e;
		}
    } 
	async createDocumentWorkflow(oCurrentProject, oWorkflowTemplate, document, tableDocName) {
        const config = await this.getTokenFromLocalStorage();
		try {
            const responseDocumentWorkflowTemplate = await this.getWorkflowById(oWorkflowTemplate.template);
            const aListOfTasksTemplates = responseDocumentWorkflowTemplate.data.tasks;
            const aListOfTasks = aListOfTasksTemplates.map( oCurrTaskTemplate => {
                const aListOfActionTemplates = oCurrTaskTemplate.actions;
                const aListOfActions = aListOfActionTemplates.map( oCurrActionTemplate => {
                    return (
                        {
                            id: generateRandomId(),
                            actionTemplate: oCurrActionTemplate,
                            status: oCurrActionTemplate.status 
                        }
                    );
                } )
                return (
                    {
                        id: generateRandomId(),
                        template: oCurrTaskTemplate,
                        //roleAssigned: oCurrentProject.projectLeader.application_roles,
                        actions: aListOfActions
                    }
                );
            }) 
            //let aListOfTasksOrderByTaskNumber = aListOfTasks.sort( oT => oT.template.taskNumber);          
            let oAction = null;
            for (let i = 0; i < aListOfTasks.length; i++) {
                for (let e = 0; e < aListOfTasks[i].actions.length; e++) {
                    const responseActions = await this.pdmAxios.post('/actions', aListOfTasks[i].actions[e], config);
                    aListOfTasks[i].actions[e].id = responseActions.data.id;
                    if ((oAction == null) && aListOfTasks[i].actions[e].status == false)
                    {
                        oAction = aListOfTasks[i].actions[e]
                    }
                }
                const responseProjectTasks = await this.pdmAxios.post('/document-tasks', aListOfTasks[i], config);
                aListOfTasks[i].id = responseProjectTasks.data.id;
            };
            const sql = '_where[username_eq]=' + oWorkflowTemplate.assignedUser;
			const responseUser = await this.pdmAxios.get('/users?' + sql, config);
            const oNewDocumentWorkflow = {
                document: document,
                template: responseDocumentWorkflowTemplate.data,
                task: aListOfTasks[0],
                action: oAction,
                tasks: aListOfTasks,
                assignedUser: responseUser.data[0]
            }
            const responseDocumentWorkflows = await this.pdmAxios.post('/document-workflows', oNewDocumentWorkflow, config);
            //oNewDocumentWorkflow.id = responseDocumentWorkflows.data.id;
            const oWorkflow = {
                workflow: responseDocumentWorkflows.data
            };
            const responseDocumentWorkflow = await this.pdmAxios.put('/' + tableDocName + '/' + document.id, oWorkflow, config);

            const response = await this.pdmAxios.get('/document-workflows/' + responseDocumentWorkflows.data.id, config);
            return response;
		} catch (e) {
			console.log('[PdmAPI:createDocumentWorkflow] Exception found: "' + e + '"');
			return e;
		}
    }

    async getCorrectRight(type){
        //TODO: Options hardcoded for the demo
        let id = 0;
        if( type === "Proposal"){
            id = 1;    
        }else if(type === "Contract" ){
            id = 2;
        }else if( type === "Planification" ){
            id = 3;
        }else{
            return null;
        }
        const responseStatus = await this.strapiFindOneItems('rights', id );
        return responseStatus.data;
        
    }

	async createDocument(document, folderId) {
        //TODO: de la tabla documents en que campo se guarda el valor documentProjectName? (no equivaldria a la tabla y campo CADDocuments.Project)?
        const config = await this.getTokenFromLocalStorage();
		try {
            let oFile = null;
            if ((document.File != null) && (document.File.name != ''))
            {
                const sDocFile = document.File.name;
                const endPath = sDocFile.lastIndexOf('\\') + 1;

                let sFileName = sDocFile.substring(endPath, sDocFile.length);
                
                let fileData = new FormData();
                fileData.append('files', document.File );
                
                const responseUpload = await this.pdmAxios.post('/upload',fileData,config);
                
                const oNewFile = {
                    name: sFileName,
                    path: sDocFile.substring(0, endPath),
                    content: responseUpload.data[0]
                }
                const responseFile = await this.pdmAxios.post('/file-1-s', oNewFile, config);
                oFile = responseFile.data;
            }
            const oCorrectRight = await this.getCorrectRight(document.Type.name);
            const responseLifecycle = await this.createLifecycle(document.Name, 'document-life-cycles', 'document-graph-node-statuses');
            const sql = '_where[name_eq]=' + document.Status;
            const responseStatus = await this.pdmAxios.get('/document-statuses?' + sql , config);
            const oNewDocument = {
                name: document.Name,
                documentId: document.DocumentID,
                type: document.Type,
                status: responseStatus.data[0],
                files: oFile,
                revision: document.Revision,
                lifecycle: responseLifecycle.data,
                locked: false,
                rights: oCorrectRight
            }
            let response = {
                status: 200,
                data: null
            };
            const responseDocument = await this.pdmAxios.post('/documents', oNewDocument, config);
            if(responseDocument.status === 200 ){
                response = await this.pdmAxios.get('/documents/' + responseDocument.data.id, config);
                if( response.status === 200 ){
                    if (folderId != null)
                    {
                        document.FolderID = folderId;
                    }
                    if ((document.FolderID != null) && (document.FolderID != '') ) {
                        let responseFolders = await this.pdmAxios.get('/folders/' + document.FolderID , config);
                        responseFolders.data.documents.push(response.data);
                        const oDocument = {
                            documents: responseFolders.data.documents
                        };
                        const responseFolder = await this.pdmAxios.put('/folders/' + document.FolderID, oDocument, config);
                        if( responseFolder.status !== 200 ){
                            //TODO: review error handling
                            console.log('[PdmAPI:createDocument] Exception found adding new document to folder');     
                        }
                    }
                }
            }
            return response;
		} catch (e) {
			console.log('[PdmAPI:createDocument] Exception found: "' + e + '"');
			return e;
		}
    }

	async createCADDocument(document, folderId) {
        //TODO: el parametro document.ProjectsNames se guarda en cad-documents.Project?
        const config = await this.getTokenFromLocalStorage();
		try {
            //TODO: pantalla objetos "document type" y "cad aplication" sustituir por combos.
            let oFile = null;
            if ((document.File != null) && (document.File.name != ''))
            {
                const sDocFile = document.File.name;
                const endPath = sDocFile.lastIndexOf('\\') + 1;

                let sFileName = sDocFile.substring(endPath, sDocFile.length);
                
                let fileData = new FormData();
                fileData.append('files', document.File );
                
                const responseUpload = await this.pdmAxios.post('/upload',fileData,config);
                
                const oNewFile = {
                    name: sFileName,
                    path: sDocFile.substring(0, endPath),
                    content: responseUpload.data[0]
                }
                const responseFile = await this.pdmAxios.post('/file-1-s', oNewFile, config);
                oFile = responseFile.data;
            }
            //TODO: no existe tabla cad-graph-node-statuses? usar las de documents
            const responseLifecycle = await this.createLifecycle(document.Name, 'cad-document-life-cycles', 'document-graph-node-statuses');
            const sql = '_where[_or][0][name_eq]=' + document.Status;
            const responseStatus = await this.pdmAxios.get('/cad-document-statuses?' + sql , config);
            const oNewCadDocument = {
                name: document.Name,
                documentId: document.DocumentID,
                type: document.Type,
                status: responseStatus.data[0],
                files: oFile,
                application: document.Application,
                revision: document.Revision,
                lifecycle: responseLifecycle.data,
                locked: false,
                folderId: document.FolderID
            }
            let response = {
                status: 200,
                data: null
            };
            const responseCadDocument = await this.pdmAxios.post('/cad-documents', oNewCadDocument, config);
            if(responseCadDocument.status === 200 ){
                response = await this.pdmAxios.get('/cad-documents/' + responseCadDocument.data.id, config);
                if (folderId != null)
                {
                    document.FolderID = folderId;
                }
                if ((document.FolderID != null) && (document.FolderID != ''))
                {
                    let responseFolders = await this.pdmAxios.get('/folders/' + document.FolderID , config);
                    responseFolders.data.cadDocuments.push(responseCadDocument.data);
                    const oDocument = {
                        cadDocuments: responseFolders.data.cadDocuments
                    };
                    const responseFolder = await this.pdmAxios.put('/folders/' + document.FolderID, oDocument, config);
                    if( responseFolder.status !== 200 ){
                        //TODO: review error handling
                        console.log('[PdmAPI:createDocument] Exception found adding new document to folder');     
                    }
                }
            }
            return response;
		} catch (e) {
			console.log('[PdmAPI:createCADDocument] Exception found: "' + e + '"');
			return e;
		}
    }

    async createDocumentRevision(document,folderId){
        const config = await this.getTokenFromLocalStorage();
		try {
            let prefix = document.application ? 'cad-document':'document';
            const responseLifecycle = await this.createLifecycle(document.Name, prefix + '-life-cycles', 'document-graph-node-statuses');
            const sql = '_where[_or][0][name_eq]=InWork';
            const responseStatus = await this.pdmAxios.get('/' + prefix + '-statuses?' + sql , config);
            const oNewDocument = {
                name: document.name,
                documentId: Date.now().toString(),
                type: document.type,
                status: responseStatus.data[0],
                files: document.files,
                application: document.application,
                revision: String.fromCharCode(document.revision.charCodeAt(0) + 1),
                lifecycle: responseLifecycle.data,
                locked: false,
                folderId: document.FolderID
            }
            let response = {
                status: 200,
                data: null
            };
            const responseDocumentRev = await this.pdmAxios.post('/' + prefix +'s', oNewDocument, config);
            if(responseDocumentRev.status === 200 ){
                response = await this.pdmAxios.get('/' + prefix +'s/' + responseDocumentRev.data.id, config);
                if (folderId != null)
                {
                    document.FolderID = folderId;
                }
                if ((document.FolderID != null) && (document.FolderID != ''))
                {
                    let responseFolders = await this.pdmAxios.get('/folders/' + document.FolderID , config);
                    if( document.application ){
                        const oDocument = {
                            cadDocuments: responseFolders.data.cadDocuments.map( oCADDoc => {
                                if( oCADDoc.id === document.id){
                                    return responseDocumentRev.data
                                }
                                return oCADDoc;
                            })
                        };
                        const responseFolder = await this.pdmAxios.put('/folders/' + document.FolderID, oDocument, config);
                        if( responseFolder.status !== 200 ){
                            //TODO: review error handling
                            console.log('[PdmAPI:createDocumentRevision] Exception found adding new document to folder');     
                        }
                    }else{
                        const oDocument = {
                            documents: responseFolders.data.documents.map( oDoc => {
                                if( oDoc.id === document.id){
                                    return responseDocumentRev.data
                                }
                                return oDoc;
                            })
                        };
                        const responseFolder = await this.pdmAxios.put('/folders/' + document.FolderID, oDocument, config);
                        if( responseFolder.status !== 200 ){
                            //TODO: review error handling
                            console.log('[PdmAPI:createDocumentRevision] Exception found adding new document to folder');     
                        } 
                    }

                    
                }
                return response;
            }
		} catch (e) {
			console.log('[PdmAPI:createDocumentRevision] Exception found: "' + e + '"');
			return e;
		}
    }
    async getContent(id){
        const config = await this.getTokenFromLocalStorage();
		try {
            const response = await this.pdmAxios.get('/upload/files/'+ id,config);
            //const response2 = await this.pdmAxios.get(response.data.url,config);
            return 'http://' + process.env.REACT_APP_STRAPI_HOST + ':1337' +response.data.url;
            //return response.data;
        }
        catch(e){
            console.log('[PdmAPI:getContent] Exception found: "' + e + '"');
			return e;    
        }
    }
          

    // Modifica el team del proyecto
	async updateProjectTeam( oCurrentProject, aListOfTeamAddedUsers ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            //let response = {
            //    status: 200,
            //    data: oCurrentProject
            //};
            aListOfTeamAddedUsers.forEach( oNewTeamUser => {
                oCurrentProject.team.push( oNewTeamUser );
            } );
            const oTeam = {
                team: oCurrentProject.team
            };
            const responseTeam = await this.pdmAxios.put('/projects/' + oCurrentProject.id, oTeam, config);   
            //response.status = responseTeam.status;
            //response.data = oCurrentProject;
            const response = await this.pdmAxios.get('/projects/' + responseTeam.data.id, config);
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:updateProjectTeam] Exception found: "' + e + '"');
			return e;
		}
    }
    // Modifica el staus del proyecto
	async updateProjectStatus( oCurrentProject, oNewStatus, bPromote ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            let response = {
                status: 200,
                data: oCurrentProject
            };
            if( (oNewStatus !== null) && (oNewStatus !== undefined) && (oCurrentProject.status.name !== oNewStatus.name) ) {
                let oldStatus =  oCurrentProject.status;
                oCurrentProject.status = oNewStatus;
                let oStatus = {
                    status: oNewStatus
                };
                //We should check if it's the last status of the lifecycle
                let oGraphNodeStatus = oCurrentProject.lifecycle.lifecycle.find( node => node.state.id === oNewStatus.id);
                let oOldGraphNodeStatus = oCurrentProject.lifecycle.lifecycle.find( node => node.state.id === oldStatus.id);
                if( bPromote && (oGraphNodeStatus.children === null || oGraphNodeStatus.children.length ===0) ){
                    oStatus = {
                        status: oNewStatus,
                        finishDate: new Date()
                    };
                }else if( !bPromote && (oOldGraphNodeStatus.children === null || oOldGraphNodeStatus.children.length === 0) ){
                    oStatus = {
                        status: oNewStatus,
                        finishDate: null
                    };
                }
                const responseStaus = await this.pdmAxios.put('/projects/' + oCurrentProject.id, oStatus, config);   
                //response.status = responseStaus.status;
                //response.data = oCurrentProject;
                response = await this.pdmAxios.get('/projects/' + responseStaus.data.id, config);
            }
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:updateProjectStatus] Exception found: "' + e + '"');
			return e;
		}
    }
    // Modifica estado del documento
	async updateDocumentStatus( oCurrentDocument, oNewStatus ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            let response = {
                status: 200,
                data: oCurrentDocument
            };
            if( (oNewStatus !== null) && (oNewStatus !== undefined) && (oCurrentDocument.status.name !== oNewStatus.name) ) {
                oCurrentDocument.status = oNewStatus;
                const oStatus = {
                    status: oNewStatus
                };
                if(oCurrentDocument.application?.name){
                    const responseStaus = await this.pdmAxios.put('/cad-documents/' + oCurrentDocument.id, oStatus, config);   
                    response = await this.pdmAxios.get('/cad-documents/' + responseStaus.data.id, config);
                }else{
                    const responseStaus = await this.pdmAxios.put('/documents/' + oCurrentDocument.id, oStatus, config);   
                    response = await this.pdmAxios.get('/documents/' + responseStaus.data.id, config);
                }
                //response.status = responseStaus.status;
                //response.data = oCurrentProject;
                
            }
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:updateDocumentStatus] Exception found: "' + e + '"');
			return e;
		}
    }
    // Modifica estado del documento
	async updateDocumentLock( oCurrentDocument, bLock, sUser ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            let response = {
                status: 200,
                data: oCurrentDocument
            };
            let oUser = null;
            if( sUser !== "" ){
                const sql = '_where[username_eq]='+sUser;
                const responseUser = await this.pdmAxios.get('/users?' + sql, config);
                if( responseUser.status === 200 ) {
                    oUser = responseUser.data[0];
                }
            }
            const oStatus = {
                locked: bLock,
                userLock: oUser
            };
            if(oCurrentDocument.application?.name){
                const responseStaus = await this.pdmAxios.put('/cad-documents/' + oCurrentDocument.id, oStatus, config);   
                response = await this.pdmAxios.get('/cad-documents/' + responseStaus.data.id, config);
            }else{
                const responseStaus = await this.pdmAxios.put('/documents/' + oCurrentDocument.id, oStatus, config);   
                response = await this.pdmAxios.get('/documents/' + responseStaus.data.id, config);
            }
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:updateDocumentStatus] Exception found: "' + e + '"');
			return e;
		}
    }

    // Modifica descripcion del documento
	async updateDocumentDescription( oDoc, sDescription ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            let response = {
                status: 200,
                data: oDoc
            };
            const oStatus = {
                description: sDescription,
            };
            if(oDoc.application?.name){
                const responseStaus = await this.pdmAxios.put('/cad-documents/' + oDoc.id, oStatus, config);   
                response = await this.pdmAxios.get('/cad-documents/' + responseStaus.data.id, config);
            }else{
                const responseStaus = await this.pdmAxios.put('/documents/' + oDoc.id, oStatus, config);   
                response = await this.pdmAxios.get('/documents/' + responseStaus.data.id, config);
            }
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:updateDocumentDescription] Exception found: "' + e + '"');
			return e;
		}
    }

    // Completar una tarea de documento(añadir comentarios y asignar siguiente tarea a projecto)
	async completeDocTask( oCurrentProj, oCurrentDoc, oCompletedDocTask, sComments ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            //let response = {
            //    status: 200,
            //    data: oCurrentProject
            //};
            const bCond1 = ( sComments !== null );
            const bCond2 = ( sComments !== undefined );
            const bCond3 = ( sComments !== "" );
            //Mark all tasks as completed
            let aCompletedActions = oCompletedDocTask.actions.map( oCurrAction => {
                oCurrAction.status = true;
                return oCurrAction;
            } )
            for (let i = 0; i < oCompletedDocTask.actions.length; i++) {
                oCompletedDocTask.actions[i].status = true;
                const oStatus = {
                    status: true
                };
                const responseStaus = await this.pdmAxios.put('/actions/' + oCompletedDocTask.actions[i].id, oStatus, config);   
            }
            oCompletedDocTask.actions = aCompletedActions;
            //const oActions = {
            //    actions: oCompletedTask.actions
            //};
            //const responseActions = await this.pdmAxios.put('/project-tasks/' + oCompletedTask.id, oActions, config); 
            // Assign completeInfo
            if( bCond1 && bCond2 && bCond3  ) {
                oCompletedDocTask.completedInfo = sComments;
                const oCompletedInfo = {
                    completedInfo: oCompletedDocTask.completedInfo
                };
                const responseCompletedInfo = await this.pdmAxios.put('/document-tasks/' + oCompletedDocTask.id, oCompletedInfo, config); 
            }
            //Update Project Workflow TaskList
            let oDocWorkflow = oCurrentDoc.workflow;
            const bCond4 = ( oDocWorkflow !== null );
            const bCond5 = ( oDocWorkflow !== undefined );
            if( bCond4 && bCond5 ) {
                let aTaskList = oDocWorkflow.tasks;
                let oFoundTask = aTaskList.find( oTask => oTask.id === oCompletedDocTask.id );
                const iFoundTaskIndex = aTaskList.indexOf( oFoundTask );
                if( iFoundTaskIndex >= 0 ) {
                    aTaskList[iFoundTaskIndex] = oCompletedDocTask;
                    oDocWorkflow.tasks = aTaskList;
                    //const oTasks = {
                    //    tasks: oProjWorkflow.tasks
                    //};
                    let oNextTemplateTask = oDocWorkflow.template?.tasks.find( taskTempl => taskTempl.taskNumber === oCompletedDocTask.template.taskNumber + 1  );
                    let oNextTask = null;
                    if( oNextTemplateTask ){
                        oNextTask = oDocWorkflow.tasks.find( task => task.template.id === oNextTemplateTask.id );
                    }
                    //const responseTasks = await this.pdmAxios.put('/project-workflows/' + oProjWorkflow.id, oTasks, config);                     
                    //Replace assigned task for the next in the list
                    if( oNextTask ) {
                        oDocWorkflow.task = oNextTask;                        
                    } else {
                        oDocWorkflow.task = null;
                    }
                    const oTask = {
                        task: oDocWorkflow.task
                    };
                    const responseTask = await this.pdmAxios.put('/document-workflows/' + oDocWorkflow.id, oTask, config);
                    oCurrentDoc.workflow = oDocWorkflow;
                }
            }    
            //response.data = oCurrentProject;
            const response = await this.pdmAxios.get('/projects/' + oCurrentProj.id, config);
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:completeDocTask] Exception found: "' + e + '"');
			return e;
		}
    }


    // Completar una tarea (añadir comentarios y asignar siguiente tarea a projecto)
	async completeTask( oCurrentProject, oCompletedTask, sComments ) {
        const config = await this.getTokenFromLocalStorage();
		try {
            //let response = {
            //    status: 200,
            //    data: oCurrentProject
            //};
            const bCond1 = ( sComments !== null );
            const bCond2 = ( sComments !== undefined );
            const bCond3 = ( sComments !== "" );
            //Mark all tasks as completed
            let aCompletedActions = oCompletedTask.actions.map( oCurrAction => {
                oCurrAction.status = true;
                return oCurrAction;
            } )
            for (let i = 0; i < oCompletedTask.actions.length; i++) {
                oCompletedTask.actions[i].status = true;
                const oStatus = {
                    status: true
                };
                const responseStaus = await this.pdmAxios.put('/actions/' + oCompletedTask.actions[i].id, oStatus, config);   
            }
            oCompletedTask.actions = aCompletedActions;
            //const oActions = {
            //    actions: oCompletedTask.actions
            //};
            //const responseActions = await this.pdmAxios.put('/project-tasks/' + oCompletedTask.id, oActions, config); 
            // Assign completeInfo
            if( bCond1 && bCond2 && bCond3  ) {
                oCompletedTask.completedInfo = sComments;
                const oCompletedInfo = {
                    completedInfo: oCompletedTask.completedInfo
                };
                const responseCompletedInfo = await this.pdmAxios.put('/project-tasks/' + oCompletedTask.id, oCompletedInfo, config); 
            }
            //Update Project Workflow TaskList
            let oProjWorkflow = oCurrentProject.workflow;
            const bCond4 = ( oProjWorkflow !== null );
            const bCond5 = ( oProjWorkflow !== undefined );
            if( bCond4 && bCond5 ) {
                let aTaskList = oProjWorkflow.tasks;
                let oFoundTask = aTaskList.find( oTask => oTask.id === oCompletedTask.id );
                const iFoundTaskIndex = aTaskList.indexOf( oFoundTask );
                if( iFoundTaskIndex >= 0 ) {
                    aTaskList[iFoundTaskIndex] = oCompletedTask;
                    oProjWorkflow.tasks = aTaskList;
                    //const oTasks = {
                    //    tasks: oProjWorkflow.tasks
                    //};
                    let oNextTemplateTask = oProjWorkflow.template?.tasks.find( taskTempl => taskTempl.taskNumber === oCompletedTask.template.taskNumber+1 );
                    let oNextTask = null;
                    if( oNextTemplateTask ){
                        oNextTask = oProjWorkflow.tasks.find( task => task.template.id === oNextTemplateTask.id );
                    }

                    //const responseTasks = await this.pdmAxios.put('/project-workflows/' + oProjWorkflow.id, oTasks, config);                     
                    //Replace assigned task for the next in the list
                    if( oNextTask ) {
                        oProjWorkflow.task = oNextTask;                        
                    } else {
                        oProjWorkflow.task = null;
                    }
                    const oTask = {
                        task: oProjWorkflow.task
                    };
                    const responseTask = await this.pdmAxios.put('/project-workflows/' + oProjWorkflow.id, oTask, config);
                    oCurrentProject.workflow = oProjWorkflow;
                }
            }    
            //response.data = oCurrentProject;
            const response = await this.pdmAxios.get('/projects/' + oCurrentProject.id, config);
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:completeTask] Exception found: "' + e + '"');
			return e;
		}
    }
    async getUsers() {
		try {
            const token = localStorage.getItem( "token" );
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const sql = '_where[username_ne]=admin';
			const response = await this.pdmAxios.get('/users?' + sql, config);
			return response;
		}
		catch (e) {
			console.log('[PdmAPI:getUsers] Exception found: "' + e + '"');
			return e;
		}
    }
    async getCADDocumentApplications() {
		try {
            const response = await this.strapiFindItems('cad-appliactions');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getCADDocumentApplications] Exception found: "' + e + '"');
			return e;
		}
    }
	async getCADDocumentTypes() {
		try {
            const response = await this.strapiFindItems('cad-document-types');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getCADDocumentTypes] Exception found: "' + e + '"');
			return e;
		}
    }
	async getDocumentTypes() {
		try {
            const response = await this.strapiFindItems('document-types');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getDocumentTypes] Exception found: "' + e + '"');
			return e;
		}
    }
	async getDocuments() {
		try {
            const response = await this.strapiFindItems('documents');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getDocuments] Exception found: "' + e + '"');
			return e;
		}
    }
    async getProjects() {
		try {
            const response = await this.strapiFindItems('projects');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getProjects] Exception found: "' + e + '"');
			return e;
		}
    }
	async getProjectWorkflowTemplates() {
		try {
            const response = await this.strapiFindItems('project-workflow-templates');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getProjectWorkflowTemplates] Exception found: "' + e + '"');
			return e;
		}
    }
	async getDocumentWorkflowTemplates() {
		try {
            const response = await this.strapiFindItems('document-workflow-templates');
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getDocumentWorkflowTemplates] Exception found: "' + e + '"');
			return e;
		}
    }
	async getWorkflowById(id) {
		try {
            const response = await this.strapiFindOneItems('document-workflow-templates', id);
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getWorkflowById] Exception found: "' + e + '"');
			return e;
		}
    }
	async getProjectById(id) {
		try {
            const response = await this.strapiFindOneItems('projects', id);
            return response;
		}
		catch (e) {
			console.log('[PdmAPI:getProjectById] Exception found: "' + e + '"');
			return e;
		}
    }
    // =========================================================================
	// 			STRAPI GENERIC METHODS
	// =========================================================================
    async  getTokenFromLocalStorage() {
        try {
            const token = localStorage.getItem( "token" );
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
			return config;
		}
		catch (e) {
			console.log('[PdmAPI:strapiGetToken] Exception found: "' + e + '"');
			return e;
		}
    }
    //Devuelve todos los Items
    async  strapiFindItems(collectionNameUrl) {
		try {
            const config = await this.getTokenFromLocalStorage();
			const response = await this.pdmAxios.get("/" + collectionNameUrl, config);
			return response;
		}
		catch (e) {
			console.log('[PdmAPI:strapiFindItems] Exception found: "' + e + '"');
			return e;
		}
    }
    // Devuelve el Item con el id proporcionado.
	async strapiFindOneItems(collectionNameUrl, id) {
		try {
            const config = await this.getTokenFromLocalStorage();
			const response = await this.pdmAxios.get( "/" + collectionNameUrl + "/" + id, config);
			return response;
		}
		catch (e) {
			console.log('[PdmAPI:strapiFindOneItems] Exception found: "' + e + '"');
			return e;
		}
    }
    // Crea un Item
    async strapiCreateItem(collectionNameUrl, objectToCreate) {
		try {
            const config = await this.getTokenFromLocalStorage();
			const response = await this.pdmAxios.post("/" + collectionNameUrl, objectToCreate, config);
			return response;
		} catch (e) {
			console.log('[PdmAPI:strapiCreateItem] Exception found: "' + e + '"');
			return e;
		}
	}
    // Modifica un Item
    async strapiUpdateItem(collectionNameUrl, id, objectToUpdate ) {
		try {
            const config = await this.getTokenFromLocalStorage();
			const response = await this.pdmAxios.put("/" + collectionNameUrl + "/" + id, objectToUpdate, config);
			return response;
		} catch (e) {
			console.log('[PdmAPI:strapiUpdateItem] Exception found: "' + e + '"');
			return e;
		}
	}
    // Elimina un Item con el id proporcionado.
	async strapiDeleteItem(collectionNameUrl, id) {
		try {
            const config = await this.getTokenFromLocalStorage();
			const response = await this.pdmAxios.delete("/" + collectionNameUrl + "/" + id, config);
			return response;
		}
		catch (e) {
			console.log('[PdmAPI:strapiDeleteItem] Exception found: "' + e + '"');
			return e;
		}
    }
    // Only for testing purposes. Remove after Strapi development
    async testStrapiMethods() {
        try {
            // Run your query here!
			//const response = await this.strapiFindProjectStatuses();
            // const response = await this.getTaskTemplates();
            // const response2 = await this.getProjectWorkflowTemplates();
            // const response3 = await this.getUsers();
            // const response = await this.strapiDeleteProjectStatus(8);
            // const response2 = await this.strapiUpdateProjectStatus( 7, {name:"testStatusNewALP-Modified :)" }) ;
            // const response1 = await this.getWorkflowById(1);
            // const response2 = await this.getProjects();
            // const response3 = await this.getDocuments();
            // const oDocument01 = {
            //     name: "ALP-99",
            //     description: "modificado ahora mismo por test method"
            // }
            //devuelve OK pero no actualiza el documento con id 6 ??????????????????
            // const response1 = await this.updateDocument(6, document) 
            const response = {
                status: 200,
                data: [ ]
            };
			return response;
		}
		catch (e) {
			console.log('[PdmAPI:testStrapiMethods] Exception found: "' + e + '"');
			return e;
		}        
    }
}
export default PdmApi;