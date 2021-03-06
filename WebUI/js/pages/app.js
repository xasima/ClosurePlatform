goog.provide('example.App');

goog.require('goog.dom');
goog.require('goog.string');
goog.require('goog.ui.Component');
goog.require('goog.debug.Logger');	
goog.require('example.debug');	
 
/**
* @param {!goog.dom.DomHelper} dom
* @constructor
* @extends {goog.ui.Component}
*/
example.App = function(dom) {
	goog.base(this, dom);	
};
goog.inherits(example.App, goog.ui.Component);

/**
 * A logger.
 * @type {goog.debug.Logger}
 * @private
 */
example.App.prototype.logger_ = goog.debug.Logger.getLogger(
    'example.App');

/**
* @type {example.Settings}
* @private
*/
example.App.prototype.settings_;

/**
* @type {function(goog.events.Event)}
* @private
*/
example.App.buttonClickHandler_ = goog.nullFunction;

/** @inheritDoc */
example.App.prototype.createDom = function() {
	var dom = this.dom_;
	this.logger_.info('Create DOM');
	var el = dom.createDom('div', undefined /* opt_attributes */,
		dom.createDom('span', undefined /* opt_attributes */, 'Messages appear here'),
		dom.createDom('button', undefined /* opt_attributes */, 'Load Settings'));
	this.setElementInternal(el);
};

/** @inheritDoc */
example.App.prototype.enterDocument = function() {
	goog.base(this, 'enterDocument');

	var button = this.dom_.getElementsByTagNameAndClass(
		'button', undefined /* className */, this.getElement())[0];
	this.getHandler().listen(button,
		goog.events.EventType.CLICK,
		this.onButtonClick_);
};

/**
* @param {goog.events.Event} e
* @private
*/
// The call to onButtonClick_ is delegated to a function passed at runtime.
// This is neccessary to avoid explicit references to settings code, and 
// dependency coupling into the single js in such a case.  
example.App.prototype.onButtonClick_ = function(e) {
	example.App.buttonClickHandler_.call(this, e);
};

/** @param {function(goog.events.Event)} handler */
example.App.setButtonClickHandler = function(handler) {
	example.App.buttonClickHandler_ = handler;
};

/** Invoke this method when example.Settings is available. */
example.App.prototype.onSettingsLoaded = function() {
	// The settings module adds the example.Settings component as the first and
	// only child of this component.
	this.settings_ = /** @type {example.Settings} */ (this.getChildAt(0));
};

/** @param {string} message */
example.App.prototype.setMessage = function(message) {
	var span = this.dom_.getElementsByTagNameAndClass(
		'span', undefined /* className */, this.getElement())[0];
	span.innerHTML = goog.string.htmlEscape(message);
};

/**
* @type {example.App}
* @private
*/
example.App.instance_;

/**
* @param {string} id
*/
example.App.install = function(id) {	
	if (example.App.instance_) return;
	var dom = new goog.dom.DomHelper();
	var app = new example.App(dom);
	app.render(dom.getElement(id));
	example.App.instance_ = app;
};

/** @return {example.App} */
example.App.getInstance = function() {
	return example.App.instance_;
};
