/*
 * Create and export configuration variables.
 *
 */

 // Container for all the environments
 var environments = {};

// Staging (default) environment
environments.staging = {
	'http_port': 3000,
	'https_port': 3001,
	'envName': 'staging',
	'hashingSecret': 'stagingSecret',

	'twilio' : {
    	'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    	'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    	'fromPhone' : '+15005550006'
  	}
	
};

 // Production environment
environments.production = {
	'http_port': 5000,
	'https_port': 5001,
	'envName': 'production',
	'hashingSecret': 'productionSecret',

	'twilio': {
		'accountSid': '',
		'authToken': '',
		'fromPhone': ''
	}
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check that the current environment was one of the environments defines above, eles default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging

// Export the module
module.exports = environmentToExport