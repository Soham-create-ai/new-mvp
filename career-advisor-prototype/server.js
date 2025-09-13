const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;

// Get network interfaces to display available URLs
function getNetworkIPs() {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (let k in interfaces) {
        for (let k2 in interfaces[k]) {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

// Listen on all network interfaces (0.0.0.0) instead of just localhost
server.listen(PORT, '0.0.0.0', () => {
    const networkIPs = getNetworkIPs();
    
    console.log(`
╔════════════════════════════════════════════════════════╗
║   Career & Education Advisor Server Running!          ║
╠════════════════════════════════════════════════════════╣
║   Access URLs:                                        ║
║                                                        ║
║   For you (localhost):                                ║
║   → http://localhost:${PORT}                           ║
║                                                        ║
║   For peers on same network:                          ║`);
    
    networkIPs.forEach(ip => {
        console.log(`║   → http://${ip}:${PORT}                         ║`);
    });
    
    console.log(`║                                                        ║
║   Share the network URL with your peers!              ║
║   Press Ctrl+C to stop the server                     ║
╚════════════════════════════════════════════════════════╝
    `);
});
