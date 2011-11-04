node-jasmine-dom
================

Run your browser-based [jasmine][1] specs headless with [node.js][2]. Then 
output in one of many formats such as JSON or JUnit XML (perfect
for integration with CI servers like [Jenkins][3]).

installation
------------
1. you've got [npm][4], right?
2. Groovy. <code>npm install jasmine-dom</code>, and you're away laughing.

usage
-----
Construct your SpecRunner.html as shown in the jasmine examples,
then run:

    jasmine-dom --runner path/to/SpecRunner.html

or

    jasmine-dom --config path/to/config.yaml

You can optionally provide the following arguments:

 * <code>--help</code>, provides usage information
 * <code>--format simple|nice|json|html|junit</code>, displays the result in the specified format
 * <code>--output path</code>, writes the output to the specified file
 * <code>--server [port]</code>, serves a simple (but effective) page showing the current state
                                 of the tests. You can also specify an optional <code>--refresh
                                 intervalInMS</code> argument to specify the wait between running
                                 the tests (because the server is constantly running 'em).

server
------

    jasmine-dom --runner examples/runner.html --server 8090 --refresh 3000

will run a server on http://localhost:8090/. Here a simple green or red page will reflect the current state
of your tests. The tests will run every 3000ms, and the page ajaximatically updates with the result.

If you'd like to see the default jasmine html, visit http://localhost:8090/jasmine. Note, the result is still
obtained via the nodejs runner (i.e. it wasn't run in your browser).

specifying runners
------------------
A single runner file can be provided via the <code>--runner <path_to_runner></code> command. To specify more than one
runner, use the <code>--config <path_to_config></code> argument and a yaml config file in the format:

```yaml
---
  test_one:
    name: This is the name of the first set of tests
    runner: path/to/runner_1.html
  test_two:
    name: This is the name of the second set of tests
    runner: path/to/another/runner.html
```

The config file allows you to provide names for your runners. These names will be used when identifying failing tests.

example 1
---------
    jasmine-dom --runner examples/runner.html

will output:

    Failed.

example 2
---------

    jasmine-dom --runner examples/runner.html --format junit --output javascript_results.xml

will write to javascript_results.xml:

    <testsuite>
        <testcase classname="/Users/andrew/development/node-jasmine-dom/examples/runner.html.Example_functions_that_update_the_DOM.Should_add_two_numbers" name="expect toEqual 7" time="undefined"/>
        <testcase classname="/Users/andrew/development/node-jasmine-dom/examples/runner.html.Example_functions.Should_multiply_two_numbers" name="expect toEqual 40" time="undefined"/>
        <testcase classname="/Users/andrew/development/node-jasmine-dom/examples/runner.html.Example_functions.Should_fail!!" name="expect toEqual 8">
            <failure>
                <![CDATA[
                    FAILURE in spec "Should fail!!": Expected 3 to equal 8.
                    Error: Expected 3 to equal 8.
                        at new <anonymous> (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:94:50)
                        at [object Object].toEqual (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:1138:29)
                        at [object Object].<anonymous> (/Users/andrew/development/node-jasmine-dom/examples/tests/spec/example-functions_spec.js:10:13)
                        at [object Object].execute (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:968:15)
                        at [object Object].next_ (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:1739:31)
                        at [object Object].start (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:1692:8)
                        at [object Object].execute (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:2018:14)
                        at [object Object].next_ (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:1739:31)
                        at [object Object].start (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:1692:8)
                        at [object Object].execute (/Users/andrew/development/node-jasmine-dom/examples/tests/lib/jasmine.js:2163:14)
                ]]>
            </failure>
        </testcase>
    </testsuite>

example 3
---------

    jasmine-dom --config ./examples/config.yaml --format nice

with ./examples/config.yaml:

    ---
      test_one:
        name: Example test one
        runner: ./runner.html
      test_two:
        name: Example test two
        runner: ./runner2.html

will output:

    Failed: 
     - In Example test two >> Example functions (some more) >> Should fail!! :: Expected false to be truthy.
     - In Example test one >> Example functions >> Should fail!! :: Expected 3 to equal 8.

have you seen **[jasmine-node][5]**?
------------------------------------
It's provided a lot of inspiration for this project, and may be just what
you're looking for. If you're not reliant on a DOM, then it's worth checking
out.

[1]: http://pivotal.github.com/jasmine/
[2]: http://nodejs.org/
[3]: http://jenkins-ci.org/
[4]: http://npmjs.org/
[5]: https://github.com/mhevery/jasmine-node
