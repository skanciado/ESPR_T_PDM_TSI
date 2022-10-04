'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async workspacesWithTasks( ctx ) {
        var aRet = [];

        const datas = ctx.request.body;
		if (!datas.UserName) {
			console.log('Usuario desconocido.');
			res.errors.push('Usuario desconocido.');
			return data;
		}

        const taskProjects = await strapi.services.Workspacetasks.find({ UserName: datas.UserName });
        if ( taskProjects !== null && taskProjects.length > 0 ) {
			for (let i = 0; i < taskProjects.length; i++) {
				// TODO falta crear endpoint que devuelva proyecto con sus carpetas.
				let pro = await strapi.services.projects.findOne({ ProjectID: taskProjects[i].ProjectName });
                if( pro !== null && pro !== undefined ) {
                    aRet.push( pro );
                }
            }
        }
        return aRet;
    },

	// ######################################################################
	// Crea un proyecto y cuatro carpetas relacionendolas con el proyecto.
	// ProyectId no se puede repetir.
	// Carpetas: 'Commercial', 'Management', 'Design' y 'Launch'.
	// ######################################################################
	async workspace(ctx) {
		let data = {
			projects: [],
			tasks: [],
            mapTaskProj:[],
			errors: [],
		}

		// ctx.params
		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			//Ejemplo => const { data, files } = parseMultipartData(ctx);
			console.log('No se acepta llamadas multipart.'); contr
			res.errors.push('No se acepta llamadas multipart.');
			return data;
		}

		const datas = ctx.request.body;
		if (!datas.UserName) {
			console.log('Usuario desconocido.');
			res.errors.push('Usuario desconocido.');
			return data;
		}

		// Obtener los proyectos.
		var workspaceproject = await strapi.services.workspaceprojects.find({ UserName: datas.UserName, Rol: datas.Rol });
        
        // Obtener los proyectos en los que el usuario tiene una tarea asignada
        var aProjectIDs = workspaceproject.map( proj => { return proj.ProjectID } );
        //data.mapTaskProj = new Map();

        const taskProjects = await strapi.services.workspacetasks.find({ UserName: datas.UserName, Rol: datas.Rol });
        if ( taskProjects !== null && taskProjects.length > 0 ) {
			for (let i = 0; i < taskProjects.length; i++) {
                let oCurrTask   = taskProjects[i];
				let oProject    = await strapi.services.projects.findOne({ Name: taskProjects[i].ProjectName });
                if( ( oProject !== null ) && ( oProject !== undefined ) ) {
                    // Guardamos la relación entre tarea y Projecto, para poder mostrar al usuario a que 
                    // proyecto pertenece cada tarea (en caso de tener 2 con el mismo nombre)
                    let oNewTuple = {};
                    oNewTuple['IdTask'] = oCurrTask.id;
                    oNewTuple['IdProj'] = oProject.ProjectID;

                    data.mapTaskProj.push( oNewTuple );
                    
                    if( !aProjectIDs.includes( oProject.ProjectID ) ) {                        
                        aProjectIDs.push( oProject.ProjectID );   
                    }               
                }
            }
        }


		if (aProjectIDs !== null && aProjectIDs.length > 0) {
			for (let i = 0; i < aProjectIDs.length; i++) {
				// TODO falta crear endpoint que devuelva proyecto con sus carpetas.
				let pro = await strapi.services.projects.findOne({ ProjectID: aProjectIDs[i] });
				if (pro !== null) {
                    let aux = sanitizeEntity(pro, { model: strapi.models.projects });
                    //Obtener los Teams
                    const team = await strapi.services.teams.findOne({ ProjectName: aux.Name });
                    aux.team = (team !== null) ? sanitizeEntity(team, { model: strapi.models.teams }) : null;
					aux.folders = [];
					// Obtener las carpetas.
					const folders = await strapi.services.folders.find({ ProjectID: aux.ProjectID });
					if (folders !== null && folders.length > 0) {
						for (let f = 0; f < folders.length; f++) {
							if (folders[f] !== null) {
								// Documentos
								let folder = sanitizeEntity(folders[f], { model: strapi.models.folders });
								folder.documents = await strapi.services.documents.find({ FolderID: folder.id });
								folder.open = false;
                                aux.folders.push(folder);
                                //aux.folders[f].documentsworkflows = [];
                                if (folder.documents !== null && folder.documents.length > 0) {
                                    for (let d = 0; d < folder.documents.length; d++) {
                                        if (folder.documents[d] !== null) {
                                            // Obtener documentworkflow del documento.
                                            let document = sanitizeEntity(folder.documents[d], { model: strapi.models.documents });
                                            const documentworkflow = await strapi.services.documentsworkflows.findOne({ DocumentName: document.Name });
                                            let docworkflow = (documentworkflow !== null) ? sanitizeEntity(documentworkflow, { model: strapi.models.documentsworkflows }) : null;
                                            aux.folders[f].documents[d].documentworkflow = null;
                                            if (docworkflow !== null)
                                            {
                                                aux.folders[f].documents[d].documentworkflow = docworkflow;
                                                //aux.folders[f].documentsworkflows.push(docworkflow);  
                                            }
                                        }
                                    }
                                }
							}
						}
					}
					// Obtener projectworkflow del proyecto.
					const projectworkflow = await strapi.services.projectsworkflows.findOne({ ProjectName: aux.Name });
					aux.projectworkflow = (projectworkflow !== null) ? sanitizeEntity(projectworkflow, { model: strapi.models.projectsworkflows }) : null;
                    data.projects.push(aux);
				}
			}
		}

		// Obtener las tasks.
		const workspacetask = await strapi.services.workspacetasks.find({ UserName: datas.UserName, Rol: datas.Rol });
		if (workspacetask !== null && workspacetask.length > 0) {
			for (let i = 0; i < workspacetask.length; i++) {
				let task = await strapi.services.tasks.findOne({ TaskID: workspacetask[i].TaskID });
				if (task !== null) {
					data.tasks.push(sanitizeEntity(task, { model: strapi.models.tasks }));
				}
			}
		}

		return data;
	},

    
};

