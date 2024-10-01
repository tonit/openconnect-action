const core = require('@actions/core');
var exec = require('child_process').exec;

async function run() {
    try {
        core.info('Ending Openconnect..');

        exec('killall -SIGINT openconnect', function callback(error, stdout, stderr) {
            // be lenient with errors
            if (error) {
                core.info(error.message);
            }
            if (stderr) {
                core.info(stderr);
            }
            core.info(stdout);
        });

    } catch (error) {
        core.info(error.message);
    }
}

run();
