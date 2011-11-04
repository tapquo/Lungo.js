test("CSSStyleSheet", function(){
	var s = new CSSOM.CSSStyleSheet;
	deepEqual(s.cssRules, []);

	s.insertRule("a {color: blue}", 0);
	equal(s.cssRules.length, 1);

	s.insertRule("a *:first-child, a img {border: none}", 1);
	equal(s.cssRules.length, 2);

	s.deleteRule(1);
	equal(s.cssRules.length, 1);

	s.deleteRule(0);
	deepEqual(s.cssRules, []);
});
