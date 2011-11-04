describe("Example functions (some more)", function(){
	it("Should divide two numbers", function(){
		var result = EXAMPLES.divide(8,2);

		expect(result).toEqual(4);

	});

	it("Should fail!!", function(){
		expect(false).toBeTruthy();
	});
});