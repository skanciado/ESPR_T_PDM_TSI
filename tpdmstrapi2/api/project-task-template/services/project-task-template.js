'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
*/

const aTaskTemplateData 	= [ "actions", 
								"completeConditions", 
								"roleAssigned",
								"roleAssigned.name"];

const aPopulate = [ ...aTaskTemplateData ];

module.exports = {
    find(params, populate) {
        console.log(params);
        return strapi.query('project-task-template').find(params, aPopulate);
    },

    findOne(params, populate) {
        return strapi.query('project-task-template').findOne(params, aPopulate);
    },   
};

