const core = require('@actions/core');
const { spawn } = require('node:child_process');

async function run() {
    try {
       const endpoint = core.getInput('endpoint');
       const user = core.getInput('user');
       const password = core.getInput('password');
       core.info('Hey there, opening OpenConnect Connection to ' + endpoint + ' with user ' + user);

        // Define environment variables
        const env = {
            VPN_USER: user,
            VPN_PASSWORD: password,
            ENDPOINT: endpoint
        };
        
        // Spawn the child process to run the openconnect command
        const openconnect = spawn('bash', ['-c', `echo "${env.VPN_PASSWORD}" | openconnect --user=${env.VPN_USER} -b --passwd-on-stdin ${env.ENDPOINT} --no-dtls`], {
            env: process.env
        });
        // Handle stdout
        openconnect.stdout.on('data', (data) => {
            core.info(`stdout: ${data}`);
        });
        
        // Handle stderr
        openconnect.stderr.on('data', (data) => {
            core.error(`stderr: ${data}`);
        });
        
        // Handle when the process closes
        openconnect.on('close', (code) => {
            core.info(`openconnect process exited with code ${code}`);
            core.setOutput('exit-code', code);
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
