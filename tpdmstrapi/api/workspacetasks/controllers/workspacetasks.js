'use strict';
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findworkspacetasks(ctx) {
        let data = {
            tasks: null,
			errors: [],
        }

        // ctx.params
        // No se acepta este modo de llamada.
        if (ctx.is('multipart')) {
            //Ejemplo => const { data, files } = parseMultipartData(ctx);
            console.log('No se acepta llamadas multipart.');
            res.errors.push('No se acepta llamadas multipart.');
            return data;
        }

        const datas = ctx.request.body;

         const usuario = await strapi.services.aplicationusers.findOne({ username: datas.UserName});
        // Obtener las tareas.
        const workspacetask = await strapi.services.workspacetasks.find({ UserName: datas.UserName, Rol: usuario.Rol });
        if (workspacetask !== null && workspacetask.length > 0) {
            for (let i = 0; i < workspacetask.length; i++) {
                // TODO falta crear endpoint que devuelva proyecto con sus carpetas.
                let ta = await strapi.services.tasks.findOne({ TaskID: workspacetask[i].TaskID });
                if (ta !== null) {
                    let aux = sanitizeEntity(ta, { model: strapi.models.tasks });
                    data.tasks.push(aux);
                }
            }
            return data;
        }
    },
};