describe("Example functions", function(){
	it("Should multiply two numbers", function(){
		var result = EXAMPLES.multiply(5,8);

		expect(result).toEqual(40);

	});

	it("Should fail!!", function(){
		expect(3).toEqual(8);
	});
});