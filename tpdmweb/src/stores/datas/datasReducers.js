
import { FormatListBulletedTwoTone, RestaurantRounded } from "@material-ui/icons";
import { typeActionDatas } from "../../components/types/typeActionDatas";
import { initialState } from './datasInitalState'

/*const initialState = {
	workSpace: {},
    projects: [],
    projectsworkflows: [],
    folders: [],
    documents: [],
    documentsworkflows: [],
    tasks: [],
	errors: [],

}*/

const datasReducer = (state = initialState, action) => {
	switch (action.type) {
		case typeActionDatas.createProject:
            console.log(action.payload.project);
            return {
                ...state,
                projects: state.projects.concat( action.payload.project )
            }
			/*const dtsProjects = { ...state };
			dtsProjects.projects.push(action.payload.project);
			return {
				...state,
				projects: dtsProjects.projects
            }*/
        case typeActionDatas.createProjectWorkflow:
            console.log(action.payload.projectworkflow);
            return {
                ...state,
                projectsworkflows: state.projectsworkflows.concat( action.payload.projectworkflow )
            }
        case typeActionDatas.createDocumentWorkflow:
            console.log(action.payload.documentworkflow);
            {
                //let oProject = state.projects.find( (p) => p.id === action.payload.project.id);
                let oNewProject = Object.assign({}, action.payload.project);
                oNewProject.folders.forEach( oFolder => {
                    if(action.payload.document.application?.name){
                        const idw = oFolder.cadDocuments.findIndex((d) => d.id === action.payload.document.id);
                        if( idw >= 0){
                            oFolder.cadDocuments[idw].workflow = action.payload.documentworkflow;
                            return;
                        }
                    }else{
                        const idw = oFolder.documents.findIndex((d) => d.id === action.payload.document.id);
                        if( idw >= 0){
                            oFolder.documents[idw].workflow = action.payload.documentworkflow;
                            return;
                        }
                    }    
                });
                return {
                    ...state,
                    projects: state.projects.map( item => {
                        if( item?.id === oNewProject.id){
                            return oNewProject;
                        }
                        return item;
                    })
                }           
            }
        case typeActionDatas.createDocument:
            //console.log(action.payload.document);
            //console.log(action.payload.project);
            //console.log(action.payload.folder);
            //const dtsDocument = { ...state };
            let projects = null;
            if (action.payload.folder != null)
            {
                let oProjectUpdated = action.payload.project;
                let iFolderObject = oProjectUpdated.folders.find( oCurrFolder => oCurrFolder.id === action.payload.folder.id );
                let iFolderIndex  = oProjectUpdated.folders.indexOf( iFolderObject );
                iFolderObject.documents.push( action.payload.document );
                oProjectUpdated.folders[iFolderIndex] = iFolderObject;
                projects = state.projects.map( oCurrProj => {
                    if( oCurrProj.id === oProjectUpdated.id ) {
                        return oProjectUpdated;
                    } else {
                        return oCurrProj;
                    }
                } )
            }
            else
            {
                projects = state.projects;
            }
            //if (action.payload.document.ProjectsNames !== null){
                //const iddp = 0;//dtsDocument.projects.findIndex((p) => p.name === action.payload.document.ProjectsNames);
                //const ddf = Number(action.payload.document.FolderID);
                //const iddf = 0;//dtsDocument.projects[iddp].folders.findIndex((f) => f.id === ddf);
                /*if (action.payload.document.hasOwnProperty('documentworkflow') === false){
                    action.payload.document.documentworkflow = null;
                }*/
                //dtsDocument.projects[iddp].folders[iddf].documents.push(action.payload.document);
            //}    
            return {
                ...state,
                projects: projects
            }
            case typeActionDatas.createCADDocument:
                //console.log(action.payload.document);
                //console.log(action.payload.project);
                //console.log(action.payload.folder);
                //const dtsDocument = { ...state };
                let cadProjects = null;
                if (action.payload.folder != null)
                {
                    let oProjectUpdated = action.payload.project;
                    let iFolderObject = oProjectUpdated.folders.find( oCurrFolder => oCurrFolder.id === action.payload.folder.id );
                    let iFolderIndex  = oProjectUpdated.folders.indexOf( iFolderObject );
                    iFolderObject.cadDocuments.push( action.payload.document );
                    oProjectUpdated.folders[iFolderIndex] = iFolderObject;
                    cadProjects = state.projects.map( oCurrProj => {
                        if( oCurrProj.id === oProjectUpdated.id ) {
                            return oProjectUpdated;
                        } else {
                            return oCurrProj;
                        }
                    } )
                }
                else
                {
                    cadProjects = state.projects;
                }
                //if (action.payload.document.ProjectsNames !== null){
                    //const iddp = 0;//dtsDocument.projects.findIndex((p) => p.name === action.payload.document.ProjectsNames);
                    //const ddf = Number(action.payload.document.FolderID);
                    //const iddf = 0;//dtsDocument.projects[iddp].folders.findIndex((f) => f.id === ddf);
                    /*if (action.payload.document.hasOwnProperty('documentworkflow') === false){
                        action.payload.document.documentworkflow = null;
                    }*/
                    //dtsDocument.projects[iddp].folders[iddf].documents.push(action.payload.document);
                //}    
                return {
                    ...state,
                    projects: cadProjects
                }
                case typeActionDatas.createDocumentRevision:
                   let  projectsRev = null;
                    if (action.payload.folder != null)
                    {
                        let oProjectUpdated = action.payload.project;
                        let iFolderObject = oProjectUpdated.folders.find( oCurrFolder => oCurrFolder.id === action.payload.folder.id );
                        let iFolderIndex  = oProjectUpdated.folders.indexOf( iFolderObject );
                        let oDocObject = iFolderObject.documents.find( oDocFold => oDocFold.id === action.payload.document.id );
                        let iDocIndex = iFolderObject.documents.indexOf( oDocObject );
                        let oNewFolder = Object.assign({}, iFolderObject);
                        oNewFolder.documents[iDocIndex] = action.payload.documentRev;
                        let oNewProj = Object.assign({},oProjectUpdated);
                        oNewProj.folders[iFolderIndex] = oNewFolder;
                        projectsRev = state.projects.map( oCurrProj => {
                            if( oCurrProj.id === oProjectUpdated.id ) {
                                return oNewProj;
                            } else {
                                return oCurrProj;
                            }
                        } )
                    }
                    else
                    {
                        projectsRev = state.projects;
                    }
                    return {
                        ...state,
                        projects: projectsRev
                    }
                case typeActionDatas.createCADDocumentRevision:
                    let cadProjectsRev = null;
                    if (action.payload.folder != null)
                    {
                        let oProjectUpdated = action.payload.project;
                        let iFolderObject = oProjectUpdated.folders.find( oCurrFolder => oCurrFolder.id === action.payload.folder.id );
                        let iFolderIndex  = oProjectUpdated.folders.indexOf( iFolderObject );
                        let oDocObject = iFolderObject.cadDocuments.find( oDoc => oDoc.id === action.payload.document.id );
                        let iDocIndex = iFolderObject.cadDocuments.indexOf( oDocObject );
                        let oNewFolder = Object.assign({}, iFolderObject);
                        oNewFolder.cadDocuments[iDocIndex] = action.payload.documentRev;
                        let oNewProj = Object.assign({},oProjectUpdated);
                        oNewProj.folders[iFolderIndex] = oNewFolder;
                        cadProjectsRev = state.projects.map( oCurrProj => {
                            if( oCurrProj.id === oProjectUpdated.id ) {
                                return oNewProj;
                            } else {
                                return oCurrProj;
                            }
                        } )
                    }
                    else
                    {
                        cadProjectsRev = state.projects;
                    }
                    return {
                        ...state,
                        projects: cadProjectsRev
                    }
        case typeActionDatas.updateProject:
            return {
                ...state,
                //projects: [action.payload.project]
                projects: state.projects.map( item => {
                    if ( item?.id === action.payload.project?.id ) {
                        return Object.assign({}, item, action.payload.project);
                    }
                    return item;
                })
            }
        case typeActionDatas.updateDocument:
                let oProject = state.projects.find( (p) => p.id === action.payload.project.id);
                let oNewProject = Object.assign({}, oProject);
                let oNewFolder = oNewProject.folders.find( (f) => f.id === action.payload.folder.id);
                if( action.payload.document.application?.name ){
                    const iud = oNewFolder.cadDocuments.findIndex( (d) => d.id === action.payload.document.id);
                    oNewFolder.cadDocuments[ iud ] = action.payload.document;
                }else{
                    const iud = oNewFolder.documents.findIndex( (d) => d.id === action.payload.document.id);
                    oNewFolder.documents[ iud ] = action.payload.document; 
                }
                return {
                    ...state,
                    projects: state.projects.map( item => {
                        if( item?.id === oNewProject.id){
                            return oNewProject;
                        }
                        return item;
                    })
            }
        /*case typeActionDatas.updateDocumentDescription:
                //const dtsUpdateDocuments2 = { ...state };
                //const iudp2 = dtsUpdateDocuments2.projects.findIndex((p) => p.name === action.payload.project.name);
                //const udf2 = 0;//Number(action.payload.document.FolderID);
                //const iudf2 = 0;//dtsUpdateDocuments2.projects[iudp2].folders.findIndex((f) => f.id === udf2);
                //const iud2 = dtsUpdateDocuments2.projects[iudp2].folders[iudf2].documents.findIndex((d) => d.id === action.payload.document.id);
     

                dtsUpdateDocuments2.projects[iudp2].folders[iudf2].documents[iud2].Description = action.payload.description;

                let oNewDocument = action.payload.document;
                oNewDocument.description = action.payload.description;
                return {
                    ...state,
                    documents: dtsUpdateDocuments2.documents,
                    projects: dtsUpdateDocuments2.projects
            }*/
        //al abrir una carpeta en workspace se guarda en datas.selectedFoldersIsOpen las carpetas del proyecto seleccionado
		case typeActionDatas.setOpenFolder:	
			const dtsOpenFolder = { ...state };
			const iofp = dtsOpenFolder.projects.findIndex((p) => p.ProjectID === action.payload.project.ProjectID);
			const ioff = dtsOpenFolder.projects[iofp].folders.findIndex((f) => f.id === action.payload.folder.id);
			dtsOpenFolder.projects[iofp].folders[ioff].open = action.payload.open;
			return {
                ...state,
                selectedFoldersIsOpen: dtsOpenFolder.projects[iofp].folders
			}
		case typeActionDatas.updateWorkSpace:
			return {
				...state,
                projects: action.payload.projects,
                //projectsworkflows: action.payload.projectsworkflows,
                //folders: action.payload.folders,
                //documents: action.payload.documents,
                //documentsworkflows: action.payload.documentsworkflows,
				//tasks: action.payload.tasks,
				//errors: action.payload.errors
            }
            case typeActionDatas.updateWorkSpaceTasks:
                return {
                    ...state,
                    tasks: action.payload.tasks
                }	
		case typeActionDatas.setErrors:
			return {
				...state,
				errors: action.payload.errors
			}   
        case typeActionDatas.resetData:
            return initialState;
        case typeActionDatas.saveShowDescription:
            return {
                ...state,
                showDescription: action.payload.showDescription
            }
        case typeActionDatas.saveOriginalDocumentDescription:
                return {
                    ...state,
                    //projects: [action.payload.project]
                    originalDocumentDescription: action.payload.origDescription
                    
                }
		default:
			return state;
	}
}

export default datasReducer;