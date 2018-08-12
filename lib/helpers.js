/*
 * Helpers for various tasks
 */

// Dependencies
var config = require('../config')
var https = require('https')

// Container for all the helpers
var helpers = {}

// Parse a JSON String to an object in all cases without throwing
helpers.parseJsonToObject = function(buffer) {
	try {
		var obj = JSON.parse(buffer)
		return obj
	} catch(e) {
		return {}
	}
}

// Export Helpers
module.exports = helpers