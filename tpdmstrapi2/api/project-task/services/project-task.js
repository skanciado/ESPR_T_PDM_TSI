'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

const aTaskData 	 = ["template", 
						"completedInfo", 
						"actions"];

const aPopulate = [ ...aTaskData ];

module.exports = {
    find(params, populate) {
        console.log(params);
        return strapi.query('project-task').find(params, aPopulate);
    },

    findOne(params, populate) {
        return strapi.query('project-task').findOne(params, aPopulate);
    },   
};
