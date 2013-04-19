goog.provide('example.Settings_init');
goog.require('example.App');
goog.require('example.Settings');
goog.require('goog.module.ModuleManager');

// Just for addressing div that captures logging
goog.require('example.debug');

var moduleName = 'settings';
var logger = goog.debug.Logger.getLogger( moduleName + '_init'); 

var app = example.App.getInstance();
logger.info('Initialize ' + moduleName );
var settings = new example.Settings(app.getDomHelper());
logger.info('Attach' + moduleName + ' as a child to app');
app.addChild(settings, true /* opt_render */);

// This tells the module manager that the 'settings' module has been loaded;
// otherwise, the module manager will assume that loading has timed out and it
// will try again.
logger.info('Report to moduleManager on the loading of ' + moduleName);
goog.module.ModuleManager.getInstance().setLoaded(moduleName);
