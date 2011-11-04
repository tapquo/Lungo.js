if(! window.EXAMPLES) window.EXAMPLES = {};

EXAMPLES.domAdd = function(xId,yId,resultId){
	var x = document.getElementById('add_test_one_x').innerHTML;
	var y = document.getElementById('add_test_one_y').innerHTML;
	document.getElementById('add_test_one_result').innerHTML = (+x) + (+y);
};