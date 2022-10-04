'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	// ######################################################################
	// Crea un equipo.
	// ProjectName no se puede repetir.
	// ######################################################################
	async createTeam(ctx) {
		let res = {
			team: null,
			errors: [],
		}

		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			console.log('No se acepta llamadas multipart.');
			res.errors.push('No se acepta llamadas multipart.');
			return res;
		}

		const datas = ctx.request.body;

		// Si el identificador ProjectName ya existe no continua y sale con false.
		if (await strapi.services.teams.findOne({ ProjectName: datas.ProjectName }) !== null) {
			console.log('Ya existe un equipo con ProjectName = ' + datas.ProjectName);
			res.errors.push('Ya existe un equipo con ProjectName = ' + datas.ProjectName);
			return res;
		} 
		
		// Crear el nuevo team.
		let team;
		team = await strapi.services.teams.create(datas);
		if (team === null) {
			console.log('No se pudo crear el team, error desconocido.');
			res.errors.push('No se pudo crear el team, error desconocido.');
			return res;
		}
			
		console.log('ProjectName', datas.ProjectName);
		console.log('Leader', datas.Leader);

		// Cast al model.
		let ret = sanitizeEntity(team, { model: strapi.models.teams}); 

		return ret;		
	}

};