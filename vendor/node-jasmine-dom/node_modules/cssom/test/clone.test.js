test("clone", function(){
	var css = {
		cssRules: {
			0: {
				cssText: "* {background: #fff !important; color: #000 !important}",
				parentRule: null,
				selectorText: "body",
				type: 1,
				style: {
					0: "background",
					1: "color",
					background: "#fff",
					color: "#000",
					cssText: "background: #fff !important; color: #000 !important",
					length: 2,
					getPropertyPriority: function(){
						return "important";
					}
				}
			},
			length: 1
		},
		disabled: false,
		href: "http://usercss.ru/black-on-white.css",
		media: {
			length: 0,
			mediaText: ""
		},
		ownerRule: null,
		parentStyleSheet: null,
		title: null,
		type: "text/css"
	};
	css.rule = css.cssRules;
	css.cssRules[0].parentStyleSheet = css;
	css.cssRules[0].style.parentRule = css.cssRules[0];
	hasOwnProperties(css, CSSOM.clone(css), "Should be at least a subset of original object");
});
