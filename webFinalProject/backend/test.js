const Hapi = require('@hapi/hapi');
const server = Hapi.server({ port: 3001 }); // Use a different port
server.start().then(() => console.log('Minimal server works!'));