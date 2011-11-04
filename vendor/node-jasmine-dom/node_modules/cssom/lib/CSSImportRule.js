//.CommonJS
var CSSOM = {
	CSSRule: require("./CSSRule").CSSRule,
	CSSStyleSheet: require("./CSSStyleSheet").CSSStyleSheet,
	MediaList: require("./MediaList").MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */
CSSOM.CSSImportRule = function CSSImportRule() {
	this.href = "";
	this.media = new CSSOM.MediaList;
	this.styleSheet = new CSSOM.CSSStyleSheet;
};

CSSOM.CSSImportRule.prototype = new CSSOM.CSSRule;
CSSOM.CSSImportRule.prototype.constructor = CSSOM.CSSImportRule;
CSSOM.CSSImportRule.prototype.type = 3;
CSSOM.CSSImportRule.prototype.__defineGetter__("cssText", function() {
	return "@import url("+ this.href +") "+ this.media.mediaText +";"
});
CSSOM.CSSImportRule.prototype.__defineSetter__("cssText", function() {
	return "@import url("+ this.href +") "+ this.media.mediaText +";"
});


//.CommonJS
exports.CSSImportRule = CSSOM.CSSImportRule;
///CommonJS
