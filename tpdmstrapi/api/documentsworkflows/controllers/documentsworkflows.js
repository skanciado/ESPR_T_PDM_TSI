'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	// ######################################################################
	// Crea un documentworkflow.
	// TaskNames y DocumentName no se puede repetir.
	// ######################################################################
	async createDocumentWorkflow(ctx) {
		let res = {
			documentworkflow: null,
			errors: [],
		}

		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			console.log('No se acepta llamadas multipart.');
			res.errors.push('No se acepta llamadas multipart.');
			return res;
		}

		const datas = ctx.request.body;

		// Si el identificador TasksNames y DocumentName ya existe no continua y sale con false.
		if (await strapi.services.documentsworkflows.findOne({TasksNames: datas.TasksNames, DocumentName: datas.DocumentName}) !== null) {
			console.log('Ya existe un documentworkflow con TasksNames = ' + datas.TasksNames + ' y DocumentName =' + datas.DocumentName);
			res.errors.push('Ya existe un documentworkflow con TasksNames = ' + datas.TasksNames + ' y DocumentName =' + datas.DocumentName);
			return res;
		} 
		
		// Crear el nuevo documentworkflow.
		let documentworkflow;
		documentworkflow = await strapi.services.documentsworkflows.create(datas);
		if (documentworkflow === null) {
			console.log('No se pudo crear el documentworkflow, error desconocido.');
			res.errors.push('No se pudo crear el documentworkflow, error desconocido.');
			return res;
        }

        if (documentworkflow !== null) {
            const usuario = await strapi.services.aplicationusers.findOne({ username: datas.UserName});
            //const workflowtask = await strapi.services.workflowtasks.findOne({ WorkflowName: datas.WorkflowTemplate});
            //const listTasks = workflowtask.TasksNames.split(";");
            const listTasks = datas.TasksNames.split(";");
            for (let t = 0; t < listTasks.length; t++) {
                let task = await strapi.services.tasks.findOne({ Name: listTasks[t]});
                if (await strapi.services.workspacetasks.findOne({TaskID: task.TaskID, UserName: datas.UserName, Rol: usuario.Rol, ProjectName: datas.ProjectName}) === null) {
                    let workspacetask = await strapi.services.workspacetasks.create({TaskID: task.TaskID, UserName: datas.UserName, Rol: usuario.Rol, ProjectName: datas.ProjectName});
                }
            }
        }

		console.log('DocumentName', datas.DocumentName);

		// Cast al model.
		let ret = sanitizeEntity(documentworkflow, { model: strapi.models.documentsworkflows}); 

		return ret;		
	}
};
