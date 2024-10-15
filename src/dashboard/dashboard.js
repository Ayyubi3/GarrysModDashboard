const { spawn } = require('child_process');
const path = require('path');
function dashboard(params) {

    const program = path.join(process.env.ROOT, 'g_mod_server', 'srcds.exe');
    console.log(`Starting server with ${program}...`)
    const args = [
        '+host_workshop_collection', '2465274389',
        '+r_hunkalloclightmaps', '0',
        '-console',
        '-game', 'garrysmod',
        '+gamemode', 'terrortown',
        '+map', 'gm_construct',
        '+maxplayers', '32'
    ];
    
    // Spawn the process
    console.log(`Starting server with ${program}...`);
    
    const child = spawn(program, args, { stdio: 'inherit' });
    
    // Handle errors
    child.on('error', (error) => {
        console.error('Error spawning process:', error);
    });
    
}

module.exports = { dashboard }