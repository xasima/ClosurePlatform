goog.provide('example.Settings');

goog.require('goog.ui.Component');
// Just for addressing div that captures logging
goog.require('example.debug');




/**
* @param {goog.dom.DomHelper} dom
* @constructor
* @extends {goog.ui.Component}
*/
example.Settings = function(dom) {	
	goog.base(this, dom);	
};
goog.inherits(example.Settings, goog.ui.Component);

/**
 * A logger.
 * @type {goog.debug.Logger}
 * @private
 */
example.Settings.prototype.logger_ = goog.debug.Logger.getLogger(
    'example.Settings');

/** @inheritDoc */
example.Settings.prototype.createDom = function() {
	goog.base(this, 'createDom');
	this.logger_.info('Create DOM');
	this.getElement().innerHTML = 'This is the settings component.';
};
