/*
 * Request Handlers
 */

// Dependencies
var _data = require('./data')
var helpers = require('./helpers')

// Define Router handlers
var handlers = {}
handlers.ping = function(data, callback) {
	callback(200)
}

handlers.hello = function(data, callback) {
	var acceptableMethods = ['get']
	if (acceptableMethods.indexOf(data.method) > -1) {
		handlers._hello[data.method](data, callback)
	} else {
		callback(405)
	}
}

handlers._hello = {};

handlers._hello.get = function(data, callback) {
	callback(200, { data: "Hello World" })
}

handlers.notFound = function(data, callback) {
	callback(404)
}

// Export handlers
module.exports = handlers