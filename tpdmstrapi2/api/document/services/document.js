'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */
 
const aTypeData 	     = ["type",
							"userLock"];

const aStatusData 	     = ["status"];
 
const aLifecycleData 	 = ["lifecycle", 
							"lifecycle.lifecycle", 
							"lifecycle.lifecycle.state", 
							"lifecycle.lifecycle.parents", 
							"lifecycle.lifecycle.children"];
						
const aFilesData 	     = ["files",
							"files.content"];

const aRightsData 	     = ["rights",
							"rights.modify", 
							"rights.view" ];

const aWorkflowData 	 = ["workflow",
							"workflow.tasks",
							"workflow.tasks.actions",
							"workflow.tasks.template.actions",
							"workflow.tasks.template.completeConditions", 
							"workflow.tasks.template.completeConditions", 
							"workflow.tasks.template.completeConditions.input",
							"workflow.tasks.template.completeConditions.status",
							"workflow.tasks.template.roleAssigned",
							"workflow.task", 
							"workflow.task.template",
							"workflow.task.template.actions",
							"workflow.task.template.completeConditions",
							"workflow.task.template.completeConditions.input",
							"workflow.task.template.completeConditions.status",
							"workflow.task.template.roleAssigned",
							"workflow.task.actions", 
							"workflow.task.actions.actionTemplate",
							"workflow.template", 
							"workflow.template.tasks", 
							"workflow.template.tasks.actions",
							"workflow.template.tasks.actions.actionTemplate",
							"workflow.template.tasks.template",
							"workflow.template.tasks.template.actions",
							"workflow.template.tasks.template.completeConditions", 
							"workflow.template.tasks.template.completeConditions", 
							"workflow.template.tasks.template.completeConditions.input",
							"workflow.template.tasks.template.completeConditions.status",
							"workflow.template.tasks.template.roleAssigned" ];

const aPopulate = [ ...aTypeData, ...aStatusData, ...aLifecycleData, ...aFilesData, ...aRightsData, ...aWorkflowData ];

module.exports = {
    find(params, populate) {
        console.log(params);
        return strapi.query('document').find(params, aPopulate);
    },

    findOne(params, populate) {
        return strapi.query('document').findOne(params, aPopulate);
    },   
};
