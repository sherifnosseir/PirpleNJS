/* Primary File for the API */

// Dependencies
const http = require('http')
const https = require('https')
var url = require('url')
var StringDecoder = require('string_decoder').StringDecoder
var config = require('./config')
var fs = require('fs')
var handlers = require('./lib/handlers')
var helpers = require('./lib/helpers')

helpers.sendTwilioSms('6047896570', "hey hey hey", function(err) {
	console.log("error occurred: " + err)
})

// Instantiate HTTP Server
var servers = {}

servers.http = http.createServer(function(req, res) {
	unifiedServer(req, res)
})
servers.https = https.createServer(httpsServerOptions, function(req, res) {
	unifiedServer(req, res)
})

console.log("Using environment: " + config.envName)

// Start the server, and have it listen on port 3000
const httpPort = config.http_port
servers.http.listen(httpPort, function() {
	console.log("HTTP Server is listening on port: " + httpPort)
})

// servers.https 
const httpsDirectory = './https/'
var httpsServerOptions = {
	'key': fs.readFileSync(httpsDirectory + 'key.pem'),
	'cert': fs.readFileSync(httpsDirectory + 'cert.pem')
}

const httpsPort = config.https_port
servers.https.listen(httpsPort, function() {
	console.log("HTTPS Server is listening on port: " + httpsPort)
})

var unifiedServer = function(req, res) {

	// Get the url and parse it
	var parsedUrl = url.parse(req.url, true)

	// Get the path
	var path = parsedUrl.pathname
	var trimmedPath = path.replace(/^\/+|\/+$/g, '')

	// Get HTTP Method
	var httpMethod = req.method.toLowerCase()

	// Get query strings as an object
	var queryStringObject = parsedUrl.query

	// Parse the headers as an object
	var headersObject = req.headers

	// Parse the payload body, if any
	var decoder = new StringDecoder('utf-8')
	var buffer = ''
	req.on('data', function(data) {
		buffer += decoder.write(data)
	})

	req.on('end', function() {
		buffer += decoder.end()

		// Select handler, if not found use notFound Handler
		var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

		// Construct data object to send to handler
		var data = {
			'trimmedPath': trimmedPath,
			'params': queryStringObject,
			'method': httpMethod,
			'headers': headersObject,
			'payload': helpers.parseJsonToObject(buffer)
		}

		// Send a response
		chosenHandler(data, function(statusCode, payload) {
			statusCode = typeof(statusCode) == 'number' ? statusCode : 500

			payload = typeof(payload) == 'object' ? payload : {}

			var payloadString = JSON.stringify(payload)

			res.setHeader('Content-Type', 'application/json')
			res.writeHead(statusCode)
			res.end(payloadString)

			console.log("Returning: StatusCode: " + statusCode + ". Payload: " + payloadString)
		})
		

		// Log the request path
		console.log("Request Path: " + trimmedPath)
		console.log("Method: " + httpMethod)
		console.log("Query Params: ", queryStringObject)
		console.log("Headers: ", headersObject)
		console.log("Body: ", buffer)
		console.log("\n========\n")
	})
}

// Define request router
var router = {
	'hello': handlers.hello
}

