goog.provide('example.debug');

goog.require('goog.dom');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.FINER);
var logconsole = new goog.debug.DivConsole(goog.dom.getElement('debug'));
logconsole.setCapturing(true);

var logger = goog.debug.Logger.getLogger('main');
logger.info('Initialized logging');

// Treat this as log4j.properties file where different logging levels can be set up
//goog.debug.LogManager.getLogger('app').setLevel(goog.debug.Logger.Level.INFO);
//goog.debug.LogManager.getLogger('settings').setLevel(goog.debug.Logger.Level.FINER);


