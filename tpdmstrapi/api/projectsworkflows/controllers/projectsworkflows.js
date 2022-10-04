'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	// ######################################################################
	// Crea un projectworkflow.
	// TaskNames y ProjectName no se puede repetir.
	// ######################################################################
	async createProjectWorkflow(ctx) {
		let res = {
			projectworkflow: null,
			errors: [],
		}

		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			console.log('No se acepta llamadas multipart.');
			res.errors.push('No se acepta llamadas multipart.');
			return res;
		}

		const datas = ctx.request.body;

		// Si el identificador WorkflowName y ProjectName ya existe no continua y sale con false.
		if (await strapi.services.projectsworkflows.findOne({ WorkflowName: datas.WorkflowName, ProjectName: datas.ProjectName}) !== null) {
			console.log('Ya existe un projectworkflow con WorkflowName = ' + datas.WorkflowName + ' y ProjectName =' + datas.ProjectName);
			res.errors.push('Ya existe un projectworkflow con WorkflowName = ' + datas.WorkflowName + ' y ProjectName =' + datas.ProjectName);
			return res;
		} 
		
		// Crear el nuevo projectworkflow.
		let projectworkflow = await strapi.services.projectsworkflows.create(datas);
		if (projectworkflow === null) {
			console.log('No se pudo crear el projectworkflow, error desconocido.');
			res.errors.push('No se pudo crear el projectworkflow, error desconocido.');
			return res;
        }
        
        if (projectworkflow !== null) {
            const usuario = await strapi.services.aplicationusers.findOne({ username: datas.TeamLeader});
            const workflowtask = await strapi.services.workflowtasks.findOne({ WorkflowName: datas.WorkflowTemplate});
            const listTasks = workflowtask.TasksNames.split(";");
            for (let t = 0; t < listTasks.length; t++) {
                let task = await strapi.services.tasks.findOne({ Name: listTasks[t]});
                if (await strapi.services.workspacetasks.findOne({TaskID: task.TaskID, UserName: datas.TeamLeader, Rol: usuario.Rol, ProjectName: datas.ProjectName}) === null) {
                    let workspacetask = await strapi.services.workspacetasks.create({TaskID: task.TaskID, UserName: datas.TeamLeader, Rol: usuario.Rol, ProjectName: datas.ProjectName});
                }
            }
            const teamFind = await strapi.services.teams.findOne({ ProjectName: datas.ProjectName})
            let team  = sanitizeEntity(teamFind, { model: strapi.models.teams });
            const validData = await strapi.entityValidator.validateEntityUpdate(
                strapi.models.teams,
                {Leader: datas.TeamLeader}
              );
            const teamLeader = await strapi.services.teams.update( { id: team.id } , {Leader: datas.TeamLeader});
        }
	
		console.log('WorkflowName', datas.WorkflowName);
		console.log('ProjectName', datas.ProjectName);

		// Cast al model.
        let ret = sanitizeEntity(projectworkflow, { model: strapi.models.projectsworkflows});

		return ret;		
	}
};
