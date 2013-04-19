// Nothing is goog.provided here
goog.provide('example.App_init');
goog.require('goog.module.ModuleLoader');
goog.require('goog.module.ModuleManager');

// Ensures app.js is transitively included by this file.
//goog.require('example.Moduleinfo');
goog.require('example.App');
// Just for addressing div that captures logging
goog.require('example.debug');


var moduleName = 'app';
var logger = goog.debug.Logger.getLogger( moduleName + '_init'); 

logger.info('Start module registration logic in app_init');

logger.info('Perform setButtonClickHandler registration logic');
example.App.setButtonClickHandler(function(e) {
	var moduleManager = goog.module.ModuleManager.getInstance();
	moduleManager.execOnLoad('settings', this.onSettingsLoaded, this);
});

// Don't move this line bottom
// Initialization of App is done before
// the subsequent configuration (of module loading) to let user sees the UI
// for the main application as soon as possible.
logger.info('Installing the original app.js into content div');
example.App.install('content');

logger.info('Start working with module manager');
var moduleManager = goog.module.ModuleManager.getInstance();
var moduleLoader = new goog.module.ModuleLoader();
var moduleName = 'app';
var moduleBaseNamespace = 'example.App';
moduleLoader.setDebugMode(true);
moduleManager.setLoader(moduleLoader);
moduleManager.setAllModuleInfo(goog.global['MODULE_INFO']);
moduleManager.setModuleUris(goog.global['MODULE_URIS']);

// This tells the module manager that the  module named moduleName has been loaded.
// The module manager will not evaluate the code for any of app's
// dependencies until it knows it has been loaded.
logger.info('Report to moduleManager on the loading of ' + moduleName);
moduleManager.setLoaded(moduleName);

//logger.info('Exporting global functions (load, isLoaded)' );
goog.exportSymbol(moduleBaseNamespace + '.load', function(callback) {
	moduleManager.execOnLoad(moduleName, callback);
});
goog.exportSymbol(moduleBaseNamespace + '.isLoaded', function() {
	var moduleInfo = moduleManager.getModuleInfo(moduleName);
	return moduleInfo ? moduleInfo.isLoaded() : false;
});


