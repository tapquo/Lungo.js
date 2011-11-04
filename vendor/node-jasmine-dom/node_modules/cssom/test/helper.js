/**
 * @param {string} actual
 * @param {string} expected
 * @param {string} [message]
 * TODO: http://github.com/jquery/qunit/issues#issue/39
 */
function equalOwnProperties(actual, expected, message) {
	var actualDummy = cloneOwnProperties(actual);
	var expectedDummy = cloneOwnProperties(expected);
	deepEqual(actualDummy, expectedDummy, message);
}


/**
 * Make a deep copy of an object
 * @param {Object|Array} object
 * @return {Object|Array}
 */
function cloneOwnProperties(object) {
	var result = {};
	for (var key in object) {
		if (key.charAt(0) == "_" || !object.hasOwnProperty(key)) {
			continue;
		}
		if (typeof object[key] == "object") {
			result[key] = cloneOwnProperties(object[key]);
		} else {
			result[key] = object[key];
		}
	}
	return result;
}


/**
 * @param {Object|Array} actual
 * @param {Object|Array} expected
 * @param {string} message
 */
function hasOwnProperties(actual, expected, message){
	var diff = subsetOfOwnProperties(actual, expected);
	if (diff) {
		QUnit.push(false, diff, {}, message);
	} else {
		// QUnit.jsDump is so dumb. It can't even parse circular references.
		QUnit.push(true, "okay", "okay", message);
	}
}


function subsetOfOwnProperties(base, another) {
	if (base === another) {
		return false;
	}

	if (typeof base != "object" || typeof another != "object") {
		return another;
	}

	var diff = {};
	var isDiff = false;
	for (var key in another) {
		if (key.charAt(0) == "_" || !another.hasOwnProperty(key)) {
			continue;
		}
		if (key in base) {
			if (base[key] === another[key]) {
				// skip equal pairs
			} else {
				var sub = subsetOfOwnProperties(base[key], another[key]);
				if (sub) {
					isDiff = true;
					diff[key] = sub;
				}
			}
		} else {
			isDiff = true;
			diff[key] = another[key];
		}
	}

	return isDiff ? diff : false;
}


/**
 * Compare two stylesheets
 * @param {string} css
 * @param {Object} expected
 * @param {string} [message]
 */
function compare(css, expected, message) {
	var actual = CSSOM.parse(css);
	test(css, function(){
		equalOwnProperties(actual, expected, message || "");
	});
}
