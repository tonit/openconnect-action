const core = require('@actions/core');
var exec = require('child_process').exec;

async function run() {
    try {
       core.info('Opening OpenConnect connection');
       const endpoint = core.getInput('endpoint');
       const user = core.getInput('user');
       const password = core.getInput('password');

       exec('echo "'+password+'" | openconnect  --user='+user+' -b --passwd-on-stdin ' + endpoint + ' --no-dtls', function(error, stdout, stderr) {
            if (error) {
                core.setFailed(error.message);
                return;
            }
            core.info('OpenConnect connection opened');
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
