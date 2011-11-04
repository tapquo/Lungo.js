test("MediaList", function(){
	var m = new CSSOM.MediaList;
	strictEqual(m.length, 0);

	m.appendMedium("handheld");
	m.appendMedium("screen");
	m.appendMedium("only screen and (max-device-width: 480px)");

	m.deleteMedium("screen");

	strictEqual(m[2], undefined);

	var expected = {
		0: "handheld",
		1: "only screen and (max-device-width: 480px)",
		length: 2
	};

	equalOwnProperties(m, expected);
	equal(m.mediaText, [].join.call(expected, ", "));
});
