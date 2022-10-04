'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */
const aStatus 			 = ["status",  "name.project_statuses"];
const aLifecycleData 	 = ["lifecycle", 
							"lifecycle.lifecycle", 
							"lifecycle.lifecycle.state", 
							"lifecycle.lifecycle.parents", 
							"lifecycle.lifecycle.children"];
const aTeamData 		 = ["team", 
							"team.application_roles"];
const aProjectLeaderData = ["projectLeader", 
							"projectLeader.application_roles"];
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
							
const aFolderData	 	 = ["folders",  
							"folders.documents", 
							"folders.documents.status",
							"folders.documents.type", 
							"folders.documents.userLock", 
							"folders.documents.files", 
							"folders.documents.files.content", 
							"folders.documents.rights",
							"folders.documents.rights.modify", 
							"folders.documents.rights.view", 
							"folders.documents.userLock", 
							"folders.documents.userLock.application_roles", 
							"folders.documents.lifecycle", 
							"folders.documents.lifecycle.lifecycle", 
							"folders.documents.lifecycle.lifecycle.state", 
							"folders.documents.lifecycle.lifecycle.parents", 
							"folders.documents.lifecycle.lifecycle.children",
							"folders.documents.status",
							"folders.documents.workflow", 
							"folders.documents.workflow.task",
							"folders.documents.workflow.task.template",
							"folders.documents.workflow.task.actions",
							"folders.documents.workflow.task.actions.actionTemplate",
							"folders.documents.workflow.assignedUser",
							"folders.documents.workflow.tasks",
							"folders.documents.workflow.template", 
							"folders.documents.workflow.template.tasks", 
							"folders.documents.workflow.template.tasks.actions", 
							"folders.documents.workflow.template.tasks.actions.actionTemplate"];
							
const aFolderCADData	 = ["folders.cadDocuments", 
							"folders.cadDocuments.application",
							"folders.cadDocuments.status",
							"folders.cadDocuments.type", 
							"folders.cadDocuments.userLock", 
							"folders.cadDocuments.files", 
							"folders.cadDocuments.files.content", 
							"folders.cadDocuments.rights",
							"folders.cadDocuments.rights.modify", 
							"folders.cadDocuments.rights.view", 
							"folders.cadDocuments.userLock", 
							"folders.cadDocuments.userLock.application_roles", 
							"folders.cadDocuments.lifecycle", 
							"folders.cadDocuments.lifecycle.lifecycle", 
							"folders.cadDocuments.lifecycle.lifecycle.state", 
							"folders.cadDocuments.lifecycle.lifecycle.parents", 
							"folders.cadDocuments.lifecycle.lifecycle.children",
							"folders.cadDocuments.workflow", 
							"folders.cadDocuments.workflow.task",
							"folders.cadDocuments.workflow.task.template",
							"folders.cadDocuments.workflow.task.actions",
							"folders.cadDocuments.workflow.task.actions.actionTemplate",
							"folders.cadDocuments.workflow.assignedUser",
							"folders.cadDocuments.workflow.tasks",
							"folders.cadDocuments.workflow.template", 
							"folders.cadDocuments.workflow.template.tasks", 
							"folders.cadDocuments.workflow.template.tasks.actions", 
							"folders.cadDocuments.workflow.template.tasks.actions.actionTemplate"];

const aPopulate = [ ...aLifecycleData, ...aTeamData, ...aProjectLeaderData, ...aWorkflowData, ...aFolderData, ...aFolderCADData, ...aStatus ];

module.exports = {	   
	find(params, populate) {
		console.log(params);
		return strapi.query('project').find(params, aPopulate);
	},

	findOne(params, populate) {
		return strapi.query('project').findOne(params, aPopulate);
	},   
};
