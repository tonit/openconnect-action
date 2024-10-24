const core = require('@actions/core');
var exec = require('child_process').exec;

async function run() {
    try {
       core.info('Hey, opening OpenConnect Connection to ' + endpoint);
       const endpoint = core.getInput('endpoint');
       const user = core.getInput('user');
       const password = core.getInput('password');

       var openconnect_process = exec('echo "'+password+'" | openconnect  --user='+user+' -b --passwd-on-stdin ' + endpoint + ' --no-dtls', function(error, stdout, stderr) {
            if (error) {
                core.setFailed(error.message);
                return;
            }
            core.info('OpenConnect connection opened');
        });

        openconnect_process.stdout.on('data', function(data) {
            console.log(data); 
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
