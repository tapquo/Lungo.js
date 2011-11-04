describe("Example functions that update the DOM", function(){
	it("Should add two numbers", function(){

		EXAMPLES.domAdd('add_test_one_x', 'add_test_one_y', 'add_test_one_result');
		var result = jQuery('#add_test_one_result').html();

		expect(result).toEqual('7');
	});
});