'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */


const aContent 	 = ["content"];

const aPopulate = [ ...aContent];

module.exports = {	   
	find(params, populate) {
		console.log(params);
		return strapi.query('file1').find(params, aPopulate);
	},

	findOne(params, populate) {
		return strapi.query('file1').findOne(params, aPopulate);
	},   
};