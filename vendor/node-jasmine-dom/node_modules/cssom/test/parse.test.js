var TESTS = [
	{
		input: "/* fuuuu */",
		result: {
			cssRules: []
		}
	},
	{
		input: "/**/",
		result: {
			cssRules: []
		}
	},
	{
		input: "/*a {content: '* {color:#000}'}*/",
		result: {
			cssRules: []
		}
	},
	{
		input: "a {color: red}",
		result: {
			cssRules: [
				{
					selectorText: "a",
					style: {
						0: "color",
						color: "red",
						length: 1
					}
				}
			]
		}
	},
	{
		input: ".left {float: left;}",
		result: {
			cssRules: [
				{
					selectorText: ".left",
					style: {
						0: "float",
						float: "left",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "h1 {font-family: 'Times New Roman', Helvetica Neue, sans-serif }",
		result: {
			cssRules: [
				{
					selectorText: "h1",
					style: {
						0: "font-family",
						"font-family": "'Times New Roman', Helvetica Neue, sans-serif",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "h2 {font: normal\n1.6em\r\nTimes New Roman,\tserif  ;}",
		result: {
			cssRules: [
				{
					selectorText: "h2",
					style: {
						0: "font",
						font: "normal 1.6em Times New Roman, serif",
						length: 1
					}
				}
			]
		}
	},
	{
		input: ".icon>*{background-image: url(../images/ramona_strong.gif);}",
		result: {
			cssRules: [
				{
					selectorText: ".icon>*",
					style: {
						0: "background-image",
						"background-image": "url(../images/ramona_strong.gif)",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "*/**/{}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					style: {
						length: 0
					}
				}
			]
		}
	},
	{
		input: "/**/*{}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					style: {
						length: 0
					}
				}
			]
		}
	},
	{
		input: "* /**/*{}",
		result: {
			cssRules: [
				{
					selectorText: "* *",
					style: {
						length: 0
					}
				}
			]
		}
	},
	{
		input: "*/*/*/ *{}",
		result: {
			cssRules: [
				{
					selectorText: "* *",
					style: {
						length: 0
					}
				}
			]
		}
	},
	{
		input: "#a {b:c;}\n#d {e:f}",
		result: {
			cssRules: [
				{
					selectorText: "#a",
					style: {
						0: "b",
						b: "c",
						length: 1
					}
				}, {
					selectorText: "#d",
					style: {
						0: "e",
						e: "f",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "* {	border:	none	} \n#foo {font-size: 12px; background:#fff;}",
		result: {
			cssRules: [
				{
					selectorText: "*",
					style: {
						0: "border",
						border: "none",
						length: 1
					}
				},
				{
					selectorText: "#foo",
					style: {
						0: "font-size",
						"font-size": "12px",
						1: "background",
						background: "#fff",
						length: 2
					}
				}
			]
		}
	},
	{
		input: "span {display: inline-block !important; vertical-align: middle !important} .error{color:red!important;}",
		result: {
			cssRules: [
				{
					selectorText: "span",
					style: {
						0: "display",
						1: "vertical-align",
						display: "inline-block",
						"vertical-align": "middle",
						length: 2
					}
				},
				{
					selectorText: ".error",
					style: {
						0: "color",
						color: "red",
						length: 1
					}
				}
			]
		}
	},
	{
		input: "@media handheld, only screen and (max-device-width: 480px) {body{max-width:480px}}",
		result: {
			cssRules: [
				{
					media: {
						0: "handheld",
						1: "only screen and (max-device-width: 480px)",
						length: 2
					},
					cssRules: [
						{
							selectorText: "body",
							style: {
								0: "max-width",
								"max-width": "480px",
								length: 1
							}
						}
					]
				}
			]
		}
	},
	{
		input: "@media screen, screen, screen {/* Match Firefox and Opera behavior here rather than WebKit. \nSane person shouldn't write like this anyway. */}",
		result: {
			cssRules: [
				{
					media: {
						0: "screen",
						1: "screen",
						2: "screen",
						length: 3
					},
					cssRules: []
				}
			]
		}
	},
	{
		input: "@media/**/print {*{background:#fff}}",
		result: {
			cssRules: [
				{
					media: {
						0: "print",
						length: 1
					},
					cssRules: [
						{
							selectorText: "*",
							style: {
								0: "background",
								background: "#fff",
								length: 1
							}
						}
					]
				}
			]
		}
	},
	{
		input: "a{}@media all{b{color:#000}}",
		result: {
			cssRules: [
				{
					selectorText: "a",
					style: {
						length: 0
					}
				},
				{
					media: {
						0: "all",
						length: 1
					},
					cssRules: [
						{
							selectorText: "b",
							style: {
								0: "color",
								color: "#000",
								length: 1
							}
						}
					]
				}
			]
		}
	},
	{
		input: "@mediaall {}",
		result: {
			cssRules: []
		}
	},
	{
		input: "some invalid junk @media projection {body{background:black}}",
		result: {
			cssRules: [
				{
					media: {
						0: "projection",
						length: 1
					},
					cssRules: [
						{
							selectorText: "body",
							style: {
								0: "background",
								background: "black",
								length: 1
							}
						}
					]
				}
			]
		}
	}
];


// Run tests.
for (var i=0; i<TESTS.length; i++) {
	compare(TESTS[i].input, TESTS[i].result, TESTS[i].name);
}
