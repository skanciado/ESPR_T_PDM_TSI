'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
*/
 const aActionData 	 = ["tasks", 
                        "tasks.actions"];
 const aPopulate = [ ...aActionData ];

 module.exports = {
     find(params, populate) {
         console.log(params);
         return strapi.query('project-workflow-template').find(params, aPopulate);
     },
 
     findOne(params, populate) {
         return strapi.query('project-workflow-template').findOne(params, aPopulate);
     },   
 };
