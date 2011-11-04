test("CSSStyleRule", function(){
	var r = new CSSOM.CSSStyleRule;
	r.cssText = "h1:first-of-type {\n\tfont-size: 3em\n}";

	equal(r.cssText, "h1:first-of-type {font-size: 3em;}");
	equal(r.selectorText, "h1:first-of-type");

	r.selectorText = "h1.title";
	equal(r.selectorText, "h1.title");
	equal(r.cssText, "h1.title {font-size: 3em;}");

});
