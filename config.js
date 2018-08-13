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
  	}
	
};

 // Production environment
environments.production = {
	'http_port': 5000,
	'https_port': 5001,
	'envName': 'production',
	}
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check that the current environment was one of the environments defines above, eles default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging

// Export the module
module.exports = environmentToExport
