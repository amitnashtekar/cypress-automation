Below are the commands to run the tests.



## To open the test runner in browser:
npm run cypress:open<br>

* This will list out all the tests in browser and by clicking individual test you can run any test you want. 

## To run the test indivudually in command prompt:
 npm run cy:run -- --spec "cypress/integration/examples/1my_first_test/my_first_test.js<br>

* you can give diff options e.g. headless/browser/ port etc  using -- in above command.
For e.g.
npm run cy:run -- --headless --browser chrome --spec "cypress/integration/examples/1my_first_test/my_first_test.js

Most popular options:
Option	Description
--browser, -b	Run Cypress in the browser with the given name. If a filesystem path is supplied, Cypress will attempt to use the browser at that path.

--ci-build-id	Specify a unique identifier for a run to enable grouping or parallelization.

--config, -c	Specify configuration

--config-file, -C	Specify configuration file

--env, -e	Specify environment variables

--group	Group recorded tests together under a single run

--headed	Displays the browser instead of running headlessly (default for Firefox and Chromium-based browsers)

--headless	Hide the browser instead of running headed (default for Electron)

--help, -h	Output usage information
--key, -k	Specify your secret record key

--no-exit	Keep Cypress Test Runner open after tests in a spec file run

--parallel	Run recorded specs in parallel across multiple machines

--port,-p	Override default port

--project, -P	Path to a specific project

--quiet, -q	If passed, Cypress output will not be printed to stdout. Only output from the configured Mocha reporter will print.

--record	Whether to record the test run

--reporter, -r	Specify a Mocha reporter

--reporter-options, -o	Specify Mocha reporter options

--spec, -s	Specify the spec files to run

--tag, -t	Identify a run with a tag or tags