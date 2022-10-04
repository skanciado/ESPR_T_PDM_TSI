'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	// ######################################################################
	// Crea un proyecto y cuatro carpetas relacionendolas con el proyecto.
	// ProyectId no se puede repetir.
	// Carpetas: 'Commercial', 'Management', 'Design' y 'Launch'.
	// ######################################################################
	async createProject(ctx) {
		let res = {
			project: null,
			errors: [],
		}

		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			console.log('No se acepta llamadas multipart.');
			res.errors.push('No se acepta llamadas multipart.');
			return res;
		}

		const datas = ctx.request.body;

		// Si el identificador ProjectId ya existe no continua y sale con false.
		if (await strapi.services.projects.findOne({ ProjectID: datas.ProjectID }) !== null) {
			console.log('Ya existe un proyecto con ProjectID = ' + datas.ProjectID);
			res.errors.push('Ya existe un proyecto con ProjectID = ' + datas.ProjectID);
			return res;
		} 
		
		// Crear el nuevo proyecto.
		let project;
		project = await strapi.services.projects.create(datas);
		if (project === null) {
			console.log('No se pudo crear el proyecto, error desconocido.');
			res.errors.push('No se pudo crear el proyecto, error desconocido.');
			return res;
		}
			
		// Crear relación con el WorkSpaceProjects.
		let WorkSpaceProject = await strapi.services.workspaceprojects.create({
			UserName: datas.UserName,
			ProjectID:  datas.ProjectID,
			Rol: datas.Rol,
		});
		if (WorkSpaceProject === null) {
			await strapi.services.projects.delete({id: projects.id});
			console.log('No se pudo crear el Workspace, error desconocido.');
			res.errors.push('No se pudo crear el WorkSpace, error desconocido.');
			return res;
		}

		// Cast al model.
		let ret = sanitizeEntity(project, { model: strapi.models.projects}); 
		ret.folders = [];

		// Definir projectworkflow a null en su creación.
		ret.projectworkflow = null;
		
		// Crear las carpetas, Folders
		if (ret.ProjectID) {
			const foldersName = ['Commercial', 'Management', 'Design', 'Launch'];
			let folder;
			for(folder in foldersName) {
				folder = await strapi.services.folders.create({
					PhaseID: '1',
					PhaseName: foldersName[folder],
					ProjectID: datas.ProjectID
				});

				if (folder === null) {
					ret.errors.push('No se creo la carpeta ' + foldersName[folder]);
				}
				else {
					ret.folders.push(sanitizeEntity(folder, { model: strapi.models.folders}));
					folder.open = false;
					console.log('folder', folder);
				}				
			}
        }
        
        // Crear relación con el team.
		let teamProject = await strapi.services.teams.create({
			ProjectName: datas.Name
		});

		return ret;		
	}

};
