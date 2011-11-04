/**
 * return {string}
 */
function toHTML(){
	var result = "";
	var rules = this.cssRules;
	var length = rules.length;
	for (var i = 0; i < length; i++) {
		var rule = rules[i];
		if (rule) {
			result += "<span class='rule'><b class='selector'>" + rule.selectorText + "</b> <span class='brace-open'>{</span>";
			var style = rule.style;
			if (!style) continue;
			var jj = style.length;
			if (jj) {
				for (var j = 0; j < jj; j++) {
					var name = style[j];
					result += "\n<span class='name'>  " + name + "</span><span class='colon'>: </span><span class='value'>"
								 + style[name] + "</span><span class='semicolon'>;</span>";
				}
			}
			result += "<span class='brace-close'>\n}\n</span></span>";
		}
	}
	return result;
}



if (typeof exports != "undefined") {
	exports.toHTML = toHTML;
}
