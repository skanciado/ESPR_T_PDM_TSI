'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	// ######################################################################
	// Crea un document.
	// DocumentID no se puede repetir.
	// ######################################################################
	async createDocument(ctx) {
		let res = {
			document: null,
			errors: [],
		}

		// No se acepta este modo de llamada.
		if (ctx.is('multipart')) {
			console.log('No se acepta llamadas multipart.');
			res.errors.push('No se acepta llamadas multipart.');
			return res;
		}

		const datas = ctx.request.body;

		// Si el identificador DocumentID ya existe no continua y sale con false.
		if (await strapi.services.documents.findOne({ DocumentID: datas.DocumentID }) !== null) {
			console.log('Ya existe un document con DocumentID = ' + datas.DocumentID);
			res.errors.push('Ya existe un document con DocumentID = ' + datas.DocumentID);
			return res;
		} 
		
		// Crear el nuevo document.
		let document;
		document = await strapi.services.documents.create(datas);
		if (document === null) {
			console.log('No se pudo crear el document, error desconocido.');
			res.errors.push('No se pudo crear el document, error desconocido.');
			return res;
		}
			
		console.log('DocumentID', datas.DocumentID);
		console.log('DocumentName', datas.Name);

		// Cast al model.
		let ret = sanitizeEntity(document, { model: strapi.models.documents}); 

		return ret;		
	}

};
