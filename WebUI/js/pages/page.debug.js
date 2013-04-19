goog.require('goog.dom');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');

goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.FINER);
var logconsole = new goog.debug.DivConsole(goog.dom.getElement('log'));
logconsole.setCapturing(true);

var logger = goog.debug.Logger.getLogger('main');
logger.info('Initialized logging');


